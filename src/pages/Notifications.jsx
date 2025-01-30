import React, { memo, useEffect, useState } from "react";
import { Check, X } from "react-feather";
import { isValidAvatar } from "../components/specific/SearchDialog";
import { SidePanel } from "../components/specific/SidePanel";
import { useAsyncMutation, useErrors } from "../hooks/hooks";
import {
    useAcceptFriendRequestMutation,
    useGetNotificationsQuery,
} from "../redux/api/api";
import BottomBar from "../components/layouts/BottomBar";
import { getSocket } from "../socket";

const NotificationsPage = () => {
  const socket = getSocket()
  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  const [notifications, setNotifications] = useState([]);

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);
  const friendRequestHandler = async ({ _id, accept }) => {
    await acceptRequest("Processing...", { requestId: _id, accept });
    setNotifications((prev) => prev.filter((req) => req._id !== _id));
  };

  useErrors([{ error, isError }]);

  useEffect(() => {
    if (data?.allRequests) {
      setNotifications(data.allRequests);
    }
  }, [data]);
  
  useEffect(() => {
    socket.on("NEW_REQUEST", (newRequest) => {
      setNotifications((prev) => [newRequest, ...prev]);
    });
  
    return () => {
      socket.off("NEW_REQUEST");
    };
  }, []);
  

  return (
    <div  className="flex flex-col h-screen bg-not-so-dark">
    <div className="flex flex-1 grow">
      <SidePanel />
      <div className="flex items-center p-2 justify-center flex-grow h-[calc(100dvh-4rem)] sm:h-screen rounded-tr-none rounded-br-none bg-not-so-dark sm:rounded-2xl">
        <div className="w-full max-w-md p-6 overflow-hidden shadow-lg rounded-3xl bg-selected-bg">
          <h2 className="text-lg font-semibold text-gray-100">Notifications</h2>

          <div className="mt-4 space-y-4 max-h-[50vh] overflow-y-auto">
            {isLoading ? (
              <NotificationItemSkeleton />
            ) : data?.allRequests?.length === 0 ? (
              <div className="text-gray-400">No Notifications</div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification._id}
                  sender={notification.sender}
                  _id={notification._id}
                  handler={friendRequestHandler}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
    <BottomBar className="block sm:hidden"/>
    </div>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700">
      <div className="flex items-center gap-2">
        <img
          className="w-10 h-10 rounded-full"
          src={
            isValidAvatar(sender.avatar)
              ? sender.avatar
              : `https://avatar.iran.liara.run/username?username=${sender.name}`
          }
          alt="Avatar"
        />
        <div className="text-white">{sender.name}</div>
      </div>
      <div className="flex space-x-2">
        <button
          className="flex items-center justify-center w-8 h-8 button-green"
          onClick={() => handler({ _id, accept: true })}
        >
          <Check />
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 button-red"
          onClick={() => handler({ _id, accept: false })}
        >
          <X />
        </button>
      </div>
    </div>
  );
});

export const NotificationItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
        <div className="w-24 h-4 bg-gray-600 rounded-md"></div>
      </div>
      <div className="flex space-x-2">
        <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default NotificationsPage;
