import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Site() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
