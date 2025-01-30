import React, { useState } from "react";
import { Camera } from "react-feather";
import axios from "axios";
import { server } from "../components/constants/config";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { userExists, userNotExist } from "../redux/reducers/auth";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState({ file: null, preview: "" });
  
  const dispatch = useDispatch();

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Creating account...");

    const formData = new FormData();
    if (avatar.file) formData.append("avatar", avatar.file);
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("bio", bio);
    
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Logging in...");
    
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username,
          password: password,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Avatar file change handler
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar({
          file: file,
          preview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex items-center w-screen min-h-[100dvh] bg-not-quite-black">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 mx-auto border-2 shadow-lg bg-not-so-dark border-color-accent rounded-3xl text-text-primary">
        {isLogin ? (
          <>
            <h5 className="mb-4 text-xl font-semibold">Login</h5>
            <form className="flex flex-col w-full gap-4" onSubmit={handleLogin}>
              <div>
                <label htmlFor="text" className="block text-sm font-medium">
                  Username
                </label>
                <input
                  required
                  type="text"
                  id="text"
                  className="block w-full px-4 py-2 mt-1 border shadow-sm border-light-gray-divider bg-not-so-dark rounded-3xl"
                  placeholder="user123"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  required
                  type="password"
                  id="password"
                  className="block w-full px-4 py-2 mt-1 border shadow-sm border-light-gray-divider bg-not-so-dark rounded-3xl "
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 button-blue"
                disabled={isLoading}
              >
                Login
              </button>
            </form>
          </>
        ) : (
          <>
            <h5 className="mb-4 text-xl font-semibold ">Create an account</h5>
            <form
              className="flex flex-col w-full gap-4"
              onSubmit={handleSignUp}
            >
              <div className="flex justify-center">
                <div className="relative w-28 h-28">
                  <img
                    src={
                      avatar.preview ||
                      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?size=626&ext=jpg"
                    }
                    alt="User Avatar"
                    className="object-cover w-full h-full rounded-full"
                  />
                  <div className="absolute bottom-0 right-0 p-2 border-2 rounded-full cursor-pointer border-not-so-dark bg-not-quite-black">
                    <input
                      type="file"
                      id="file-upload"
                      className="absolute inset-0 w-full h-full opacity-0"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                    <Camera />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  className="block w-full px-4 py-2 mt-1 border border-light-gray-divider bg-not-so-dark rounded-3xl"
                  placeholder="Joseph"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium">
                  Bio
                </label>
                <input
                  required
                  type="text"
                  id="bio"
                  className="block w-full px-4 py-2 mt-1 border border-light-gray-divider bg-not-so-dark rounded-3xl"
                  placeholder="Living the life"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium">
                  Username
                </label>
                <input
                  required
                  type="text"
                  id="username"
                  className="block w-full px-4 py-2 mt-1 border border-light-gray-divider bg-not-so-dark rounded-3xl"
                  placeholder="user123"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  required
                  type="password"
                  id="password"
                  className="block w-full px-4 py-2 mt-1 border border-light-gray-divider bg-not-so-dark rounded-3xl"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 button-blue"
                disabled={isLoading}
              >
                Sign Up
              </button>
            </form>
          </>
        )}
        <button
          className="mt-4 text-[#d0eaff] hover:underline"
          onClick={toggleLogin}
          disabled={isLoading}
        >
          {isLogin ? "Create an account" : "Back to Login"}
        </button>
      </div>
    </main>
  );
};

export default Login;
