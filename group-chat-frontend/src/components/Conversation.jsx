import React from "react";
import {
  MessageInput,
  MessageContainer,
  MessageList,
  MessageHeader,
} from "@minchat/react-chat-ui";
import "../style/conversation.css";
function Conversation({ messages }) {
  return (
    <div className="conversation-container">
      <MessageContainer>
        <MessageHeader />
        <MessageList currentUserId="dan" messages={messages} />
        <MessageInput placeholder="Type message here" />
      </MessageContainer>
    </div>
  );
}

export default Conversation;
