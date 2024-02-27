import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { BaseURL } from "../../Utils/utils";
import Layout from "../../components/Layout";
import "../index.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button, Col, Form, Row } from "react-bootstrap";
import { statusOption } from "../../Utils/constant";
import OptionsSelect from "../../components/selectOption/selectOption";
import ChangeStatus from "../ChangeStatus/ChangeStatus";
import { ToastContainer, toast } from "react-toastify";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { IoIosWarning } from "react-icons/io";
import moment from "moment";

const SendMyDailyStatus = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    Status: "",
    Hours: "",
    Note: "",
  });
  const [userStatus, setUserStatus] = useState([]);
  const [date, setDate] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [email, setEmail] = useState([]);
  const [projectUpdate, setProjectUpdate] = useState([]);
  const [editData, setEditData] = useState(false);
  const [editId, setEditId] = useState(null);
  const [addEmail, setAddEmail] = useState(false);
  const [tasks, setTasks] = useState([
    {
      projectStatus: "none",
      workingHour: "09:00",
      status: "",
      task: "",
    },
  ]);

  const [errors, setErrors] = useState({});
  const userId = localStorage.getItem("userId");
  const previosDate = moment().subtract(1, "days");

  const validationCheck = useCallback(() => {
    let isValid = true;
    const newErrors = { errors };

    if (!email.length > 0) {
      isValid = false;
      newErrors.email = "Email is required";
    }
    if (!date) {
      isValid = false;
      newErrors.date = "Date is required";
    }
    tasks.forEach((item, index) => {
      if (!item.workingHour || item.workingHour === "00:00") {
        newErrors[`workingHour${index}`] = "workingHour is required";
        isValid = false;
      }
      if (!item.status) {
        newErrors[`status${index}`] = "Task Status is required";
        isValid = false;
      }
      if (!item.task.trim()) {
        newErrors[`task${index}`] = "Task description is required";
        isValid = false;
      }
    });
    if (new Date(date).getTime() < new Date().setHours(0, 0, 0, 0)) {
      if (new Date(date) < new Date(previosDate).setHours(0, 0, 0, 0)) {
        newErrors.date = "Date can't be earlier than yesterday";
        isValid = false;
      }
    }
    if (new Date(date).getTime() > new Date()) {
      newErrors.date = "Date can't be in the future";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  }, [date, email, tasks, previosDate, errors]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleEmail = (selectedOptions) => {
    const usersEmail = selectedOptions.map((e) => e.value);
    setEmail(usersEmail);
    setAddEmail(!addEmail);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/auth/getEmail`);
        setEmailList(response.data.emails);
      } catch (error) {
        console.error("Error fetching email data:", error);
      }
    };

    getData();
  }, [navigate, addEmail]);

  const updateStatus = useCallback(() => {
    const { date, tasks, email } = location.state.item;
    const newDate = moment(date);
    const myDate = newDate.format("yyyy-MM-DD");
    setDate(myDate);
    setTasks([...tasks]);
    setEmail([...email]);
  }, [location.state]);

  useEffect(() => {
    if (location.state !== null) {
      setEditData(true);
      setEditId(location.state.item._id);
      updateStatus();
    }
  }, [location.state, updateStatus]);

  const handleUpdate = async (e, completed) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");

    if (validationCheck()) {
      try {
        const newUpdatedData = {
          email: email,
          date: date,
          tasks: tasks,
          completed,
        };
        await axios.put(`${BaseURL}/tasks/${editId}`, newUpdatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          "Content-Type": "application/json",
        });
        toast.success("New update added successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/daily_status_updates");
        }, 2000);
        setEditData(false);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setErrors({ ...errors, server: error.response.data.error });
        } else {
          setErrors({
            ...errors,
            server: "A task for this date already exists.",
          });
        }
        toast.error(errors.server, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };

  const createEmailObjects = (emailArray) =>
    emailArray.map((email) => ({ value: email, label: email }));

  const addMoreTask = () => {
    setTasks([
      ...tasks,
      { projectStatus: "", workingHour: "09:00", status: "", task: "" },
    ]);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    const projectUpdate = async () => {
      const getUserID = localStorage.getItem("userId");
      try {
        const response = await axios.get(`${BaseURL}/project/${getUserID}`);
        const projects = response.data.projects;
        const projectSelect = [
          "None",
          ...projects.map((option) => option.projectName),
        ];
        setProjectUpdate(projectSelect);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    projectUpdate();
  }, []);

  const handleStatusSubmit = async (e, completed) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");
    if (validationCheck()) {
      try {
        const newTask = {
          email: email,
          date: date,
          tasks: tasks,
          completed,
        };
        await axios.post(`${BaseURL}/tasks`, newTask, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          "Content-Type": "application/json",
        });
        toast.success("New update added successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/daily_status_updates");
        }, 2000);
      } catch (error) {
        toast.error("A task for this date already exists", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };

  const status = userStatus.map((item) => item.Status).toString();

  useEffect(() => {
    const fetchChangeStatus = async () => {
      try {
        const response = await axios.get(`${BaseURL}/changeStatus/${userId}`);
        setUserStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching change status");
      }
    };
    fetchChangeStatus();
  }, [data, userId]);

  const handleModalShow = () => {
    setShowModal(!showModal);
  };
  const handleClose = () => setShowModal(false);
  const { Status, Hours, Note } = data;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const statusid = userStatus?.map((item) => item._id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userStatus.length > 0) {
      try {
        await axios.put(`${BaseURL}/changeStatus/${statusid}`, {
          Status: Status,
          Hours: Hours,
          Note: Note,
          user: userId,
        });
        toast.success("Status Updated successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        handleClose();
        setData({ ...data, Status: "", Hours: "", Note: "" });
      } catch (error) {
        console.error("Error updating status", error);
      }
    } else {
      try {
        await axios.post(`${BaseURL}/changeStatus/${userId}`, {
          Status: Status,
          Hours: Hours,
          Note: Note,
          user: userId,
        });
        toast.success("Status Added successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        handleClose();
        setData({ ...data, Status: "", Hours: "", Note: "" });
      } catch (error) {
        console.error("Error changing status", error);
      }
    }
  };
  return (
    <>
      <Layout newIndex="1">
        <div className="mt-5 mx-auto container" style={{ maxWidth: 800 }}>
          <h2 className="heading bg">Send Daily Status Update</h2>
          <div className="new">
            <div className="d-flex justify-content-between border-bottom border-light p-3 text-info">
              <div role="button" onClick={() => handleModalShow()}>
                Do you want to change your availability?
              </div>
              <div className="d-flex">
                {status === "I am avialable for any new work"
                  ? "Available"
                  : status === "I am busy for assigned work"
                    ? "Busy"
                    : "Partial"}
                {status === "I am avialable for any new work" ? (
                  <FaPersonCircleCheck
                    color="green"
                    size={22}
                    className="ms-2"
                  />
                ) : status === "I am busy for assigned work" ? (
                  <IoIosWarning color="red" size={22} className="ms-2" />
                ) : (
                  <CiClock2 color="yellow" size={22} className="ms-2" />
                )}
              </div>
            </div>
            <Form className="">
              <Row className="mb-5">
                <Form.Text className="text-danger">{errors.server}</Form.Text>
                <Form.Group as={Col} md="4" className="mt-3">
                  <Form.Label className="fw">To</Form.Label>
                  <Select
                    label="select"
                    isMulti
                    options={createEmailObjects(emailList)}
                    isSearchable
                    isClearable={false}
                    noOptionsMessage={() => "email not found"}
                    onChange={handleEmail}
                    styles={{
                      control: (prevStyle) => ({
                        ...prevStyle,
                        backgroundColor: "#000",
                        borderColor: "#000",
                      }),
                      menu: (prevStyle) => ({
                        ...prevStyle,
                        backgroundColor: "#212529",
                      }),
                      option: (prevStyle) => ({
                        ...prevStyle,
                        backgroundColor: "#212529",
                        color: "#bdb9b9",
                      }),
                    }}
                  />
                  <Form.Text className="text-danger">{errors.email}</Form.Text>
                </Form.Group>

                <Form.Group as={Col} md="4" className="mt-3">
                  <Form.Label className="fw">CC</Form.Label>
                  <Form.Control
                    value="status@bestpeers.com"
                    disabled
                    className="bg-dark text-white border-dark"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" className="mt-3">
                  <Form.Label className="fw">Status Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    className="bg-dark text-white"
                    style={{ colorScheme: "dark" }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  ></Form.Control>
                  <Form.Text className="text-danger">{errors.date}</Form.Text>
                </Form.Group>
              </Row>

              <div>
                <div className="borders">
                  <div>
                    <h6>+ ADD YOUR TASK DETAILS</h6>
                  </div>
                  <div>
                    {tasks.map((task, index) => (
                      <div key={index} className="border-color">
                        <Row className="mb-3">
                          <Form.Group as={Col} md="4" className="mt-3">
                            <Form.Label>Project</Form.Label>
                            <Form.Select
                              value={task.projectStatus}
                              onChange={(e) =>
                                setTasks((prevTasks) =>
                                  prevTasks.map((prevTask, i) =>
                                    i === index
                                      ? {
                                          ...prevTask,
                                          projectStatus: e.target.value,
                                        }
                                      : prevTask,
                                  ),
                                )
                              }
                            >
                              <OptionsSelect
                                options={projectUpdate}
                                defaultOption="Select Status"
                              />
                            </Form.Select>
                          </Form.Group>

                          <Form.Group as={Col} md="4" className="mt-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                              id="select_option"
                              name="task"
                              value={task.status}
                              onChange={(e) =>
                                setTasks((prevTasks) =>
                                  prevTasks.map((prevTask, i) =>
                                    i === index
                                      ? { ...prevTask, status: e.target.value }
                                      : prevTask,
                                  ),
                                )
                              }
                            >
                              <OptionsSelect
                                options={statusOption}
                                defaultOption="Select Status"
                              />
                            </Form.Select>

                            <Form.Text className="text-danger">
                              {errors[`status${index}`]}
                            </Form.Text>
                          </Form.Group>

                          <Form.Group as={Col} md="4" className="mt-3">
                            <Form.Label>Working Hours</Form.Label>
                            <Form.Control
                              type="time"
                              value={task.workingHour}
                              style={{ colorScheme: "dark" }}
                              onChange={(e) =>
                                setTasks((prevTasks) =>
                                  prevTasks.map((prevTask, i) =>
                                    i === index
                                      ? {
                                          ...prevTask,
                                          workingHour: e.target.value,
                                        }
                                      : prevTask,
                                  ),
                                )
                              }
                            />
                            <Form.Text className="text-danger">
                              {errors[`workingHour${index}`]}
                            </Form.Text>
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group className="mb-3" as={Col} md="11">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={task.task}
                              onChange={(e) =>
                                setTasks((prevTasks) =>
                                  prevTasks.map((prevTask, i) =>
                                    i === index
                                      ? { ...prevTask, task: e.target.value }
                                      : prevTask,
                                  ),
                                )
                              }
                            />
                            <Form.Text className="text-danger">
                              {errors[`task${index}`]}
                            </Form.Text>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            className="d-flex justify-content-center"
                          >
                            <RiDeleteBin6Line
                              role="button"
                              color="red"
                              onClick={deleteTask}
                            />
                          </Form.Group>
                        </Row>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline-primary" onClick={addMoreTask}>
                    + ADD MORE TASK
                  </Button>
                </div>
                {!editData ? (
                  <div className="d-flex mt-4 justify-content-center">
                    <Button
                      variant="outline-warning"
                      onClick={(e) => handleStatusSubmit(e, false)}
                    >
                      SAVE TO DRAFT
                    </Button>
                    <Button
                      variant="outline-success"
                      className="px-5 ms-4"
                      onClick={(e) => handleStatusSubmit(e, true)}
                    >
                      SEND
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex mt-4 justify-content-center">
                    <Button
                      variant="outline-success"
                      onClick={(e) => handleUpdate(e, true)}
                    >
                      Update
                    </Button>
                    <Button
                      className="px-4 ms-4"
                      variant="outline-info"
                      onClick={() => navigate("/daily_status_updates")}
                    >
                      Back
                    </Button>
                  </div>
                )}
              </div>
            </Form>
          </div>
        </div>
        {showModal ? (
          <ChangeStatus
            showModal={showModal}
            setShowModal={setShowModal}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            data={data}
          />
        ) : null}
      </Layout>
      <ToastContainer />
    </>
  );
};

export default SendMyDailyStatus;
