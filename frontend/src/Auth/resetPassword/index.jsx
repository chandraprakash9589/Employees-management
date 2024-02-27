import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BaseURL } from "../../Utils/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCPassword, setShowCPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPass: "",
  });
  const validationCheck = () => {
    let isValid = true;
    const newErrors = { errors };

    if (password && password.length < 6) {
      isValid = false;
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      isValid = false;
      newErrors.confirmPass = "Passwords do not match";
    }

    setErrors(newErrors);
    return isValid;
  };
  useEffect(() => {
    const verifyResetToken = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/forgotPass/reset-password/${id}/${token}`,
        );
        if (response.status === 200) {
          setData(true);
        } else if (response.status === 401) {
          navigate("*"); // Navigate to not-found page if token is expired
        }
      } catch (error) {
        console.error("Error verifying reset token:", error);
      }
    };
    verifyResetToken();
  }, [id, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validationCheck()) {
      try {
        const response = await axios.put(
          `${BaseURL}/forgotPass/reset-password/${id}/${token}`,
          { password },
        );
        if (response.status === 200) {
          setPassword("");
          toast.success("Password reset successful!", {
            onClose: () => navigate("/login"),
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error resetting password", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <>
      {data ? (
        <div className="containerOne bg" style={{ margin: "9% auto" }}>
          <h3 className="headOne">Reset Password</h3>
          <Form className="p-4" onSubmit={handleSubmit}>
            <Form.Group className={errors.password ? "mb-3" : null}>
              <Form.Label className="fw">Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-dark text-white"
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            <div className="d-flex justify-content-between">
              <Button className="fw" variant="outline-success" type="submit">
                RESET PASSWORD
              </Button>
              <Button
                className="fw"
                variant="outline-info"
                onClick={() => navigate("/login")}
              >
                LOGIN
              </Button>
            </div>
          </Form>
          <ToastContainer />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="fw">Session expired to reset password! please try again</div>
          <div
            className="spinner-border text-primary d-block"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
