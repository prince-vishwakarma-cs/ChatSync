import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Drawer } from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetChatsQuery } from "../../redux/api/api";
import {
  setIsDeleteMenu,
  setIsMobile,
  SetSelectedDeleteChat,
} from "../../redux/reducers/misc";
import { getSocket } from "../../socket";
import Title from "../shared/Title";
import LayoutSkeleton from "../Skeletons/AppLayoutSkeleton";
import ChatList from "../specific/ChatList";
import ProfileItem from "../specific/ProfileItem";
import DeleteChatMenu from "../Dialogs/DeleteChatMenu";
import BottomBar from "../layouts/BottomBar";
import { SidePanel } from "../specific/SidePanel";
import { ChatPanel } from "../specific/ChatPanel";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const location = useLocation(); // This gives the current URL
    const chatId = params.chatId;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { isLoading, data, refetch } = useGetChatsQuery("");
    const deleteMenuAnchor = useRef(null);
    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };

    // Socket and event setup
    const socket = getSocket();
    useEffect(() => {
      // Add socket listeners and events here
    }, [socket]);

    // Conditional rendering logic for third section
    const renderThirdSection = () => {
      switch (location.pathname) {
        case "/settings":
          return <SettingsComponent user={user} />;
        case "/notifications":
          return <NotificationsComponent />;
        default:
          return <ProfileItem user={user} />; // Default fallback
      }
    };

    return (
      <>
        <Title />
        <div className=" flex-col w-screen h-[100dvh] bg-not-quite-black ">
          <div className="flex flex-1 flex-grow">
          <SidePanel className="flex flex-col flex-grow"/>
          <ChatPanel
                  chats={data?.chats}
                  chatId={chatId}
                  onlineUsers={[]}
                  handleDeleteChat={() => {}}
                  user={user}
                />
       
          <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />

          {isLoading ? (
            <LayoutSkeleton />
          ) : (
            <Drawer
              open={isMobile}
              onClose={handleMobileClose}
              sx={{ height: "100vh", scrollbar: "none" }}
            >
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                onlineUsers={[]}
                handleDeleteChat={() => {}}
                user={user}
              />
            </Drawer>
          )}

          <div className="flex flex-1 w-screen overflow-hidden rounded-tr-none rounded-br-none ">
          <div className="hidden sm:block sm:w-5/12 md:w-5/12 lg:w-3/12">

              {isLoading ? (
                <>
                  {/* Render skeleton items */}
                </>
              ) : (
                <ChatList
                  chats={data?.chats}
                  chatId={chatId}
                  onlineUsers={[]}
                  handleDeleteChat={() => {}}
                  user={user}
                />
              )}
            </div>
            <div className="block w-full sm:w-7/12 lg:w-6/12 md:w-7/12">
              <WrappedComponent {...props} chatId={chatId} user={user} />
            </div>
            <div className="hidden lg:block lg:w-3/12">
              {/* Render third section conditionally */}
              {renderThirdSection()}
            </div>
          </div>
        </div>
        <BottomBar />
        </div>
      </>
    );
  };
};

export default AppLayout;
