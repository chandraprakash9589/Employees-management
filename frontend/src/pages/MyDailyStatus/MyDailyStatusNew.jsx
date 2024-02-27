import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import "../index.css";

export const MyDailyStatusNewId = () => {
  const { state } = useLocation();
  const data = state.item;
  return (
    <>
      <Layout newIndex="2">
        <div className="p-3 mx-auto mt-5 bg" style={{ maxWidth: 850 }}>
          <h2 className="text-brand">Status Update on {data.date}</h2>
          <div
            className="px-3 my-3"
            style={{ borderLeft: "1px solid #60c2cf" }}
          >
            <ul>
              <li>
                <b>In Time</b>
              </li>
              <li>
                <b>Out Time</b>
              </li>
              <li>
                <b>Total Hours:</b>
              </li>
            </ul>
            <h4 className="text-white">Please Find My Status Update:</h4>
            {data.tasks.map((task, index) => (
              <ol key={index}>
                <li className="my-2">
                  <div className="d-flex align-items-center">
                    <h6 className="me-3 m-0 p-0">Project Name:</h6>
                    <span> {task.projectStatus}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <h6 className="me-3 m-0 p-0">Task:</h6>
                    <span>{task.task}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <h6 className="me-3 m-0 p-0">Working Hours:</h6>
                    <span>{task.workingHour}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <h6 className="me-3 m-0 p-0">Status:</h6>
                    <span>{task.status}</span>
                  </div>
                </li>
              </ol>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};
