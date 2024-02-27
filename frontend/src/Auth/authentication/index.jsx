import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthenticationRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem("jwtToken");
    if (!localToken) {
      navigate("/login");
    }
  }, [navigate]);

  return <div>{children}</div>;
};
