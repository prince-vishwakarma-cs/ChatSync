import { useInputValidation } from "6pp";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { Search, X } from "react-feather";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import { useAsyncMutation } from "../../hooks/hooks";
import {UserItem} from "../../pages/Search"

const SearchDialog = () => {
  const dispatch = useDispatch();
  const { isSearch } = useSelector((state) => state.misc);
  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);

  const closeSearch = () => {
    dispatch(setIsSearch(false));
  };
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState({});  // State to track loading status for each user
  const search = useInputValidation("");

  // Add Friend Handler with individual loading status
  const addFriendHandler = async (id) => {
    setLoadingUsers((prev) => ({ ...prev, [id]: true }));
    try {
      await sendFriendRequest("Sending friend request..", { userId: id });
    } catch (error) {
      console.error("Error sending friend request", error);
    }
    setLoadingUsers((prev) => ({ ...prev, [id]: false })); // Reset loading status after request
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
    <Transition appear show={isSearch} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeSearch}>
        <TransitionChild>
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
              <div className="w-full max-w-md p-6 overflow-hidden transition-all transform shadow-xl bg-not-so-dark rounded-3xl">
                {/* Search Bar with Cancel Button to the right */}
                <div className="flex items-center px-4 mb-4">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="search"
                      value={search.value}
                      onChange={search.changeHandler}
                      className="block w-full p-3 pl-10 bg-transparent border-b sm:text-sm border-light-gray-divider text-text-primary"
                      placeholder="Search..."
                    />
                  </div>
                  <button
                    className="p-2 text-sm rounded-full text-text-primary"
                    onClick={closeSearch}
                  >
                    <X />
                  </button>
                </div>

                {/* User List */}
                <div className="space-y-4 max-h-[50vh] overflow-x-hidden overflow-y-auto scrollbar-none">
                  {users.map((user) => (
                    <UserItem
                      key={user._id}
                      user={user}
                      handler={addFriendHandler}
                      isLoading={loadingUsers[user._id] || false} // Check individual loading status for each user
                    />
                  ))}
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SearchDialog;



export const isValidAvatar = (url) => {
  try {
    return url && (url.startsWith("https://res.cloudinary.com/") );
  } catch (error) {
    return false;
  }
};
