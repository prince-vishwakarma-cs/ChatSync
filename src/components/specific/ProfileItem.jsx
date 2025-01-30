import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import moment from "moment";
import { Fragment, useState } from "react";
import { transformImge } from "../../libs/features";
import { isValidAvatar } from "./SearchDialog";

const ProfileScreen = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <div className="h-[100dvh] border-l border-light-gray-divider bg-not-so-dark text-text-secondary">
      <div className="max-w-4xl p-6 mx-auto ">
        <div className="flex flex-wrap items-center justify-center gap-6 space-x-4">
          <img
            className="object-cover w-24 h-24 rounded-full"
            src={
              isValidAvatar(user?.avatar?.url)
                ? transformImge(user?.avatar?.url)
                : `https://avatar.iran.liara.run/username?username=${user.name}`
            }
            alt="Avatar"
          />
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">
              {user?.name}
            </h2>
            <p className="">{user?.username}</p>
            <p className="">{moment(user?.createdAt).fromNow()}</p>
            <button
              className="px-4 py-2 mt-2 text-sm font-medium border-2 rounded-full button-blue"
              onClick={openModal}
            >
              Edit Profile
            </button>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-text-primary">Bio</h3>
          <p className="mt-2 ">{user?.bio}</p>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md p-6 overflow-hidden transition-all transform bg-white border-[#d0eaff] border-2 shadow-xl rounded-3xl">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 "
                  >
                    Edit Profile
                  </DialogTitle>
                  <div className="mt-4 ">
                    <div className="space-y-4">
                      <div>
                        <label className="flex justify-start text-sm font-medium ">
                          Name
                        </label>
                        <input
                          type="text"
                          defaultValue={user?.name}
                          className="block w-full px-3 py-2 mt-1 border border-gray-300 shadow-sm rounded-3xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="flex justify-start text-sm font-medium text-gray-70">
                          Bio
                        </label>
                        <input
                          type="text"
                          defaultValue={user?.username}
                          className="block w-full px-3 py-2 mt-1 border border-gray-300 shadow-sm rounded-3xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6 space-x-2">
                    <button
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium button-gray"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button className="inline-flex justify-center px-4 py-2 text-sm font-medium button-blue">
                      Save
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ProfileScreen;
