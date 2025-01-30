import { Outlet } from "react-router-dom";
import { SidePanel } from "../specific/SidePanel"; // Adjust import path if necessary
import BottomBar from "../layouts/BottomBar"; // If you have a bottom bar

const MainLayout = () => {
  return (
    <div className="flex w-screen h-[100vh]">
      {/* Side Panel */}
      <SidePanel className="w-[5rem] flex-shrink-0" />

      {/* Main content area */}
      <div className="max-w-[calc(100vw - 5rem)]">
        {/* This will render the matched child route */}
        <Outlet />
      </div>

    </div>
  );
};

export default MainLayout;
