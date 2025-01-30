import React from "react";
import ChatItem from "../shared/ChatItem";
import MessagesHeader from "./MesageHeadder";

const ChatList = ({
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <div className=" h-[100dvh] bg-not-so-dark border-r border-light-gray-divider">
    <MessagesHeader/>
    <div className="flex flex-col h-[calc(100dvh-5rem)] w-full overflow-y-auto">
      {chats?.map((data, index) => {
        const { avatar, name, _id, groupChat, members } = data; 
        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        )
        const isOnline = members?.some((member) =>
          onlineUsers.includes(member)
        )
        return (
          <ChatItem 
            key={index}
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handlesDeleterChatOpen={handleDeleteChat}
          />
        )
      })}
    </div>
    </div>
  );
};

export default ChatList;
