import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Button from "react-bootstrap/Button";
import "./EditEmployeesDetails.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../../Utils/utils";
import { ToastContainer, toast } from "react-toastify";
import Layout from "../../components/Layout";
export const EditEmployeesDetails = () => {
  const navigate = useNavigate();
  const [fetchData, setFetchData] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [showCRPassword, setShowCRPassword] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPass: "",
    currentPass: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPass: "",
    currentPass: "",
  });

  const { email, firstName, lastName, password, confirmPass, currentPass } =
    employeeData;
  const validationCheck = () => {
    let isValid = true;
    const newErrors = { errors };

    const emailPattern = /^[^\s@]+@(bestpeers|gmail)+.(in|com)$/;
    if (!email || !email.trim() || !emailPattern.test(email.trim())) {
      isValid = false;
      newErrors.email = "Please enter a valid email address";
    }
    const namePattern = /^[A-Za-z]+(?: [A-Za-z]+){0,3}$/;
    if (!firstName.trim() || !namePattern.test(firstName.trim())) {
      isValid = false;
      newErrors.firstName = "Valid First name is required";
    }

    if (!lastName.trim() || !namePattern.test(lastName.trim())) {
      isValid = false;
      newErrors.lastName = "Valid Last name is required";
    }

    if (password && password.length < 6) {
      isValid = false;
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPass) {
      isValid = false;
      newErrors.confirmPass = "Passwords do not match";
    }

    if (!currentPass || !currentPass.trim()) {
      isValid = false;
      newErrors.currentPass = "Current password is required";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevData) => ({
      ...prevData,
      [name]: null,
    }));
  };

  const id = localStorage.getItem("userId");
  const currentPassword = localStorage.getItem("password");

  const getUser = async () => {
    try {
      const res = await axios.get(`${BaseURL}/users/getUserDetails/${id}`);
      const { email, firstName, lastName } = res.data;
      setEmployeeData((prevData) => ({
        ...prevData,
        email,
        firstName,
        lastName,
        password: "",
        confirmPass: "",
        currentPass: "",
      }));
    } catch (error) {
      console.error("ERR While getting Users:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validationCheck()) {
      if (currentPass === currentPassword) {
        const data = {
          firstName,
          lastName,
          password: password ? password : currentPass,
        };
        try {
          await axios.put(`${BaseURL}/users/UpdateUserDetails/${id}`, data);
          localStorage.setItem("password", data.password);
          localStorage.setItem("lastName", data.lastName);
          localStorage.setItem("firstName", data.firstName);

          toast.success("Employee Details Updated Successfully...", {
            position: "top-right",
            autoClose: 2000,
          });
          setFetchData(!fetchData);
        } catch (error) {
          toast.error("Something went wrong! please login again", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      } else {
        setErrors({ currentPass: "Incorrect Password" });
      }
    }
  };
  return (
    <>
      <Layout newIndex="6">
        <div className="containerOne">
          <h3 className="headOne">Edit Employee</h3>
          <Form className="p-4 backg">
            <Form.Group className="mb-4" controlId="formGroupEmail">
              <Form.Label className="fw">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => handleChange(e)}
                className="text-white bg-dark"
                disabled
              />
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="fw">First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => handleChange(e)}
                className="text-white bg-dark"
              />
              <Form.Text className="text-danger">{errors.firstName}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="fw">Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={lastName}
                onChange={(e) => handleChange(e)}
                className="text-white bg-dark"
              />
              <Form.Text className="text-danger">{errors.lastName}</Form.Text>
            </Form.Group>
            <Form.Group
              className={errors.password ? "mb-3" : null}
              controlId="formGroupPassword"
            >
              <Form.Label className="fw">
                New Password{" "}
                <span className="fw-normal text-light">
                  (leave blank if you don't want to change it)
                </span>
              </Form.Label>

              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={(e) => handleChange(e)}
                className="text-white bg-dark"
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
                className="text-danger position-relative"
                style={{ left: "-20px" }}
              >
                {errors.password}
              </Form.Text>
            </Form.Group>
            <Form.Group className={errors.confirmPass ? "mb-3" : null}>
              <Form.Label className="fw">New Password confirmation</Form.Label>
              <Form.Control
                type={showCPassword ? "text" : "password"}
                name="confirmPass"
                placeholder="Enter confirm password"
                value={confirmPass}
                onChange={(e) => handleChange(e)}
                className="text-white bg-dark"
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
                className="text-danger position-relative"
                style={{ left: "-20px" }}
              >
                {errors.confirmPass}
              </Form.Text>
            </Form.Group>
            <Form.Group className={errors.currentPass ? "mb-4" : "mb-2"}>
              <Form.Label className="fw">
                Current password <span className="text-danger">*</span>
              </Form.Label>

              <Form.Control
                type={showCRPassword ? "text" : "password"}
                name="currentPass"
                placeholder="Enter current password"
                value={currentPass}
                onChange={(e) => handleChange(e)}
                className="text-white bg-dark"
              />
              <span
                className="position-relative"
                style={{ top: "-32px", right: "-485px", cursor: "pointer" }}
                onClick={() => setShowCRPassword(!showCRPassword)}
              >
                {showCRPassword ? (
                  <IoIosEyeOff size={20} />
                ) : (
                  <IoIosEye size={20} />
                )}
              </span>
              <Form.Text
                className="text-danger position-relative"
                style={{ left: "-20px" }}
              >
                {errors.currentPass}
              </Form.Text>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button
                className="fw"
                variant="outline-success"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                UPDATE
              </Button>{" "}
              <Button
                className="fw"
                variant="outline-primary"
                onClick={() => navigate("/")}
              >
                BACK
              </Button>
            </div>
          </Form>
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
};
