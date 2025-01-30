import { useInputValidation } from '6pp';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { Search } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyChatSearchQuery } from '../../redux/api/api';
import { setChatSearch } from '../../redux/reducers/misc';
import { Link } from 'react-router-dom';

const ChatSearch = () => {
  const dispatch = useDispatch();
  const { chatSearch } = useSelector((state) => state.misc);
  const [ChatSearch] = useLazyChatSearchQuery();
  const [users, setUsers] = useState([]); // Add users state
  
  const search = useInputValidation("");

  // Handle close of chat search
  const closeChatSearch = () => {
    dispatch(setChatSearch(false));
  };

  // Search users based on the input value
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      ChatSearch(search.value)
        .then(({ data }) => setUsers(data.result)) // Set users from the search result
        .catch((e) => console.log(e));
    }, 200);
    return () => clearTimeout(timeOutId);
  }, [search.value]);

  return (
    <Transition appear show={chatSearch} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeChatSearch}>
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
              <div className="w-full max-w-md p-6 overflow-hidden transition-all transform border-2 shadow-xl bg-not-so-dark rounded-3xl popup-container">
                {/* Search Bar */}
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="text-gray-400 " />
                  </div>
                  <input
                    type="text"
                    name="search"
                    value={search.value}
                    onChange={search.changeHandler}
                    className="block w-full p-3 pl-10 bg-transparent border-b-2 sm:text-sm border-color"
                    placeholder="Search..."
                  />
                </div>

                {/* User List */}
                <div className="space-y-4 max-h-[50vh] overflow-x-hidden overflow-y-auto scrollbar-none">
                {users.map((user) => (
                    <UserItem name={user.name} _id={user._id} handler={closeChatSearch} key={user.name}/>
                  ))}
                </div>

                <div className="flex justify-end mt-6 space-x-2">
                  <button
                    className="px-4 py-2 text-sm text-gray-900 bg-gray-300 border-2 rounded-full button-gray"
                    onClick={closeChatSearch}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ChatSearch;


const UserItem = ({ name,_id,handler}) => {
    return (
        <Link
        to={`/chat/${_id}`}
        onClick={handler}
      >
      <div className="flex items-center justify-between gap-1 p-4 border-b-2 border-color">
        <div className="flex items-center gap-2">
          <img
            className="w-12 h-12 rounded-full"
            src={`https://avatar.iran.liara.run/username?username=${name}`}
            alt="Avatar"
          />
          <div className="flex flex-col items-start justify-center">
            <div className="flex items-baseline gap-2">
              <p className="font-medium text-left text-gray-900">{name}</p>
            </div>
          </div>
        </div>
      </div>
      </Link>
    );
  };