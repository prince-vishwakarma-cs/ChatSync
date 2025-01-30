import {
  PlusCircleIcon as AddIcon,
  ChatBubbleLeftRightIcon as ChatIcon,
  UserGroupIcon as ManageGroupIcon,
  BellIcon as NotificationIcon,
  MagnifyingGlassCircleIcon as SearchIcon
} from "@heroicons/react/24/solid";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userNotExist } from "../../redux/reducers/auth";
import { setIsMobile, setIsNotification, setIsSearch } from "../../redux/reducers/misc";
import { server } from "../constants/config";

const BottomBar = () => {
  const dispatch = useDispatch();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  const navigate = useNavigate();

  const openSearch = () => {
    dispatch(setIsSearch(true));
  };

  const toggleNewGroup = () => {
    setIsNewGroupOpen((prev) => !prev);
  };

  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
  };

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExist());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className=" bottom-0 left-0 right-0 flex justify-around items-center h-16 text-[var(--text-sec)] bg-not-quite-black sm:hidden z-5 ">
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
        Icon={ManageGroupIcon}
        description="Manage Groups"
        onClick={() => navigate("/groups")}
        isActive={location.pathname === "/groups"} // Check if current route is manage groups
      />
       <IconButton
        Icon={NotificationIcon}
        description="Notifications"
        onClick={()=>navigate("/notifications")}
        value={7} // Show notification count if any
        isActive={location.pathname === "/notifications"} // Check if current route is notifications
      />
    </div>
  );
};

export default BottomBar;


export const IconButton = ({
  hoverClass = "normal-boi",
  Icon,
  value = 0,
  onClick,
  isActive = false // New prop for active state
}) => {
  return (
    <button
      className={`icon-button-no-bg ${hoverClass} ${isActive ? 'active-icon' : ''}`} // Removed squircle and background
      onClick={onClick}
    >
       <Icon className={`icon ${isActive ? 'active-icon' : ''}`} /> {/* Updated class for the icon */}
      {value > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 text-xs font-bold h-5 text-white transform translate-x-[30%] -translate-y-[30%] bg-red-500 rounded-full aspect-square">
        {value}
      </span>
      )}
    </button>
  );
};

