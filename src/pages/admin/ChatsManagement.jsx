import React, { useEffect, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminLayout from "../../components/layouts/AdminLayout";
import { transformImge } from "../../libs/features";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    flex: 0.5, // Make the column flex and adjust with screen size
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    flex: 0.7,
    renderCell: (params) => (
      <Avatar
        alt={params.row.name}
        src={params.row.avatar}
        sx={{ width: 40, height: 40 }} // Adjust avatar size for modern look
      />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    flex: 1,
    renderCell: (params) => (
      <Typography variant="body2" sx={{ fontWeight: "500" }}>
        {params.row.name}
      </Typography>
    ),
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    flex: 1,
    renderCell: (params) => (
      <Typography variant="body2" sx={{ fontWeight: "500", color: "#666" }}>
        @{params.row.username}
      </Typography>
    ),
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    flex: 0.7,
    renderCell: (params) => (
      <Typography variant="body2">{params.row.friends}</Typography>
    ),
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    flex: 0.7,
    renderCell: (params) => (
      <Typography variant="body2">{params.row.groups}</Typography>
    ),
  },
];

const ChatsManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.users.map((user) => ({
        ...user,
        id: user._id,
        avatar: transformImge(user.avatar, 50),
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Box
        sx={{
          height: "100dvh", // Full viewport height for the container
          display: "flex",
          flexDirection: "column",
          padding: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{ marginBottom: 2, fontWeight: "bold", color: "#333" }}
        >
          All Chats
        </Typography>
        {/* Flex-grow makes this box take up the remaining space */}
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 3,
            padding: 3,
            minHeight: 0, // Ensure it doesn't overflow
            overflow: "auto", // Add overflow to handle small screens
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            // autoHeight={true} // Automatically adjust height
            sx={{
              backgroundColor: "#fff",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#e0e0e0",
                fontSize: "1rem",
                fontWeight: "600",
                color: "#333",
              },
              "& .MuiDataGrid-cell": {
                padding: "10px",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f5f5f5",
              },
              "& .MuiDataGrid-root": {
                overflowX: "auto", // Allow horizontal scrolling when needed
              },
            }}
          />
        </Box>
      </Box>
    </AdminLayout>
  );
};

const dashboardData = {
  users: [
    {
      name: "John Doe",
      avatar: "https://avatar.iran.liara.run/public",
      _id: "1",
      username: "johny",
      friends: 100,
      groups: 10,
    },
    {
      name: "Jane Smith",
      avatar: "https://avatar.iran.liara.run/public",
      _id: "2",
      username: "janes",
      friends: 150,
      groups: 5,
    },
  ],
};

export default ChatsManagement;
