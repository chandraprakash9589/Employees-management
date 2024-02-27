import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { BaseURL } from "../../Utils/utils";
import { useNavigate } from "react-router-dom";
import { totalMonths } from "../../Utils/constant";
import { leaveType } from "../../Utils/constant";
import "../index.css";

export const MyLeave = () => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const getUserID = localStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [monthlyLeave, setmonthlyLeave] = useState(0);
  const [compoff, setCompOff] = useState(0);
  const navigate = useNavigate();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const index = totalMonths.indexOf(currentMonth);
  const months = totalMonths.slice(0, index + 1);

  useEffect(() => {
    getLeaves();
    const leaves = data.filter(
      (val) =>
        new Date(val.fromDate).toLocaleString("default", { month: "long" }) ===
          currentMonth &&
        val.leaveType !== "Comp Off" &&
        val.status === "Approved",
    );
    if (leaves.length !== 0) {
      const l = leaves.map((val) => val.days);
      const res = l.reduce((val, res) => res + val);
      setmonthlyLeave(res);
    }
    const compoffData = data.filter(
      (val) =>
        new Date(val.fromDate).toLocaleString("default", { month: "long" }) ===
          currentMonth &&
        val.leaveType === "Comp Off" &&
        val.status === "Approved",
    );
    if (compoffData.length !== 0) {
      const l = compoffData.map((val) => val.days);
      const res = l.reduce((val, res) => res + val);
      setCompOff(res);
    }
  }, [data.length]);

  const getLeaves = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BaseURL}/leaveSection/${getUserID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const leaveData = response.data.leaveInfo;
      setData(leaveData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BaseURL}/leaveSection/${id}`);
      getLeaves();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Layout newIndex="3">
        <div className="container">
          <DropdownButton
            variant="outline-info"
            title="Apply Leaves"
            className="my-4 d-flex justify-content-end"
            menuVariant="dark"
          >
            {leaveType.map((type) => {
              return (
                <Dropdown.Item
                  key={type}
                  onClick={() => navigate("new", { state: type })}
                >
                  {type}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
          <div className="bg p-3 d-flex justify-content-between mb-3">
            <h3 className="m-0 text-brand">Leave Balance</h3>
            <h3 className="m-0 me-4 pe-5 text-brand">-{monthlyLeave}</h3>
          </div>
          <div className="mb-3">
            <h3 className="px-3 py-2 m-0 text-brand bg">Allotted Balance</h3>
            <div className="p-3 bg m-0">
              <Table className="table-layout" hover>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Credit</th>
                    <th>Leave</th>
                    <th>Loss</th>
                    <th>Penalty</th>
                    <th>Compoff</th>
                  </tr>
                </thead>
                <tbody>
                  {months &&
                    months.map((val, index) => (
                      <tr key={index}>
                        <td>{val}</td>
                        <td>0.0</td>
                        <td>
                          {val === currentMonth && monthlyLeave !== 0
                            ? monthlyLeave
                            : "0"}
                        </td>
                        <td>0</td>
                        <td>0</td>
                        <td>
                          {val === currentMonth && compoff !== 0
                            ? compoff
                            : "0"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="bg-dark">
            <h3 className="px-3 py-2 m-0 bg text-brand">
              All Leaves of {firstName} {lastName}
            </h3>
            <div className="p-3 m-0 bg">
              <Table className="table-layout" hover>
                <thead>
                  <tr>
                    <th>Applied By</th>
                    <th>Leave (Days)</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Leave Type</th>
                    <th>Reason</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>

                  {data &&
                    data.map((val) => {
                      const status = val.status;
                      return (
                        <tr key={val._id}>
                          <td>
                            {val.firstName} {val.lastName}
                          </td>
                          <td>{val.days} Days</td>
                          <td>
                            {new Date(val.fromDate).toLocaleDateString()}
                            <div className="from-session session">
                              {val.fromSession}
                            </div>
                          </td>
                          <td>
                            {new Date(val.ToDate).toLocaleDateString()}
                            <div className="to-session session">
                              {val.toSession}
                            </div>
                          </td>
                          <td>{val.leaveType}</td>
                          <td>{val.reason}</td>
                          <td>
                            {status === "Pending" ? (
                              <Button
                                variant="outline-warning"
                                className="px-3"
                                onClick={() => handleDelete(val._id)}
                              >
                                Cancel
                              </Button>
                            ) : (
                              <Button
                                variant={
                                  status === "Approved" ? "success" : "danger"
                                }
                              >
                                {status}
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
