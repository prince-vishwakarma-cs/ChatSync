import { useInputValidation } from "6pp";
import { useEffect, useState } from "react";
import { Search } from "react-feather";
import { useDispatch } from "react-redux";
import BottomBar from "../components/layouts/BottomBar";
import { SidePanel } from "../components/specific/SidePanel";
import { useAsyncMutation } from "../hooks/hooks";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../redux/api/api";
import { getSocket } from "@/socket";

const SearchPage = () => {
  const socket = getSocket();
  const dispatch = useDispatch();
  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState({});
  const search = useInputValidation("");

  const addFriendHandler = async (id) => {
    setLoadingUsers((prev) => ({ ...prev, [id]: true }));
    try {
      await sendFriendRequest("Sending friend request..", { userId: id });
    } catch (error) {
      console.error("Error sending friend request", error);
    } finally {
      setLoadingUsers((prev) => ({ ...prev, [id]: false }));
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 200);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);
  return (
    <div className="flex flex-col h-screen bg-not-quite-black">
      <div className="flex flex-1 flex-grow ">
        <SidePanel />
        <div className="flex flex-col flex-grow p-6 bg-not-so-dark  h-[calc(100dvh-4rem)] sm:h-screen">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="text-text-secondary" />
            </div>
            <input
              type="text"
              name="search"
              value={search.value}
              onChange={search.changeHandler}
              className="block w-full p-3 pl-10 border-2 rounded-full text-text-primary bg-not-so-dark border-light-gray-divider sm:text-sm"
              placeholder="Search for users..."
            />
          </div>
          <div className="flex-grow space-y-4 overflow-x-hidden overflow-y-auto ">
            {users.length > 0 ? (
              users.map((user) => (
                <UserItem
                  key={user._id}
                  user={user}
                  handler={addFriendHandler}
                  isLoading={loadingUsers[user._id] || false}
                />
              ))
            ) : (
              <p className="text-center text-text-secondary">No users found</p>
            )}
          </div>
        </div>
      </div>
      <BottomBar className="block sm:hidden" />
    </div>
  );
};

export default SearchPage;

export const UserItem = ({ user, handler, isLoading }) => {
  const { name, username, avatar, bio, _id } = user;

  const nameLimit = 10;
  const usernameLimit = 20;

  const truncatedName =
    name.length > nameLimit ? name.slice(0, nameLimit) + "..." : name;
  const truncatedUsername =
    username.length > usernameLimit
      ? username.slice(0, usernameLimit) + "..."
      : username;

  return (
    <div className="flex items-center justify-between gap-1 p-4 border-b border-light-gray-divider">
      <div className="flex items-center gap-2">
        <img
          className="w-12 h-12 rounded-full"
          src={
            isValidAvatar(avatar)
              ? avatar
              : `https://avatar.iran.liara.run/username?username=${name}`
          }
          alt="Avatar"
        />
        <div className="flex flex-col items-start justify-center">
          <div className="flex items-baseline gap-2">
            <p className="font-medium text-left text-text-primary">
              {truncatedName}
            </p>
            <p className="text-xs text-left text-text-secondary">
              •{truncatedUsername}
            </p>
          </div>
          <p className="text-xs text-left text-text-secondary">{bio}</p>
        </div>
      </div>

      <button
        className={`px-4 py-2 text-sm font-medium rounded-3xl border-2 button-green ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
        onClick={() => handler(_id)}
      >
        {isLoading ? "Adding..." : "Add"}
      </button>
    </div>
  );
};

export const isValidAvatar = (url) => {
  try {
    return url && url.startsWith("https://res.cloudinary.com/");
  } catch (error) {
    return false;
  }
};
