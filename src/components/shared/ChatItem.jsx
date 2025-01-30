import { memo } from "react";
import { Link } from "react-router-dom";
import { transformImge } from "../../libs/features";
import { isValidAvatar } from "../specific/SearchDialog";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,  
}) => {
  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      className="block w-full"
    >
      <div
        className={`flex items-center gap-4 p-4 cursor-pointer transition-colors hover:bg-hover-gray hover:text-hover-text text-dull-text ${sameSender ? "bg-hover-gray": ""}`}
        style={{ position: "relative" }}
      >
        {/* Avatar */}
        <div className="relative w-12 h-12">
          <img
            className="object-cover w-full h-full rounded-full"
            src={transformImge(
              avatar.length && isValidAvatar(avatar[0])
                ? avatar[0]
                : `https://avatar.iran.liara.run/username?username=${name}` // fallback to name-based avatar
            )}
            alt="Avatar"
          />
          {isOnline && (
            <span className={`absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 rounded-full border-not-so-dark  ${sameSender? "border-hover-gray" :" "}`}></span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col items-start justify-between gap-2 ">
            <span className="font-semibold truncate ">{name}</span>
            {newMessageAlert && newMessageAlert.count > 0 && (
              <span className="px-2 py-1 text-xs font-medium bg-green-500 rounded-full text-text-primary">
                {newMessageAlert.count}
              </span>
            )}
          </div>
          <div className="text-xs ">
            {groupChat ? "Group chat" : "Personal chat"}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(ChatItem);
