import {
  AdminPanelSettings,
  Group,
  NotificationsRounded,
  Person,
  Message,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import { useFetchData } from "6pp";
import { server } from "../../components/constants/config";
import { useErrors } from "../../hooks/hooks";

const Dashboard = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/stats`,
    "dashboard-stats"
  );

  const { stats } = data || {};

  useErrors([
    {
      isError: error,
      error: error || "Something went wrong",
    },
  ]);
  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing="2rem"
      justifyContent="space-between"
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={stats?.userCount} Icon={<Person />} />
      <Widget title={"Chats"} value={stats?.totalChatsCount} Icon={<Group />} />
      <Widget
        title={"Messages"}
        value={stats?.messagesCount}
        Icon={<Message />}
      />
    </Stack>
  );
  const Appbar = (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", margin: "2rem 0rem", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettings sx={{ fontSize: "3rem" }} />
        <input type="text" />
        <button>sdgsfd</button>
        <Box flexGrow={1} />
        <Typography
          display={{ xs: "none", lg: "block" }}
          color={"rgba(0,0,0,0.7"}
          textAlign={"center"}
        >
          {moment().format("MMMM DD YYYY, h:mm:ss a")}
        </Typography>
        <NotificationsRounded />
      </Stack>
    </Paper>
  );
  return loading ? (
    <>
      <CircularProgress />
    </>
  ) : (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}
        <Stack direction={"row"} spacing={"2rem"} flexWrap={"wrap"}>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
            }}
          >
            <Typography margin={"2rem 0"} variant="h4">
              Last Messages
            </Typography>
            <LineChart value={stats?.messagesChart || []} />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              maxWidth: "45rem",
              display: "flex",
              justifyContent: "center",
              position: "relative",
              width: { xs: "100%", sm: "50%" },
              alignItems: "center",
              height: "25rem",
            }}
          >
            <DoughnutChart
              labels={["Single Chats", "Group Chats"]}
              value={[
                stats?.totalChatsCount - stats?.groupsCount || 0,
                stats?.groupsCount || 0,
              ]}
            />
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <Group /> <Typography>Vs </Typography>
              <Person />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: `5px solid black`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
