import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Layout.css";
import "../../style.css";
import Header from "../Header/Header";
import secureLocalStorage from "react-secure-storage";

export default function Layout({ children, newIndex }) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = secureLocalStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  return (
    <>
      <Header newIndex={newIndex} />
      <div className="content">{children}</div>
    </>
  );
}
