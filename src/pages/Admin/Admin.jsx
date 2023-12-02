import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const adminLogin = localStorage.getItem("AdminLogin");
  if (adminLogin) {
    return true;
  } else {
    return false;
  }
};

export default function Admin() {
  const auth = useAuth();
  return <div>{auth ? <Outlet /> : <Navigate to="/AdminLogin" />}</div>;
}
