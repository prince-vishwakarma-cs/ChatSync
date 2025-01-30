import React from "react";

const ChatListShrinked = ({
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
    <div className="border-r-2 h-[100dvh]">
    <div className="flex flex-col w-full overflow-y-auto bg-light-gray">
      {/*  */}
      {chats?.map((data, index) => {
        const { avatar, name, _id, groupChat, members } = data;
        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );
        const isOnline = members?.some((member) =>
          onlineUsers.includes(member)
        );
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
        );
      })}
      {/* Skeletons */}
      
    </div>
    </div>
  );
};

export default ChatListShrinked;

import { CheckCircle } from "react-feather";
import { Link } from "react-router-dom";
import { transformImge } from "../../libs/features";
import { isValidAvatar } from "../specific/SearchDialog";

const ChatItem = ({
  avatar = [],
  _id,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
  groupChat, // Added this to use in handleDeleteChat
}) => {
  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      className={`block w-full ${
        sameSender ? "border-l-4 border-white" : ""
      }`} // Add white left border for sameSender
    >
      <div
        className={`flex items-center gap-4 p-4 cursor-pointer border-b border-gray-200 hover:bg-gray-100 transition-colors`}
        style={{ position: "relative" }}
      >
        {/* Avatar */}
        <div className="relative w-12 h-12">
          <img
            className="object-cover w-full h-full rounded-full"
            src={transformImge(
              avatar.length && isValidAvatar(avatar[0])
                ? avatar[0]
                : `https://xsgames.co/randomusers/avatar.php?g=pixel` // fallback to name-based avatar
            )}
            alt="Avatar"
          />

          {/* Online Indicator */}
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}

          {/* New Message Badge */}
          {/* {newMessageAlert && newMessageAlert.count > 0 && ( */}
          <span className="absolute flex items-center justify-center w-6 h-6 text-[0.75rem] text-white bg-red-500 rounded-full linefont-bold -top-1 -right-1">
  {40}
</span>
          
        </div>

        {/* Chat Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            {/* Name or Group Name (Can add further wrapping logic here if needed) */}
            <p className="text-sm font-medium text-gray-900 truncate">
              {/* Assuming `name` exists, you may pass it as prop */}
            </p>
          </div>

          {/* Chat Type / Additional Info */}
        </div>

        {/* Checkmark for the same sender */}
        {sameSender && (
          <CheckCircle className="flex-shrink-0 text-green-500" size={20} />
        )}
      </div>
    </Link>
  );
};
