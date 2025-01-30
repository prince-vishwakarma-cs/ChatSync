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
    flex: 0.5,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    flex: 0.7,
    renderCell: (params) => (
      <Avatar
        alt={params.row.sender.name}
        src={params.row.avatar}
        sx={{ width: 40, height: 40 }} 
      />
    ),
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    flex: 1,
    renderCell: (params) => (
      <Typography variant="body2" sx={{ fontWeight: "500" }}>
        {params.row.content}
      </Typography>
    ),
  },
  {
    field: "sender",
    headerName: "Sent by",
    headerClassName: "table-header",
    flex: 1,
    renderCell: (params) => (
      <Typography variant="body2" sx={{ fontWeight: "500", color: "#666" }}>
        @{params.row.sender.name}
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
    headerName: "Group Chat",
    headerClassName: "table-header",
    flex: 0.7,
    renderCell: (params) => (
      <Typography variant="body2">{params.row.groups}</Typography>
    ),
  },
];

const MessageManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.messages.map((message) => ({
        ...message,
        id: message._id,
        avatar: transformImge(message.avatar, 50),
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Box
        sx={{
          height: "100vh",
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
          All Messages
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 3,
            padding: 3,
            minHeight: 0,
            overflow: "auto",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
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
                overflowX: "auto",
              },
            }}
          />
        </Box>
      </Box>
    </AdminLayout>
  );
};

// Updated sample data
const dashboardData = {
  messages: [
    {
      _id: "1",
      content: "Hello, how are you?",
      avatar: "https://avatar.iran.liara.run/public",
      sender: { name: "John Doe" },
      friends: 100,
      groups: "No", // Indicating it's not a group chat
    },
    {
      _id: "2",
      content: "Let's meet at 5 PM.",
      avatar: "https://avatar.iran.liara.run/public",
      sender: { name: "Jane Smith" },
      friends: 150,
      groups: "Yes", // Indicating it is a group chat
    },
  ],
};

export default MessageManagement;
