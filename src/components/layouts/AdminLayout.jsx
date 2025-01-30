import { Navigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Menu01Icon } from "hugeicons-react";
import React, { useState } from "react";
import { X } from "react-feather";
import { Link, useLocation } from "react-router-dom";

import { Chat, Dashboard, ExitToApp, Forum, Person } from "@mui/icons-material";
import { adminLogout } from '../../redux/thunks/admin';
import { useDispatch, useSelector } from 'react-redux';

const adminTabs = [
  {
    name: "Dashboard",
    route: "/admin",
    icon: <Dashboard />,
  },
  {
    name: "Users",
    route: "/admin/users",
    icon: <Person />,
  },
  {
    name: "Chats",
    route: "/admin/chats",
    icon: <Chat />,
  },
  {
    name: "Messages",
    route: "/admin/messages",
    icon: <Forum />,
  },
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(adminLogout())
  };

  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        Chattu
      </Typography>

      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.route}
            to={tab.route}
            sx={
              location.pathname === tab.route && {
                bgcolor: "black",
                color: "white",
                ":hover": { color: "white" },
              }
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}

        <Link onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToApp />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};
const AdminLayout = ({ children }) => {
  const {isAdmin} = useSelector((state) => state.auth)
  const [isMobile, setisMobile] = useState();

  const handleMobile = () => {
    setisMobile(!isMobile);
  };

  if(!isAdmin){
    return <Navigate to="/admin"/>
  }

  return (
    <Grid container minHeight={"100dvh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: "1rem",
          right: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <X /> : <Menu01Icon />}
        </IconButton>
      </Box>
      <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Grid>

      <Grid item xs={12} md={8} sx={{ bgcolor: "gray" }} lg={9}>
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleMobile}>
        <Sidebar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
