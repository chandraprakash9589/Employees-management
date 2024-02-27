import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./allleaves.css";
import axios from "axios";
import { BaseURL } from "../../../Utils/utils";
import { ToastContainer, toast } from "react-toastify";
import { RiSearchLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { Form } from "react-bootstrap";

export const AllLeaves = () => {
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [approvedLeaves, setApprovedLeaves] = useState([]);
  const [cancelledLeaves, setCancelledLeaves] = useState([]);
  const [searchindex, setSearchIndex] = useState(null);
  const [pendingLeave, setPendingLeave] = useState("");
  const [approvedLeave, setApprovedLeave] = useState("");
  const [cancelledLeave, setCancelledLeave] = useState("");

  const fetchLeaves = async () => {
    try {
      const res = await axios.get(`${BaseURL}/leaveSection`);
      const { leaveRequests } = res.data;
      const pending = leaveRequests.filter((item) => item.status === "Pending");
      const approved = leaveRequests.filter(
        (item) => item.status === "Approved",
      );
      const cancelled = leaveRequests.filter(
        (item) => item.status === "Cancelled",
      );

      setPendingLeaves(pending);
      setApprovedLeaves(approved);
      setCancelledLeaves(cancelled);
    } catch (error) {
      toast.error("Something went wrong! Please login again", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`${BaseURL}/leaveSection/approve/${id}`, {
        status: "Approved",
      });
      fetchLeaves();
      toast.success("Leave approved successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Something went wrong! Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.put(`${BaseURL}/leaveSection/cancel/${id}`, {
        status: "Cancelled",
      });
      fetchLeaves();
      toast.success("Leave cancelled successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Something went wrong! Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Layout newIndex="6">
        <div className="container mb-4">
          <div className="my-4 bg p-2 d-flex justify-content-between align-items-center">
            <h3 className="m-0 text-brand">Pending Leaves</h3>
            <div>
              {searchindex === 1 ? (
                <div className="d-flex align-items-center me-2">
                  <Form.Control
                    type="text"
                    className="search-control"
                    placeholder="search here"
                    value={pendingLeave}
                    onChange={(e) => setPendingLeave(e.target.value)}
                  />
                  <IoClose
                    size={20}
                    role="button"
                    color="red"
                    onClick={() => setSearchIndex(null)}
                  />
                </div>
              ) : (
                <RiSearchLine
                  size={22}
                  role="button"
                  className="search-icon"
                  onClick={() => setSearchIndex(1)}
                />
              )}
            </div>
          </div>
          <div className="box-container">
            {pendingLeaves
              .filter((item) => {
                const fullName = `${item.firstName} ${item.lastName}`;
                return pendingLeave.toLowerCase() === ""
                  ? item
                  : fullName.toLowerCase().includes(pendingLeave) ||
                      item.leaveType.toLowerCase().includes(pendingLeave);
              })
              .map((item, index) => {
                const newFromDate = new Date(item.fromDate);
                const fromDate = newFromDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                const newToDate = new Date(item.ToDate);
                const toDate = newToDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                return (
                  <Card
                    className={pendingLeaves.length > 3 ? "box mx-auto" : "box"}
                    style={{ width: "18rem" }}
                    key={index}
                  >
                    <Card.Title variant="top">
                      {item.firstName} {item.lastName}
                    </Card.Title>
                    <Card.Body>
                      <Card.Text>
                        {item.leaveType}: {item.days} Days
                      </Card.Text>
                      <Card.Text>
                        {fromDate} ({item.fromSession})
                      </Card.Text>
                      <Card.Text>to</Card.Text>
                      <Card.Text>
                        {toDate} ({item.toSession})
                      </Card.Text>
                      <Card.Text>Reason: {item.reason}</Card.Text>
                      <Button
                        variant="success"
                        className="btnApp"
                        onClick={() => handleApprove(item._id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        className="btnDny"
                        onClick={() => handleCancel(item._id)}
                      >
                        Cancel
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
          </div>
          <div className="my-4 bg p-2 d-flex justify-content-between align-items-center">
            <h3 className="m-0 text-success">Approved Leaves</h3>
            <div>
              {searchindex === 2 ? (
                <div className="d-flex align-items-center me-2">
                  <Form.Control
                    type="text"
                    className="h-50 w-100 search-control"
                    placeholder="search here"
                    value={approvedLeave}
                    onChange={(e) => setApprovedLeave(e.target.value)}
                  />
                  <IoClose
                    size={20}
                    role="button"
                    color="red"
                    onClick={() => setSearchIndex(null)}
                  />
                </div>
              ) : (
                <RiSearchLine
                  size={22}
                  role="button"
                  className="search-icon"
                  onClick={() => setSearchIndex(2)}
                />
              )}
            </div>
          </div>
          <div className="box-container">
            {approvedLeaves
              .filter((item) => {
                const fullName = `${item.firstName} ${item.lastName}`;
                return approvedLeave.toLowerCase() === ""
                  ? item
                  : fullName.toLowerCase().includes(approvedLeave) ||
                      item.leaveType.toLowerCase().includes(approvedLeave);
              })
              .map((item, index) => {
                const newFromDate = new Date(item.fromDate);
                const fromDate = newFromDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                const newToDate = new Date(item.ToDate);
                const toDate = newToDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                return (
                  <Card className="box" style={{ width: "18rem" }} key={index}>
                    <Card.Title variant="top">
                      {item.firstName} {item.lastName}
                    </Card.Title>
                    <Card.Body>
                      <Card.Text>
                        {item.leaveType}: {item.days} Days
                      </Card.Text>
                      <Card.Text>
                        {fromDate} ({item.fromSession})
                      </Card.Text>
                      <Card.Text>to</Card.Text>
                      <Card.Text>
                        {toDate} ({item.toSession})
                      </Card.Text>
                      <Card.Text>Reason: {item.reason}</Card.Text>
                      <Button className="btnApp px-5" variant="success">
                        Approved
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
          </div>
          <div className="my-4 bg p-2 d-flex justify-content-between align-items-center">
            <h3 className="m-0 text-danger">Cancelled Leaves</h3>
            <div>
              {searchindex === 3 ? (
                <div className="d-flex align-items-center me-2">
                  <Form.Control
                    type="text"
                    className="h-50 w-100 search-control"
                    placeholder="search here"
                    value={cancelledLeave}
                    onChange={(e) => setCancelledLeave(e.target.value)}
                  />{" "}
                  <IoClose
                    size={20}
                    role="button"
                    color="red"
                    onClick={() => setSearchIndex(null)}
                  />
                </div>
              ) : (
                <RiSearchLine
                  size={22}
                  className="search-icon"
                  role="button"
                  onClick={() => setSearchIndex(3)}
                />
              )}
            </div>
          </div>
          <div className="box-container">
            {cancelledLeaves
              .filter((item) => {
                const fullName = `${item.firstName} ${item.lastName}`;
                return cancelledLeave.toLowerCase() === ""
                  ? item
                  : fullName.toLowerCase().includes(cancelledLeave) ||
                      item.leaveType.toLowerCase().includes(cancelledLeave);
              })
              .map((item, index) => {
                const newFromDate = new Date(item.fromDate);
                const fromDate = newFromDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                const newToDate = new Date(item.ToDate);
                const toDate = newToDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                return (
                  <Card className="box" style={{ width: "18rem" }} key={index}>
                    <Card.Title variant="top">
                      {item.firstName} {item.lastName}
                    </Card.Title>
                    <Card.Body>
                      <Card.Text>
                        {item.leaveType}: {item.days} Days
                      </Card.Text>
                      <Card.Text>
                        {fromDate} ({item.fromSession})
                      </Card.Text>
                      <Card.Text>to</Card.Text>
                      <Card.Text>
                        {toDate} ({item.toSession})
                      </Card.Text>
                      <Card.Text>Reason: {item.reason}</Card.Text>
                      <Button className="btnDny px-5" variant="danger">
                        Cancelled
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
          </div>
        </div>
      </Layout>
      <ToastContainer />
    </>
  );
};
