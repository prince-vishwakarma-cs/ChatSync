import { useInputValidation } from "6pp";
import { transformImge } from "@/libs/features";
import { useState } from "react";
import { Search } from "react-feather";
import toast from "react-hot-toast";
import BottomBar from "../components/layouts/BottomBar";
import { SidePanel } from "../components/specific/SidePanel";
import { useAsyncMutation, useErrors } from "../hooks/hooks";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../redux/api/api";
import { isValidAvatar } from "./Search";

const NewGroupPage = () => {
  const groupName = useInputValidation("");
  const { isError, error, isLoading, data } = useAvailableFriendsQuery();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [newGroup, newGroupLoading] = useAsyncMutation(useNewGroupMutation);

  const errors = [{ isError, error }];
  useErrors(errors);

  const selectMemberHandler = (userId) => {
    if (selectedMembers.includes(userId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== userId));
    } else {
      setSelectedMembers([...selectedMembers, userId]);
    }
  };

  const createGroupHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");
    if (selectedMembers.length < 2)
      return toast.error("At least 3 members are required");
    newGroup("Creating group...", {
      name: groupName.value,
      members: selectedMembers,
    });
  };

  return (
    <div className="flex flex-col h-screen bg-not-quite-black">
      <div className="flex w-screen">
        <SidePanel />
        <div className="flex flex-col items-center justify-center flex-grow px-4 py-8  h-[calc(100dvh-4rem)] sm:h-screen  bg-not-so-dark ">
          <div className="w-full max-w-xl">
            <h3 className="mb-6 text-xl font-medium text-center text-text-primary">
              Create a New Group
            </h3>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Search className="text-gray-400" />
              </div>
              <input
                type="text"
                name="groupName"
                value={groupName.value}
                onChange={groupName.changeHandler}
                className="flex items-center w-full p-3 pl-10 border rounded-full text-text-on-selected bg-not-so-dark border-light-gray-divider sm:text-sm"
                placeholder="Group name"
              />
            </div>
            <div className="mb-4 text-sm font-medium text-text-primary">
              Select Members
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto max-h-60">
              {data?.friends?.map((user) => (
                <UserItem
                  key={user._id}
                  user={user}
                  handler={selectMemberHandler}
                  isSelected={selectedMembers.includes(user._id)}
                />
              ))}
            </div>
            <div className="flex justify-end mt-8">
              <button
                disabled={newGroupLoading}
                className={`px-5 py-2 text-sm font-medium text-white transition-colors rounded focus:outline-none ${
                  newGroupLoading
                    ? "button-blue cursor-not-allowed"
                    : "button-blue"
                }`}
                onClick={createGroupHandler}
              >
                {newGroupLoading ? "Creating..." : "Create Group"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export const UserItem = ({ user, handler, isSelected }) => {
  const { name, _id, avatar, bio } = user;
  return (
    <div
      className={`flex items-center p-4 justify-between gap-2 border-b border-light-gray-divider sm:gap-4 sm:p-6 `}
    >
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-text-primary">
        <img
          className="w-10 h-10 rounded-full sm:w-12 sm:h-12 "
          src={transformImge(
            avatar && isValidAvatar(avatar)
              ? avatar
              : `https://avatar.iran.liara.run/username?username=${name}` // fallback to name-based avatar
          )}
          alt="Avatar"
        />
        <div className="flex flex-col flex-wrap items-start justify-center">
          <div className="flex items-baseline gap-1 sm:flex-row sm:gap-2">
            <p className="text-sm font-medium sm:text-base">{name}</p>
          </div>
          <p className="text-xs text-text-secondary sm:text-sm">{bio}</p>
        </div>
      </div>
      <button
        onClick={() => handler(_id)}
        className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-white rounded-full = ${
          isSelected ? "button-red" : "button-green"
        }`}
      >
        {isSelected ? "Remove" : "Add"}
      </button>
    </div>
  );
};

export default NewGroupPage;
