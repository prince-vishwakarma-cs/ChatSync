import { Outlet, Navigate } from 'react-router-dom';
import React from "react";

const ProtectedRoute = ({ children, user, loading, redirect = "/login" }) => {
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <Navigate to={redirect} />;
    }
    return children ? children : <Outlet />;
};
export default ProtectedRoute;
