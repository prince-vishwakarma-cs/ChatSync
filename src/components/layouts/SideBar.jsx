import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Menu } from "@mui/icons-material";
import {
  AddTeamIcon,
  Logout01Icon,
  MessageAdd01Icon,
  Notification03Icon,
  UserGroupIcon,
} from "hugeicons-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
import NewGroupDialog from "../specific/NewGroupDialog";
import NotificationsDialog from "../specific/NotificationsDialog";
import SearchDialog from "../specific/SearchDialog";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../constants/config";
import { userNotExist } from "../../redux/reducers/auth";
import { ResetNotificationCount } from "../../redux/reducers/chat";
import ChatSearch from "../specific/ChatSearch";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { notificationCount } = useSelector((state) => state.chat);

  const openSearch = () => {
    dispatch(setIsSearch(true));
  };

  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const newGroupHandler = () => {
    dispatch(setIsNewGroup(true));
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(ResetNotificationCount());
  };

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExist());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between w-16 h-[100dvh] text-[var(--text-sec)] bg-[var(--bg-color-sec)] ">
        <div>
          <h1 className="hidden p-3 mt-4 mb-8 text-2xl font-semibold tracking-wide text-white rounded-lg bg-primary sm:block">
            <MessageAdd01Icon />
          </h1>
          <h1
            className="flex items-center p-3 mt-4 mb-8 text-2xl font-semibold tracking-wide text-white rounded-lg bg-primary sm:hidden"
            onClick={handleMobile}
          >
            <Menu className="flex items-center" />
          </h1>
          <div className="flex flex-col items-center gap-6">
            <IconButton Icon={HomeIcon} onClick={() => navigate("/home")} />
            <IconButton Icon={MagnifyingGlassIcon} onClick={openSearch} />
            <SearchDialog />
            <ChatSearch/>
            <IconButton Icon={AddTeamIcon} onClick={newGroupHandler} />
            <NewGroupDialog />
            <IconButton
              Icon={UserGroupIcon}
              onClick={() => navigate("/groups")}
            />
            <IconButton
              Icon={Notification03Icon}
              onClick={openNotification}
              value={notificationCount}
            />
            <NotificationsDialog />
          </div>
        </div>
        <div>
          <IconButton Icon={Logout01Icon} onClick={logoutHandler} />
        </div>
      </div>
    </>
  );
};

const IconButton = ({
  Icon,
  onClick,
  value = 0,
  hoverClass = "hover:bg-gray-200",
}) => {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={`flex items-center p-2 transition-all duration-300 rounded-full ${hoverClass}`}
      >
        <Icon className="w-6 h-6" />
      </button>

      {value !== 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
          {value}
        </span>
      )}
    </div>
  );
};

export default SideBar;