import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { BaseURL } from "../../Utils/utils";
import { MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

export const DiscussionDesk = () => {
  const [data, setData] = useState([]);
  const getUserID = localStorage.getItem("userId");
  const navigate = useNavigate();
  
  useEffect(() => {
    getDiscussionData();
  }, []);

  const getDiscussionData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BaseURL}/discussion_desk/${getUserID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data.discussionDesk);
    } catch (error) {
      console.error("Error fetching discussion data:", error);
      toast.error("Failed to fetch discussion data", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  
  const handleNavigate = () => {
    navigate("new");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this discussion?")) {
    try {
      await axios.delete(`${BaseURL}/discussion_desk/${id}`);
      getDiscussionData();
      toast.success("Discussion Deleted", {
        position: "top-right",
        autoClose: 1500,
      });
    } catch (error) {
      console.error("Error deleting discussion:", error);
        toast.error("Failed to delete discussion", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const handleEdit = (val) => {
    navigate(`${val._id}`, { state: val });
  };

  return (
    <>
      <Layout newIndex="6">
        <div className="container mt-4 p-4">
          <div className="justify-content-end d-flex ">
            <Button onClick={handleNavigate} variant="outline-info">
              New Discussion
            </Button>
          </div>
          <div className="my-4 p-2 bg">
            <h3 className="px-2 py-3 m-0 text-brand">Discussion Desk</h3>
            <div>
              <Table className="table-layout" striped hover>
                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>Detail</th>
                    <th>DueDate</th>
                    <th>TalkWith</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item) => {
                      const date = new Date(item.dueDate);
                      const dueDate = date.toLocaleString();
                      return (
                        <tr key={item._id}>
                          <td>{item.topic}</td>
                          <td>{item.detail}</td>
                          <td>{dueDate}</td>
                          <td>{item.talkWith}</td>
                          <td>{item.status}</td>
                          <td></td>
                          <td>
                            <MdEdit
                              className="icon"
                              role="button"
                              onClick={() => handleEdit(item)}
                              color="blue"
                            />{" "}
                            <RiDeleteBin6Line
                              role="button"
                              color="red"
                              className="mx-2 icon"
                              onClick={() => handleDelete(item._id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
};
