import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table } from "react-bootstrap";
import { BaseURL } from "../../Utils/utils";
import axios from "axios";

const Projects = () => {
  const [projectData, setProjectData] = useState([]);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/project/${id}`);
        setProjectData(response.data.projects);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Layout newIndex="7">
        <div className="container mt-5 bg">
          <h4 className="px-2 py-3 m-0 text-brand">All Projects</h4>
          <div className="p-2">
            <Table striped>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projectData.length > 0 &&
                  projectData.map((item) => (
                    <tr key={item._id}>
                      <td>{item.projectName}</td>
                      <td>{new Date(item.date).toLocaleDateString()}</td>
                      <td>{item.action}</td>
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

export default Projects;
