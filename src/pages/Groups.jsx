import { Dialog, Transition } from "@headlessui/react";
import { Fragment, lazy, Suspense, useEffect, useState } from "react";
import { Check, Menu, PenTool, Plus, Trash2, X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UserItem } from "../components/specific/NewGroupDialog";
import { useAsyncMutation, useErrors } from "../hooks/hooks";
import {
  useChatDetailsQuery,
  useDeleteChatMutation,
  useGetGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { setIsAddMember, setIsDeleteMenu } from "../redux/reducers/misc";
import { CircularProgress } from "@mui/material";
import { SidePanel } from "../components/specific/SidePanel";
import { isValidAvatar } from "./Search";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import BottomBar from "../components/layouts/BottomBar";
import { DeleteDialog } from "../components/Dialogs/DeleteDialog";

const isAddMenber = true;

const ConfirmDeleteDialog = lazy(() =>
  import("../components/Dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/Dialogs/AddMemberDialog")
);
const Groups = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [members, setMembers] = useState([]);
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("group");
  const navigate = useNavigate();
  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const dispatch = useDispatch();
  const { isDeleteMenu } = useSelector((state) => state.misc);

  const [renameGroup, isLoadingRenameGroup] = useAsyncMutation(
    useRenameGroupMutation
  );
  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );
  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );

  const myGroups = useGetGroupsQuery("");
  const errorsArr = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];

  useErrors(errorsArr);

  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails.data.chat.name);
      setGroupNameUpdatedValue(groupDetails.data.chat.name);
      setMembers(groupDetails.data.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  const updateGroupname = () => {
    setIsEdit(false);
    renameGroup("Updating group name....", {
      chatId,
      name: groupNameUpdatedValue,
    });
  };

  const openConfirmDeleteHandler = () => {
    dispatch(setIsDeleteMenu(true));
  };

  const closeConfirmDeleteHandler = () => {
    dispatch(setIsDeleteMenu(false));
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing member...", { userId, chatId });
  };
  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const deleteHandler = () => {
    deleteGroup("Deleting group...", chatId);
    closeConfirmDeleteHandler();
    navigate("/groups");
  };
  return (
    <div className="flex flex-col w-screen h-screen bg-not-quite-black text-text-primary">
      <div className="flex bg-not-quite-black text-text-primary  h-[calc(100dvh-4rem)] sm:h-screen">
      <SidePanel />
      <div className="flex  h-[calc(100dvh-4rem)] sm:h-screen flex-grow">
        <aside className="hidden w-1/3 border-r sm:block bg-not-so-dark border-light-gray-divider">
          <GroupsList myGroups={myGroups?.data?.message} />
        </aside>
        <main className="relative flex-1 w-2/3 p-6 bg-not-so-dark h-[calc(100dvh-4rem)] sm:h-screen">
          <div className="absolute top-4 left-4">
            <button
              className="p-2 rounded-md sm:hidden focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6 text-text-primary" />
            </button>
            <button
              onClick={() => navigate(-1)}
              className="hidden p-2 rounded-md sm:block focus:outline-none"
            >
              <X className="w-6 h-6 text-text-primary" />
            </button>
          </div>
          {groupName && (
            <>
              <div className="mb-6 text-center">
                {isEdit ? (
                  <div className="flex items-center justify-center gap-4">
                    <input
                      type="text"
                      value={groupNameUpdatedValue}
                      onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
                      className="p-2 border rounded-full border-light-gray-divider bg-not-so-dark"
                    />
                    <button
                      onClick={updateGroupname}
                      disabled={isLoadingRenameGroup}
                    >
                      <Check className="w-6 h-6 text-green-500" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-4">
                    <h1 className="text-3xl font-semibold text-text-primary">
                      {groupName}
                    </h1>
                    <button
                      onClick={() => setIsEdit(true)}
                      disabled={isLoadingRenameGroup}
                    >
                      <PencilSquareIcon className="w-6 h-6 text-text-primary" />
                    </button>
                  </div>
                )}
              </div>

              <section className="mb-6">
                <h2 className="mb-4 text-lg font-semibold">Members</h2>
                <div className="h-64 max-w-2xl p-4 mx-auto overflow-auto rounded-md shadow bg-not-so-dark">
                  {/* Members list */}
                  {isLoadingRemoveMember ? (
                    <>
                      <CircularProgress />
                    </>
                  ) : (
                    members.map((i) => (
                      <UserItem
                        user={i}
                        key={i._id}
                        isAdded
                        handler={removeMemberHandler}
                      ></UserItem>
                    ))
                  )}
                </div>
              </section>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={openConfirmDeleteHandler}
                  className="flex items-center px-4 py-2 border-2 rounded-full button-red"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Delete Group
                </button>
                <button
                  onClick={openAddMemberHandler}
                  className="flex items-center px-4 py-2 border-2 rounded-full button-blue"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Member
                </button>
              </div>
            </>
          )}

          {isAddMenber && (
            <Suspense fallback={<div>loading....</div>}>
              <AddMemberDialog chatId={chatId} />
            </Suspense>
          )}

          {isDeleteMenu && (
            <Suspense fallback={<div>Loading....</div>}>
              <ConfirmDeleteDialog
                open={isDeleteMenu}
                handleClose={closeConfirmDeleteHandler}
                deleteHandler={deleteHandler}
              />
            </Suspense>
          )}


          {/* Mobile Menu (Headless UI Transition) */}
          <Transition.Root show={isMobileMenuOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={setIsMobileMenuOpen}
            >
              <Transition.Child>
                <div className="fixed inset-0 transition-opacity bg-white bg-opacity-5" />
              </Transition.Child>
              <div className="fixed inset-0 z-10 flex h-[calc(100dvh-4rem)] sm:max-h-screen">
                <div className="flex items-center justify-start min-h-full text-center sm:items-center sm:p-0">
                  <Transition.Child>
                    <Dialog.Panel className="relative px-4 pt-5 pb-4 w-64 overflow-hidden text-left transition-all transform bg-not-so-dark h-[calc(100dvh-4rem)] sm:max-h-screen shadow-xl sm:my-8 sm:w-full sm:p-6">
                      <GroupsList myGroups={myGroups?.data?.message} />
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </main>
      </div>
      </div>
      <BottomBar />
    </div>
  );
};

const GroupsList = ({ myGroups = [] }) => (
  <div className="p-4 ">
    {myGroups.length > 0 ? (
      myGroups.map((group) => <GroupItem key={group._id} group={group} />)
    ) : (
      <p className="text-center text-text-primary">No groups found</p>
    )}
  </div>
);

const GroupItem = ({ group }) => (
  <Link
    to={`?group=${group._id}`}
    className="flex items-center justify-between p-4 mb-4 transition-shadow duration-300 border-b border-light-gray-divider group-item "
  >
    <div className="flex items-center">
      <img
        src={
          isValidAvatar(group.avatar)
            ? group.avatar
            : `https://avatar.iran.liara.run/username?username=${group.name}`
        }
        alt={group.name}
        className="w-12 h-12 mr-4 rounded-full"
      />
      <div>
        <h4 className="text-lg font-bold text-text-primary">{group.name}</h4>
        <p className="text-sm text-gray-500">{group.description}</p>
      </div>
    </div>
  </Link>
);

export default Groups;
