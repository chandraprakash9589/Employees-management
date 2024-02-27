import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { BaseURL } from "../../Utils/utils";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Layout from "./../../components/Layout/index";
import "./signup.css";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPass: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPass: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  });

  const handleRChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { email, firstName, lastName, password, confirmPass } =
    registrationData;
  const validationCheck = () => {
    let isValid = true;
    const newErrors = { errors };

    const emailPattern = /^[^\s@]+@(bestpeers|gmail)+.(in|com)$/;
    if (!email || !email.trim() || !emailPattern.test(email)) {
      isValid = false;
      newErrors.email = "Please enter a valid bestpeers email address";
    }
    const namePattern = /^[A-Za-z]+(?: [A-Za-z]+){0,3}$/;
    if (!firstName.trim() || !namePattern.test(firstName)) {
      isValid = false;
      newErrors.firstName = "Valid first name is required";
    }

    if (!lastName.trim() || !namePattern.test(lastName)) {
      isValid = false;
      newErrors.lastName = "Valid last name is required";
    }

    if (!password.trim() || (password && password.length < 6)) {
      isValid = false;
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPass) {
      isValid = false;
      newErrors.confirmPass = "Passwords do not match";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleReset = () => {
    setRegistrationData({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPass: "",
    });
    setErrors({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPass: "",
    });
  };

  const handleRSubmit = async (e) => {
    e.preventDefault();
    if (validationCheck()) {
      try {
        const data = {
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
        };
        const response = await axios.post(`${BaseURL}/users/signup`, data);
        toast.success("User Registered...", {
          position: "top-right",
          autoClose: 2000,
        });
        if (response.data) {
          localStorage.setItem("jwtToken", response.data.token);
        }
        setRegistrationData({
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPass: "",
        });
      } catch (error) {
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <>
      <Layout newIndex="6">
        <div>
          <div className="containerOne" style={{ maxWidth: "590px" }}>
            <h3 className="headOne">REGISTER EMPLOYEE</h3>
            <Form className="p-4 backg">
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label className="fw">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={registrationData.email}
                  onChange={handleRChange}
                  className="bg-dark text-white"
                />
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw">First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={registrationData.firstName}
                  onChange={handleRChange}
                  className="bg-dark text-white"
                />
                <Form.Text className="text-danger">
                  {errors.firstName}
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw">Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={registrationData.lastName}
                  onChange={handleRChange}
                  className="bg-dark text-white"
                />
                <Form.Text className="text-danger">{errors.lastName}</Form.Text>
              </Form.Group>
              <Form.Group
                controlId="formGroupPassword"
                className={errors.password ? "mb-3" : null}
              >
                <Form.Label className="fw">Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={registrationData.password}
                  onChange={handleRChange}
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
                <Form.Text
                  style={{ left: -20 }}
                  className="position-relative text-danger"
                >
                  {errors.password}
                </Form.Text>
              </Form.Group>
              <Form.Group className={errors.confirmPass ? "mb-4" : "mb-2"}>
                <Form.Label className="fw">Confirm Password</Form.Label>
                <Form.Control
                  type={showCPassword ? "text" : "password"}
                  name="confirmPass"
                  placeholder="Enter password again"
                  value={registrationData.confirmPass}
                  onChange={handleRChange}
                  className="bg-dark text-white pe-5"
                />
                <span
                  className="position-relative"
                  style={{ top: "-32px", right: "-485px", cursor: "pointer" }}
                  onClick={() => setShowCPassword(!showCPassword)}
                >
                  {showCPassword ? (
                    <IoIosEyeOff size={20} />
                  ) : (
                    <IoIosEye size={20} />
                  )}
                </span>
                <Form.Text
                  style={{ left: -20 }}
                  className="position-relative text-danger"
                >
                  {errors.confirmPass}
                </Form.Text>
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button
                  className="fw"
                  variant="outline-success"
                  type="submit"
                  onClick={handleRSubmit}
                >
                  REGISTER
                </Button>{" "}
                <Button
                  className="fw"
                  variant="outline-danger"
                  onClick={() => handleReset()}
                >
                  RESET
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
};

export default Signup;
