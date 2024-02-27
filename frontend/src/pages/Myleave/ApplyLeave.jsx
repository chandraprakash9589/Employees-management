import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Button, Form } from "react-bootstrap";
import Select from "react-dropdown-select";
import { emails } from "../../Utils/constant";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../../Utils/utils";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
export const ApplyLeave = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const leaveType = location.state;
  const [mailTo, setMailTo] = useState([]);
  const [data, setData] = useState({
    fromDate: "",
    fromSession: "session-1",
    toDate: "",
    toSession: "session-2",
    days: "",
    reason: "",
  });
  const [errors, setErrors] = useState({
    fromDate: "",
    toDate: "",
    mailTo: "",
    reason: "",
  });
  useEffect(() => {
    let day;
    const { fromDate, toDate, fromSession, toSession } = data;
    if (fromDate && toDate) {
      const fromDay = moment(fromDate).format("MM/DD/YYYY");
      const toDay = moment(toDate).format("MM/DD/YYYY");
      const timeDiff = new Date(toDay).getTime() - new Date(fromDay).getTime();
      day = parseInt(timeDiff / (1000 * 60 * 60 * 24)) + 1;
      setData({ ...data, days: day });
    }
    if (fromSession === "session-2") {
      day = day - 0.5;
      setData({ ...data, days: day });
    }
    if (toSession === "session-1") {
      day = day - 0.5;
      setData({ ...data, days: day });
    }
    if (new Date(toDate).getTime() < new Date(fromDate).getTime()) {
      setData({ ...data, days: 0 });
    }
  }, [data]);
  
  const { fromDate, toDate, fromSession, toSession, reason, days } = data;
  const validationCheck = () => {
    let isValid = true;
    let todayDate = new Date().setHours(0, 0, 0, 0);
    const newErrors = { errors };

    if (!fromDate.trim()) {
      isValid = false;
      newErrors.fromDate = "Please select Date";
    }
    if (new Date(fromDate).getTime() < todayDate) {
      newErrors.fromDate = "Date can't be earlier than today";
      isValid = false;
    }
    if (new Date(toDate).getTime() < new Date(fromDate).getTime()) {
      newErrors.toDate = "Date can't be earlier From Date";
      isValid = false;
    }
    if (!toDate.trim()) {
      isValid = false;
      newErrors.toDate = "Please select Date";
    }
    if (new Date(toDate).getTime() < todayDate) {
      newErrors.toDate = "Date can't be earlier than today";
      isValid = false;
    }
    if (!reason.trim()) {
      isValid = false;
      newErrors.reason = "Please write reason of leave";
    }
    if (mailTo.length < 1) {
      isValid = false;
      newErrors.mailTo = "Please select atleast one Mail id";
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevData) => ({
      ...prevData,
      [name]: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");

    if (validationCheck()) {
      const getUserID = localStorage.getItem("userId");
      const mail = mailTo.map((val) => val.label);
      const leaveData = {
        email: mail,
        leaveType: leaveType,
        fromDate: fromDate,
        ToDate: toDate,
        fromSession: fromSession,
        toSession: toSession,
        days: days,
        reason: reason,
        user: getUserID,
      };
      try {
        await axios.post(`${BaseURL}/leaveSection/${getUserID}`, leaveData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          "Content-Type": "application/json",
        });
        toast.success("Your leave applied successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/my_leave");
        }, 2000);
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <Layout newIndex="3">
      <div className="containerOne">
        <h3 className="bg heading">Apply {leaveType}</h3>
        <Form className="newform">
          <Form.Group className="mb-3">
            <Form.Label className="fw">From date</Form.Label>
            <Form.Control
              type="date"
              style={{ colorScheme: "dark" }}
              name="fromDate"
              value={fromDate}
              onChange={(e) => handleChange(e)}
              className="text-white border-secondary"
            />
            <Form.Text className="text-danger">{errors.fromDate}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw">From session</Form.Label>
            <Form.Control
              as="select"
              className="bg-dark text-white border-secondary"
              name="fromSession"
              value={fromSession}
              onChange={(e) => handleChange(e)}
            >
              <option value="session-1">Session 1</option>
              <option value="session-2">Session 2</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw">To date</Form.Label>
            <Form.Control
              type="date"
              name="toDate"
              style={{ colorScheme: "dark" }}
              value={toDate}
              onChange={(e) => handleChange(e)}
              className="text-white bg-dark border-secondary"
            />
            <Form.Text className="text-danger">{errors.toDate}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw">To session</Form.Label>
            <Form.Control
              as="select"
              className="bg-dark text-white border-secondary"
              defaultValue={"session-2"}
              name="toSession"
              onChange={(e) => handleChange(e)}
            >
              <option value="session-1">Session 1</option>
              <option value="session-2">Session 2</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw">Day</Form.Label>
            <Form.Control
              disabled
              name="days"
              value={days}
              className="text-white bg-dark border-secondary"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw">Mail to</Form.Label>
            <Select
              multi
              searchable
              placeholder=""
              color="#414141"
              style={{ colorScheme: "dark" }}
              className="text-secondary bg-dark border-secondary"
              options={emails}
              onChange={(val) => setMailTo(val)}
            />
            <Form.Text className="text-danger">{errors.mailTo}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="fw">Reason</Form.Label>
            <Form.Control
              name="reason"
              value={reason}
              onChange={(e) => handleChange(e)}
              as="textarea"
              placeholder="Leave a reason here"
              className="text-white bg-dark border-secondary"
            />
            <Form.Text className="text-danger">{errors.reason}</Form.Text>
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button
              className="fw"
              style={{ width: "120px" }}
              variant="outline-success"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              APPLY
            </Button>{" "}
            <Button
              className="fw"
              style={{ width: "120px" }}
              variant="outline-danger"
              onClick={() => navigate("/my_leave")}
            >
              BACK
            </Button>
          </div>
        </Form>
      </div>
      <ToastContainer />
    </Layout>
  );
};
