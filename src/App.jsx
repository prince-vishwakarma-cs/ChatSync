import { useEffect, useState } from "react";
import React, { lazy, Suspense } from "react";
import "./index.css";
import axios from "axios";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { server } from "./components/constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExist } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";
import LayoutSkeleton from "./components/Skeletons/AppLayoutSkeleton";
import { SocketProvider } from "./socket";

const Home = lazy(() => import("./pages/Home"));
const Groups = lazy(() => import("./pages/Groups"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const PageNotFound = lazy(() => import("./pages/NotFoundPage"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ChatsManagement = lazy(() => import("./pages/admin/ChatsManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));
const Search = lazy(()=> import("./pages/Search"))
const NewGroup = lazy(()=> import("./pages/NewGroup"))
const Notifications = lazy(()=> import("./pages/Notifications"))

const App = () => {
  const { user ,loader} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => {
        dispatch(userExists(data.message)); 
        setLoading(false);
      })
      .catch(() => {
        dispatch(userNotExist());
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutSkeleton />}>
        <Routes>
          {/* Protected routes that require user authentication */}
          <Route
            element={
              <SocketProvider>
                <ProtectedRoute user={user} loading={loading} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/search" element={<Search/>} />
            <Route path="/newgroup" element={<NewGroup/>} />
            <Route path="/notifications" element={<Notifications/>} />
          </Route>
          {/* Routes for authentication */}
          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} loading={loading} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatsManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />

          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;



// delte mrnu ke liye alag se ek variale redux me bnanab hai