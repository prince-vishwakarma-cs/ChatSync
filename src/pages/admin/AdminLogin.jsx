import { useInputValidation } from "6pp";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";

const isAdmin = true;
const AdminLogin = () => {
  const secretKey = useInputValidation("");
  const dispatch = useDispatch()

  const {isAdmin} = useSelector((state) => state.auth)

  const submithandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value))
  };

  useEffect(() => {
    dispatch(getAdmin())
  }, [dispatch])
   
  if(isAdmin) return <Navigate to="/admin/dashboard"/>
  return (
    <div className="relative z-10 flex items-center justify-center">
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
          <div className="relative w-full px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-3xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="flex flex-grow">
              <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Admin login
                </h3>
                <div className="w-full mt-2">
                  <form onSubmit={submithandler} className="w-full">
                    <input
                      required
                      type="password"
                      className="block w-full px-4 py-2 mt-1 border border-gray-300 shadow-sm rounded-3xl focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="enter admin key...."
                      value={secretKey.value}
                      onChange={secretKey.changeHandler}
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium border-2 border-transparent rounded-full shadow-sm focus:outline-none focus:ring-2 focus:[#add7f1] focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm button-blue"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
