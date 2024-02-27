import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { BaseURL } from "../../../Utils/utils";
import { Table, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import Input from "../../TestCalls/Input";
import SelectInput from "../../TestCalls/SelectInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import OptionsSelect from "../../../components/selectOption/selectOption";
import {
  developerProfile,
  selectMode,
  selectPriority,
  selectStatus,
  selectTech,
} from "../../../Utils/constant";
import { CiSearch } from "react-icons/ci";
import "./testcalls.css";

const TestsCalls = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/auth/getUser`);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Layout newIndex="6">
        <DropdownButton
          variant="outline-info"
          title="Tests/Calls"
          className="my-4 d-flex container justify-content-end"
          menuVariant="dark"
        >
          <Dropdown.Item onClick={() => navigate("/viewtests")}>
            Tests
          </Dropdown.Item>
          <Dropdown.Item onClick={() => navigate("/viewcalls")}>
            Calls
          </Dropdown.Item>
        </DropdownButton>
        <div className="mt-4 container bg p-3">
          <h3 className="text-brand">Assign Tests and Calls</h3>
          <div style={{ fontSize: "1rem" }}>
            <CiSearch size={20} className="iconStyle" />
            <input
              className="testinput"
              type="text"
              placeholder="Search Employee"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="my-3">
            <Table striped hover>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users
                    .filter((item) => {
                      const fullName = `${item.firstName} ${item.lastName}`;
                      return search.toLowerCase() === ""
                        ? item
                        : fullName.toLowerCase().includes(search);
                    })
                    .map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.firstName} {item.lastName}
                        </td>
                        <td>
                          <Button
                            variant="outline-warning me-3"
                            onClick={() => {
                              navigate("/testsform", {
                                state: {
                                  id: item._id,
                                  firstName: item.firstName,
                                  lastName: item.lastName,
                                  users: users,
                                },
                              });
                            }}
                          >
                            Tests
                          </Button>
                          <Button
                            variant="outline-success"
                            onClick={() => {
                              navigate("/callsform", {
                                state: {
                                  id: item._id,
                                  firstName: item.firstName,
                                  lastName: item.lastName,
                                  users: users,
                                },
                              });
                            }}
                          >
                            Calls
                          </Button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TestsCalls;

export const TestForm = () => {
  const location = useLocation();
  const { users, id } = location.state;
  const validationSchema = Yup.object({
    clientName: Yup.string().required(),
    developerProfile: Yup.string().required(),
    assignedTo: Yup.string().required(),
    round: Yup.number().positive().integer().required(),
    status: Yup.string().required(),
    mode: Yup.string().required(),
    deadlineTo: Yup.date().required(),
    deadlineFrom: Yup.date().required(),
    technology: Yup.string().required(),
    priority: Yup.string().oneOf(["High", "Medium", "Low"]).required(),
  });

  const onSubmit = async (values, actions) => {
    const {
      clientName,
      developerProfile,
      assignedTo,
      round,
      status,
      mode,
      deadlineTo,
      deadlineFrom,
      technology,
      priority,
    } = values;
    try {
      await axios.post(`${BaseURL}/tests/${id}`, {
        clientName: clientName,
        developerProfile: developerProfile,
        assignedTo: assignedTo,
        round: round,
        status: status,
        mode: mode,
        deadlineTo: deadlineTo,
        deadlineFrom: deadlineFrom,
        technology: technology,
        priority: priority,
        user: id,
      });

      toast.success("Test task added successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error("Error assigning test task");
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const handleReset = (values) => {
    values = {};
  };

  const empolyeeName = [];
  users.map((item) => {
    const fullName = `${item.firstName} ${item.lastName}`;
    return empolyeeName.push(fullName);
  });
  return (
    <>
      <Layout newIndex="6">
        <div className="container bg my-5" style={{ width: "540px" }}>
          <div className="py-3">
            <h4 className="text-brand">Assign Test Task</h4>
          </div>
          <div className="m-1">
            <Formik
              initialValues={{
                clientName: "",
                developerProfile: "",
                assignedTo: "",
                round: "",
                status: "",
                mode: "",
                deadlineTo: "",
                deadlineFrom: "",
                technology: "",
                priority: "",
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              onReset={handleReset}
            >
              <Form>
                <Input
                  label="By Client name"
                  type="text"
                  id="name"
                  name="clientName"
                />
                <SelectInput
                  label="By developer profile"
                  type="text"
                  name="developerProfile"
                  id="DeveloperProfile"
                >
                  <OptionsSelect
                    options={developerProfile}
                    defaultOption={"Select developer profile"}
                  />
                </SelectInput>
                <SelectInput
                  label="Assigned to"
                  type="text"
                  name="assignedTo"
                  id="assigned"
                >
                  <OptionsSelect
                    options={empolyeeName}
                    defaultOption={"Select assigned to"}
                  />
                </SelectInput>
                <Input
                  label="Round Contains"
                  min={1}
                  max={10}
                  type="number"
                  id="round"
                  name="round"
                />
                <SelectInput
                  label="Status"
                  type="text"
                  name="status"
                  id="status"
                >
                  <OptionsSelect
                    options={selectStatus}
                    defaultOption={"Select Status"}
                  />
                </SelectInput>
                <SelectInput label="Mode" id="mode" name="mode">
                  <OptionsSelect
                    options={selectMode}
                    defaultOption={"Select Mode"}
                  />
                </SelectInput>
                <Input
                  label="Deadline from"
                  type="date"
                  id="timeFrom"
                  name="deadlineFrom"
                />
                <Input
                  label="Deadline to"
                  type="date"
                  id="timeTo"
                  name="deadlineTo"
                />
                <SelectInput label="Priority" id="priority" name="priority">
                  <OptionsSelect
                    options={selectPriority}
                    defaultOption={"Select Priority"}
                  />
                </SelectInput>
                <SelectInput
                  label="Primary technology"
                  id="technology"
                  name="technology"
                >
                  <OptionsSelect
                    options={selectTech}
                    defaultOption={"Select Technology"}
                  />
                </SelectInput>
                <Button
                  type="submit"
                  className="me-3 mb-3"
                  variant="outline-success"
                >
                  Submit
                </Button>

                <Button type="reset" className="mb-3" variant="outline-danger">
                  Clear Search
                </Button>
              </Form>
            </Formik>
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
};

export const CallsForm = () => {
  const location = useLocation();
  const { users, id } = location.state;
  const validationSchema = Yup.object({
    clientName: Yup.string().required(),
    developerProfile: Yup.string().required(),
    assignedTo: Yup.string().required(),
    round: Yup.number().positive().integer().required(),
    status: Yup.string().required(),
    technology: Yup.string().required(),
    scheduledTo: Yup.date().required(),
    scheduledFrom: Yup.date().required(),
    priority: Yup.string().required(),
  });

  const onSubmit = async (values, actions) => {
    const {
      clientName,
      developerProfile,
      assignedTo,
      round,
      status,
      scheduledTo,
      scheduledFrom,
      technology,
      priority,
    } = values;
    try {
      await axios.post(`${BaseURL}/calls/${id}`, {
        clientName: clientName,
        developerProfile: developerProfile,
        assignedTo: assignedTo,
        round: round,
        status: status,
        scheduledTo: scheduledTo,
        scheduledFrom: scheduledFrom,
        technology: technology,
        priority: priority,
        user: id,
      });

      toast.success("Call added successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error("Error assigning calls");
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const handleReset = (values) => {
    values = {};
  };

  const empolyeeName = [];
  users.map((item) => {
    const fullName = `${item.firstName} ${item.lastName}`;
    return empolyeeName.push(fullName);
  });

  return (
    <>
      <Layout newIndex="6">
        <div className="container bg my-5" style={{ width: "540px" }}>
          <div className="py-3">
            <h4 className="text-brand">Assign Call</h4>
          </div>
          <div className="m-1">
            <Formik
              initialValues={{
                clientName: "",
                developerProfile: "",
                assignedTo: "",
                round: "",
                status: "",
                technology: "",
                scheduledTo: "",
                scheduledFrom: "",
                priority: "",
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              onReset={handleReset}
            >
              <Form>
                <Input
                  label="By Client name"
                  type="text"
                  id="name"
                  name="clientName"
                />
                <SelectInput
                  label="By developer profile"
                  type="text"
                  name="developerProfile"
                  id="DeveloperProfile"
                >
                  <OptionsSelect
                    options={developerProfile}
                    defaultOption={"Select developer profile"}
                  />
                </SelectInput>
                <SelectInput
                  label="Assigned to"
                  type="text"
                  name="assignedTo"
                  id="assigned"
                >
                  <OptionsSelect
                    options={empolyeeName}
                    defaultOption={"Select assigned to"}
                  />
                </SelectInput>
                <Input
                  label="Round Contains"
                  min={1}
                  max={10}
                  type="number"
                  id="round"
                  name="round"
                />
                <SelectInput
                  label="Status"
                  type="text"
                  name="status"
                  id="status"
                >
                  <OptionsSelect
                    options={selectStatus}
                    defaultOption={"Select Status"}
                  />
                </SelectInput>
                <Input
                  label="Scheduled at from"
                  type="date"
                  id="scheduledFrom"
                  name="scheduledFrom"
                />
                <Input
                  label="Scheduled at to"
                  type="date"
                  id="scheduledTo"
                  name="scheduledTo"
                />
                <SelectInput label="Priority" id="priority" name="priority">
                  <OptionsSelect
                    options={selectPriority}
                    defaultOption={"Select Priority"}
                  />
                </SelectInput>
                <SelectInput
                  label="Primary technology"
                  id="technology"
                  name="technology"
                >
                  <OptionsSelect
                    options={selectTech}
                    defaultOption={"Select Technology"}
                  />
                </SelectInput>
                <Button
                  type="submit"
                  className="me-3 mb-3"
                  variant="outline-success"
                >
                  Submit
                </Button>

                <Button type="reset" className="mb-3" variant="outline-danger">
                  Clear Search
                </Button>
              </Form>
            </Formik>
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
};
