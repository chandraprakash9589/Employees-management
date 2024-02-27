import React, { useState, useEffect } from "react";
import { Table, Form, InputGroup } from "react-bootstrap";
import style from "./InterviewCalls.module.css";
import Layout from "../../components/Layout";
import axios from "axios";
import { BaseURL } from "../../Utils/utils";
import { CiSearch } from "react-icons/ci";

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [search, setSearch] = useState("");

  const id = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await axios.get(`${BaseURL}/tests/${id}`);
        setTests(response.data.tests);
      } catch (error) {
        console.error("Error fetching employees test tasks");
      }
    };
    fetchCalls();
  }, [id]);

  return (
    <>
      <Layout newIndex="6">
        <div className="container my-5 bg">
          <h4 className={style.createheading}>Test Tasks</h4>
          <div>
            <CiSearch size={20} className="iconStyle" />
            <Form>
              <InputGroup className="my-3" style={{ width: "55%" }}>
                <Form.Control
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Tests by client's name, profile and priority"
                  style={{ paddingLeft: 25 }}
                  value={search}
                />
              </InputGroup>
            </Form>
          </div>
          <div className="p-2">
            <Table striped hover className="bg">
              <thead>
                <tr style={{ color: "#ccc" }}>
                  <th>Client's Name</th>
                  <th>Profile</th>
                  <th>Status</th>
                  <th>round</th>
                  <th>deadlineTo</th>
                  <th>deadlineFrom</th>
                  <th>priority</th>
                </tr>
              </thead>
              <tbody>
                {tests &&
                  tests
                    .filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.clientName.toLowerCase().includes(search) ||
                            search.toLowerCase() === ""
                          ? item
                          : item.developerProfile
                                .toLowerCase()
                                .includes(search) || search.toLowerCase() === ""
                            ? item
                            : item.priority.toLowerCase().includes(search);
                    })
                    .map((item) => (
                      <tr key={item._id}>
                        <td>{item.clientName}</td>
                        <td>{item.developerProfile}</td>
                        <td>{item.status}</td>
                        <td>{item.round}</td>
                        <td>
                          {new Date(item.deadlineTo).toLocaleDateString()}
                        </td>
                        <td>
                          {new Date(item.deadlineFrom).toLocaleDateString()}
                        </td>
                        <td>{item.priority}</td>
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

export default Tests;
