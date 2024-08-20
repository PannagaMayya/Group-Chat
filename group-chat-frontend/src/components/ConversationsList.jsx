import React from "react";
import { ConversationHeader, ConversationList } from "@minchat/react-chat-ui";
import "../style/conversationslist.css";

function ConversationsList({ conversations }) {
  return (
    <div className="conversation-list">
      <ConversationHeader />
      <ConversationList
        selectedConversationId="1"
        currentUserId="dan"
        conversations={conversations}
      />
    </div>
  );
}

export default ConversationsList;
