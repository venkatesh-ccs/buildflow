import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMessageSquare, FiUsers } from "react-icons/fi";
import ChatIndividualList from "./ChatIndividualList";
import ChatIndividualScreen from "./ChatIndividualScreen";
import GroupChatList from "../GroupChat/GroupChatList";
import GroupChatScreen from "../GroupChat/GroupChatScreen";
const ChatApp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [activeSection, setActiveSection] = useState("chats"); // "chats" or "groups"

  // Determine which icon is active based on the activeSection
  const isChatActive = activeSection === "chats";
  const isGroupActive = activeSection === "groups";

  const handleChatClick = () => {
    setActiveSection("chats");
    setSelectedGroup(null);
    navigate("/chat");
  };

  const handleGroupClick = () => {
    setActiveSection("groups");
    setSelectedChat(null);
    navigate("/chat");
  };

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      {/* Side Navigation */}
      <div className="bg-light d-flex flex-column align-items-center p-3 border-end" style={{ width: "70px" }}>
        <div 
          className="d-flex flex-column align-items-center my-3" 
          style={{ cursor: "pointer" }}
          onClick={handleChatClick}
        >
          <FiMessageSquare
            className="fs-3"
            style={{ color: isChatActive ? "#FF6F00" : "gray" }}
          />
          <span className="small text-muted">Chats</span>
        </div>
        <div 
          className="d-flex flex-column align-items-center my-3" 
          style={{ cursor: "pointer" }}
          onClick={handleGroupClick}
        >
          <FiUsers
            className="fs-3"
            style={{ color: isGroupActive ? "#FF6F00" : "gray" }}
          />
          <span className="small text-muted">Groups</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="d-flex flex-grow-1">
        {/* Display chat or group list based on active section */}
        {activeSection === "chats" ? (
          <ChatIndividualList selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
        ) : (
          <GroupChatList selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
        )}

        {/* Display chat screen if chat is selected */}
        {activeSection === "chats" && selectedChat ? (
          <ChatIndividualScreen selectedChat={selectedChat} />
        ) : activeSection === "groups" && selectedGroup ? (
          <GroupChatScreen selectedGroup={selectedGroup} />
        ) : (
          <div className="d-flex align-items-center justify-content-center flex-grow-1">
            <h5>Select a {activeSection === "chats" ? "chat" : "group"} to start messaging</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;