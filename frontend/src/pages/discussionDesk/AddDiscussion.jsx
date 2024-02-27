import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./addDiscussion.css";
import axios from "axios";
import { BaseURL } from "../../Utils/utils";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

export const AddDiscussion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state;
  const [editDataID, setEditDataID] = useState(null);
  const [data, setData] = useState({
    topic: "",
    detail: "",
    dueDate: "",
    talkWith: "Director",
    isItUrgent: "No",
  });
  const [errors, setErrors] = useState({
    topic: "",
    detail: "",
    dueDate: "",
    talkWith: "",
  });

  const { topic, detail, dueDate, talkWith, isItUrgent } = data;

  const handleUpdate = useCallback(() => {
    if (editData) {
      const { topic, detail, dueDate, talkWith, isItUrgent, _id } = editData;
      setEditDataID(_id);
      const date = moment(dueDate);
      const editDate = date.format("yyyy-MM-DDTHH:mm");
      setData({
        topic,
        detail,
        dueDate: editDate,
        talkWith,
        isItUrgent,
      });
    }
  },[editData]);

  useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? "Yes" : "No") : value,
    }));

    setErrors((prevData) => ({
      ...prevData,
      [name]: "",
    }));
  };

  const validationCheck = () => {
    let isValid = true;
    const newError = { errors };
    if (!topic.trim()) {
      isValid = false;
      newError.topic = "Topic is required";
    }
    if (!detail.trim()) {
      isValid = false;
      newError.detail = "detail is required";
    }
    if (!dueDate) {
      isValid = false;
      newError.dueDate = "dueDate is required";
    }
    setErrors(newError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    const userID = localStorage.getItem("userId");
    if (validationCheck()) {
      if (editDataID) {
        try {
          const newData = {
            ...data,
            user: userID,
          };
          await axios.put(`${BaseURL}/discussion_desk/${editDataID}`, newData, {
            headers: { Authorization: `bearer ${token}` },
          });
          toast.success("Discussion Updated", {
            position: "top-right",
            autoClose: 1500,
          });
          setTimeout(() => {
            navigate("/discussion_desk");
          }, 1500);
        } catch (error) {
          toast.error("Failed! please try again after some time", {
            position: "top-right",
            autoClose: 1500,
          });
        }
      } else {
        try {
          const newData = {
            ...data,
            user: userID,
          };
          await axios.post(`${BaseURL}/discussion_desk/${userID}`, newData, {
            headers: { Authorization: `bearer ${token}` },
          });
          toast.success("Discussion Added", {
            position: "top-right",
            autoClose: 1500,
          });
          setTimeout(() => {
            navigate("/discussion_desk");
          }, 1500);
        } catch (error) {
          toast.error("Failed! please try again after some time", {
            position: "top-right",
            autoClose: 1500,
          });
        }
      }
    }
  };

  return (
    <>
      <Layout newIndex="6">
        <div className="my-5 container bg">
          <h3 className="p-3 m-0 text-brand">
            {editDataID ? "Edit" : "New"} Discussion
          </h3>
          <div>
            <Form className="p-4">
              <Form.Group as={Row} className="mb-3">
                <Form.Label className="fw" column sm={2}>
                  Topic <span>*</span>
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    className="text-white border-secondary"
                    type="text"
                    name="topic"
                    value={topic}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-danger">{errors.topic}</Form.Text>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label className="fw" column sm={2}>
                  Detail <span>*</span>
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    className="text-white border-secondary"
                    type="text"
                    name="detail"
                    value={detail}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-danger">{errors.detail}</Form.Text>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label className="fw" column sm={2}>
                  Due date <span>*</span>
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="datetime-local"
                    name="dueDate"
                    className="bg-dark text-white"
                    value={dueDate}
                    onChange={handleChange}
                  ></Form.Control>
                  <Form.Text className="text-danger">
                    {errors.dueDate}
                  </Form.Text>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label className="fw" column sm={2}>
                  Talkwith <span>*</span>
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="select"
                    className="bg-dark text-white border-secondary"
                    name="talkWith"
                    defaultValue={talkWith}
                    onChange={handleChange}
                  >
                    <option value="Director">Director</option>
                    <option value="HR">HR</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3 d-flex align-items-center">
                <Form.Label className="fw" column sm={2}>
                  Is it urgent?
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    style={{ color: "#bdb9b9" }}
                    label="yes"
                    name="isItUrgent"
                    checked={isItUrgent === "No" ? false : true}
                    value={isItUrgent}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  className="px-5"
                  variant="outline-success"
                  onClick={handleSubmit}
                >
                  {editDataID ? "Update" : "Submit"}
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
