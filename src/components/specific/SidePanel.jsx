import {
  PlusCircleIcon as AddIcon,
  ChatBubbleLeftRightIcon as ChatIcon,
  ArrowUpOnSquareIcon as LogoutIcon,
  UserGroupIcon as ManageGroupIcon,
  BellIcon as NotificationIcon,
  MagnifyingGlassCircleIcon as SearchIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userNotExist } from "../../redux/reducers/auth";
import "../../styling.css";
import ChatSearch from "./ChatSearch";
import axios from "axios";
import { server } from "../constants/config";

export const SidePanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { notificationCount } = useSelector((state) => state.chat);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExist());
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };

  return (
<ul className="box-border z-40 flex-col hidden w-20 gap-4 p-4 bg-not-quite-black sm:flex">
<IconButton
        Icon={ChatIcon}
        description="Home"
        onClick={() => navigate("/")}
        isActive={location.pathname === "/"} // Check if current route is home
      />
      <IconButton
        Icon={SearchIcon}
        description="Search"
        onClick={() => navigate("/search")}
        isActive={location.pathname === "/search"} // Check if current route is search
      />
      <IconButton
        Icon={AddIcon}
        description="New Group"
        onClick={() => navigate("/newgroup")}
        isActive={location.pathname === "/newgroup"} // Check if current route is new group
      />
      <IconButton
        Icon={NotificationIcon}
        description="Notifications"
        onClick={()=>navigate("/notifications")}
        value={notificationCount} // Show notification count if any
        isActive={location.pathname === "/notifications"} // Check if current route is notifications
      />
      <IconButton
        Icon={ManageGroupIcon}
        description="Manage Groups"
        onClick={() => navigate("/groups")}
        isActive={location.pathname === "/groups"} // Check if current route is manage groups
      />
      <div className="flex grow"></div>
      <IconButton
        Icon={LogoutIcon}
        description="Logout"
        onClick={logoutHandler}
      />
    </ul>
  );
};


export const IconButton = ({
  hoverClass = "normal-boi",
  Icon,
  description = "Icon",
  value = 0,
  onClick,
  isActive = false // New prop for active state
}) => {
  return (
    <button
      className={`squircle bg-lighter-dark ${hoverClass} ${isActive ? 'active-boi' : ''}`} // Add active class here
      onClick={onClick}
    >
      <Icon className={`w-6 h-6 ${isActive ? 'active-icon' : ''}`} /> {/* Optional icon styling */}
      <div className="popper-boi">
        <h4 className="popper-text">{description}</h4>
      </div>
      {value > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 text-xs font-bold h-5 text-white transform translate-x-[30%] -translate-y-[30%] bg-red-500 rounded-full aspect-square">
          {value}
        </span>
      )}
    </button>
  );
};
