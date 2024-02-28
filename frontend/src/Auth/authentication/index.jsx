import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export const AuthenticationRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = secureLocalStorage.getItem("jwtToken");
    if (!localToken) {
      navigate("/login");
    }
  }, [navigate]);

  return <div>{children}</div>;
};
