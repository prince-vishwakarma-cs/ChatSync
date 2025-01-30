import { Dialog } from "@headlessui/react";
import React, { memo } from "react";
import { Check, X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hooks";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducers/misc";
import { isValidAvatar } from "./SearchDialog";

const NotificationsDialog = () => {
  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  const dispatch = useDispatch();
  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    await acceptRequest("Accepting...", { requestId: _id, accept });
  };

  const closeHandler = () => {
    dispatch(setIsNotification(false));
  };
  const { isNotification } = useSelector((state) => state.misc);
  useErrors([{ error, isError }]);

  if (isError) {
    return (
      <Dialog
        as="div"
        className="relative z-10"
        open={isNotification}
        onClose={closeHandler}
      >
        <div className="fixed inset-0 bg-black bg-opacity-30" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <div className="w-full max-w-md p-6 overflow-hidden bg-white shadow-xl rounded-3xl">
              <div className="text-lg font-medium leading-6 text-gray-900">
                Error
              </div>
              <div className="mt-4 text-red-500">
                Unable to fetch notifications.
              </div>
              <div className="flex justify-end mt-6 space-x-2">
                <button
                  className="px-4 py-2 text-sm text-gray-900 bg-gray-300 border-2 rounded-full button-gray"
                  onClick={closeHandler}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog
      as="div"
      className="relative z-10"
      open={isNotification}
      onClose={closeHandler}
      aria-labelledby="notifications-dialog-title"
    >
      <div className="fixed inset-0 bg-black bg-opacity-30" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center">
          <div className="w-full max-w-md p-6 overflow-hidden bg-white shadow-xl rounded-3xl">
            <div
              id="notifications-dialog-title"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Notifications
            </div>

            <div className="mt-4 space-y-4 max-h-[50vh] overflow-x-hidden overflow-y-auto scroll-container">
              {isLoading ? (
                <NotificationItemSkeleton />
              ) : data?.allRequests?.length === 0 ? (
                <>No Notifications</>
              ) : (
                data?.allRequests?.map((notification, index) => (
                  <NotificationItem
                    key={index}
                    sender={notification.sender}
                    _id={notification._id}
                    handler={friendRequestHandler}
                  />
                ))
              )}
            </div>

            <div className="flex justify-end mt-6 space-x-2">
              <button
                className="px-4 py-2 text-sm text-gray-900 bg-gray-300 border-2 rounded-full button-gray"
                onClick={closeHandler}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  return (
    <div className="items-center justify-between flex-grow p-4 border-b-2 border-color">
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
        <div className="flex flex-row items-center justify-between flex-grow w-full">
          <div className="text-left text-gray-900">{sender.name}</div>
          <div className="flex mt-2 space-x-2">
            <button
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border-2 rounded-full button-green"
              onClick={() => handler({ _id, accept: true })}
            >
              <Check />
            </button>
            <button
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border-2 rounded-full button-red"
              onClick={() => handler({ _id, accept: false })}
            >
              <X />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export const NotificationItemSkeleton = () => {
  return (
    <div className="items-center justify-between flex-grow p-4 border-b-2 border-color animate-pulse">
      <div className="flex items-center gap-2">
        {/* Avatar Skeleton */}
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

        {/* Name and Buttons Skeleton */}
        <div className="flex flex-row items-center justify-between flex-grow w-full">
          {/* Name Placeholder */}
          <div className="w-24 h-4 bg-gray-300 rounded-md"></div>

          {/* Buttons Placeholder */}
          <div className="flex mt-2 space-x-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsDialog;
