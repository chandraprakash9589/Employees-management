import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BaseURL } from "../../Utils/utils";

export const EditSkills = () => {
  const [skills, setSkills] = useState([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/EditSkills/${userId}`);
        setSkills(response.data.EditSkills);
      } catch (error) {
        console.error("Error while fetching the skills: ", error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <>
      <Layout newIndex="5">
        <div className="container bg mt-5 p-3">
          <h3 className="text-brand m-0">All Skills</h3>
          <div className="d-flex flex-row">
            <div className="py-3" style={{ flex: 1 }}>
              <Table hover>
                <thead>
                  <tr>
                    <th>Beginner</th>
                    <th>Intermediate</th>
                    <th>Proficient</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.length > 0 &&
                    skills.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.beginnerTech.map((val, index) => (
                            <div key={index} className="mt-1">
                              {val}
                            </div>
                          ))}
                        </td>
                        <td>
                          {item.intermediateTech.map((val, index) => (
                            <div key={index} className="mt-1">
                              {val}
                            </div>
                          ))}
                        </td>
                        <td>
                          {item.proficientTech.map((val, index) => (
                            <div key={index} className="mt-1">
                              {val}
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
            <div className="pe-4 d-flex align-items-center">
              <Link to="/add-skills">
                <Button variant="outline-success">
                  <MdEdit className="text-white" />
                  Edit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
