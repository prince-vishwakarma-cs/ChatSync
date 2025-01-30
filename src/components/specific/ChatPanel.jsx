import React from "react";
import { Link } from "react-router-dom";
import { transformImge } from "../../libs/features";
import { isValidAvatar } from "../../pages/Search";
import "../../styling.css";

export const ChatPanel = ({
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
    <ul className="box-border z-40 flex flex-col gap-4 p-4 bg-not-quite-black sm:hidden h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden">
      {chats?.map((data, index) => {
        const { avatar, name, _id, groupChat, members } = data;
        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );
        const isOnline = members?.some((member) =>
          onlineUsers.includes(member)
        );
        return (
          <ChatButton
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
    </ul>
  );
};

export const ChatButton = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
  hoverClass = "normal-boi",
}) => {
  return (
    <Link to={`/chat/${_id}`}>
      <button
        className={`squircle bg-transparent  bg-lighter-dark ${hoverClass} ${
          sameSender ? "active-boi" : ""
        }`}
      >
        <img
          className={`h-12 w-12  overflow-hidden rounded-full ${
            sameSender ? "active-icon " : ""
          }`}
          src={transformImge(
            avatar.length && isValidAvatar(avatar[0])
              ? avatar[0]
              : `https://avatar.iran.liara.run/username?username=${name}`
          )}
          alt="Avatar"
        />
        {/* Optional icon styling */}
        <div className="popper-boi">
          <h4 className="popper-text">{name}</h4>
        </div>
        {newMessageAlert && newMessageAlert.count > 0 && (
          <span className="px-2 py-1 text-xs font-medium text-white bg-green-500 rounded-full">
            {newMessageAlert.count}
          </span>
        )}
      </button>
    </Link>
  );
};

function generateLetterAvatar(name, size = 100) {
  const initials = name.charAt(0).toUpperCase(); // Get the first letter of the name

  // Create a canvas element
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  // Choose a random color for the background
  const bgColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  context.fillStyle = bgColor;
  context.fillRect(0, 0, size, size);

  // Set the font style and color for the initial letter
  context.font = `${size / 2}px Arial`;
  context.fillStyle = "#FFF"; // White text
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(initials, size / 2, size / 2);

  // Return the avatar as a data URL
  return canvas.toDataURL();
}
