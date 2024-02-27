import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../../Utils/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BaseURL}/forgotPass/forgot-password`,
        { email },
      );
      if (response.status === 200) {
        toast.success("Email sent successfully!", {
          onClose: () => navigate("/login"),
        });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.status === "User Not Found"
      ) {
        toast.error("Email not found");
      } else {
        toast.error("Error sending forgot password email");
      }
    }
  };

  return (
    <div className="containerOne" style={{ margin: "9% auto" }}>
      <h3 className="headOne">FORGOT PASSWORD</h3>
      <Form
        style={{ backgroundColor: "#191c24" }}
        className="p-4 backg"
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-4" controlId="formGroupEmail">
          <Form.Label className="fw">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-dark text-white"
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button className="fw" variant="success" type="submit">
            SEND
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
  );
};

export default ForgotPassword;
