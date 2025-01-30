import {
  Dialog,
  DialogBackdrop,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hooks";
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from "../../redux/api/api";
import { setIsAddMember } from "../../redux/reducers/misc";
import { sampleUsers } from "../constants/sampleData";
import { UserItem } from "../specific/NewGroupDialog";

const AddMemberDialog = ({chatId}) => {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);
  const {isLoading,data,isError,error} = useAvailableFriendsQuery(chatId)
  const [selectedMembers, setSelectedMembers] = useState(sampleUsers);
  const [addMember, isLoadingAddMember] = useAsyncMutation(
    useAddGroupMembersMutation
  );
  const selectMemberHandler = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const closeAddMemberHandler = () => {
    dispatch(setIsAddMember(false));
  };
  const addMemberSubmitHandler = () => {
    addMember("Adding members...",{chatId, members:selectedMembers});
   closeAddMemberHandler();
  };


  return (
    <Transition show={isAddMember} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={closeAddMemberHandler}
      >
        <TransitionChild>
          <div className="fixed inset-0 flex items-center justify-center min-h-[100dvh] p-4">
            <DialogBackdrop className="fixed inset-0 transition-opacity bg-black bg-opacity-30" />

            <div className="relative w-full max-w-md p-6 shadow-xl bg-not-so-dark rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <DialogTitle className="text-xl font-semibold text-text-primary">
                  Add Members
                </DialogTitle>
              </div>

              <div className="space-y-4 overflow-y-auto max-h-80 ">
                {data?.friends?.length > 0 ? (
                  data?.friends?.map((user) => (
                    <UserItem
                      key={user._id}
                      user={user}
                      handler={selectMemberHandler}
                      isLoading={isLoadingAddMember}
                    />
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    No Users Found
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={closeAddMemberHandler}
                  className="px-4 py-2 text-sm border-2 rounded-full button-gray"
                >
                  Cancel
                </button>
                <button
                  onClick={addMemberSubmitHandler}
                  className={`px-4 py-2 text-sm button-blue rounded-full border-2 ${
                    isLoadingAddMember ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoadingAddMember}
                >
                  {isLoadingAddMember ? "Adding..." : "Add"}
                </button>
              </div>
            </div>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default AddMemberDialog;
