import {
  Dialog,
  Transition,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { sampleUsers } from "../constants/sampleData";
import { useInputValidation } from "6pp";
import { Search } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { setIsNewGroup } from "../../redux/reducers/misc";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hooks";
import toast from "react-hot-toast";
import { transformImge } from "../../libs/features";
import { isValidAvatar } from "./SearchDialog";

const NewGroupDialog = () => {
  const groupName = useInputValidation("");
  const { isNewGroup } = useSelector((state) => state.misc);
  const { isError, error, isLoading, data } = useAvailableFriendsQuery();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [newGroup, newGroupLoading] = useAsyncMutation(useNewGroupMutation);

  const errors = [{ isError, error }];

  useErrors(errors);
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

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
    closeHandler();
  };

  return (
    <Transition show={isNewGroup} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={closeHandler}
        open={isNewGroup}
      >
        {/* Overlay for background */}
        <div className="fixed inset-0 bg-black bg-opacity-30" />

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <DialogPanel className="w-full max-w-lg p-6 overflow-hidden shadow-xl bg-not-so-dark rounded-3xl">
              <DialogTitle
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                New Group
              </DialogTitle>

              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="text-gray-400 " />
                </div>
                <input
                  type="text"
                  name="search"
                  className="block w-full p-3 pl-10 bg-transparent border-b-2 sm:text-sm border-color"
                  placeholder="Search..."
                  value={groupName.value}
                  onChange={groupName.changeHandler}
                />
              </div>

              <div className="mt-4">
                <div className="text-sm font-medium text-gray-900">Members</div>
                <div className="mt-2 space-y-2 overflow-x-hidden overflow-y-auto max-h-72 scroll-container">
                  {data?.friends?.map((user) => (
                    <UserItem
                      key={user._id}
                      user={user}
                      handler={selectMemberHandler}
                      isSelected={selectedMembers.includes(user._id)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-2">
                <button
                  className="px-4 py-2 text-sm border-2 rounded-full button-gray"
                  onClick={closeHandler}
                >
                  Cancel
                </button>
                <button
                disabled={newGroupLoading}
                  className="px-4 py-2 text-sm border-2 rounded-full button-indigo"
                  onClick={createGroupHandler}
                >
                  Create
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const UserItem = ({ user, handler, isSelected }) => {
  const { name, _id, avatar, bio } = user;

  return (
    <div className="flex items-center justify-between gap-2 p-4 border-b-2 border-light-gray-divider sm:gap-4 sm:p-6 ">
      {/* User Info Section */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-text-primary">
        {/* Avatar */}
        <img
          className="w-10 h-10 rounded-full sm:w-12 sm:h-12 "
          src={transformImge(
            avatar && isValidAvatar(avatar)
              ? avatar
              : `https://avatar.iran.liara.run/username?username=${name}` // fallback to name-based avatar
          )}
          alt="Avatar"
        />
        {/* Name and Bio */}
        <div className="flex flex-col flex-wrap items-start justify-center">
          <div className="flex items-baseline gap-1 sm:flex-row sm:gap-2">
            <p className="text-sm font-medium sm:text-base">{name}</p>
            <p className="text-xs text-text-secondary sm:text-sm">• {_id}</p>
          </div>
          <p className="text-xs text-text-secondary sm:text-sm">{bio}</p>
        </div>
      </div>

      {/* Add/Remove Button */}
      <button
        onClick={() => handler(_id)}
        className={`inline-flex justify-center px-3 py-1 text-xs font-medium text-white rounded-full sm:text-sm sm:px-4 sm:py-2 ${
          isSelected ? "button-red" : "button-green"
        }`}
      >
        {isSelected ? "Remove" : "Add"}
      </button>
    </div>
  );
};


export default NewGroupDialog;
