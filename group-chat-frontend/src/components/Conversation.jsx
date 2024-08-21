import React from "react";
import {
  MessageInput,
  MessageContainer,
  MessageList,
  MessageHeader,
} from "@minchat/react-chat-ui";
import "../style/conversation.css";

function Conversation({ messages, sendMessage }) {
  return (
    <div className="conversation-container">
      {messages ? (
        <MessageContainer>
          <h1>Message header</h1>
          <MessageList currentUserId="dan" messages={messages} />
          <MessageInput
            placeholder="Type message here"
            showAttachButton={false}
            onSendMessage={sendMessage}
          />
        </MessageContainer>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Nothing to display</h1>
        </div>
      )}
    </div>
  );
}

export default Conversation;
