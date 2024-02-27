import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { BaseURL } from "../../Utils/utils";
import { ToastContainer, toast } from "react-toastify";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BaseURL}/auth/login`, loginData);
      if (response.data) {
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("firstName", response.data.user.firstName);
        localStorage.setItem("lastName", response.data.user.lastName);
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("password", loginData.password);
        navigate("/");
      }
    } catch (error) {
      toast.error("Incorrect credentials", {
        position: "top-right",
        autoClose: 2000,
      });
    }
    setLoginData({ email: "", password: "" });
  };
  return (
    <>
      <div className="containerOne" style={{ margin: "9% auto" }}>
        <h3 className="headOne">LOGIN</h3>
        <Form className="p-4 backg" style={{ backgroundColor: "#191c24" }}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label className="fw">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={loginData.email}
              onChange={handleLoginChange}
              className="bg-dark text-white"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label className="fw">Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={loginData.password}
              onChange={handleLoginChange}
              className="bg-dark text-white pe-5"
            />
            <span
              className="position-relative"
              style={{ top: "-32px", right: "-485px", cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoIosEyeOff size={20} />
              ) : (
                <IoIosEye size={20} />
              )}
            </span>
          </Form.Group>
          <Form.Group>
            <Form.Label className="w-100 text-end">
              <Link to="/forgot-password">Forgot Password</Link>
            </Form.Label>
          </Form.Group>
          <Button
            className="fw"
            style={{ marginTop: "-10px" }}
            variant="outline-success"
            type="submit"
            onClick={(e) => handleLoginSubmit(e)}
          >
            LOGIN
          </Button>{" "}
        </Form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
