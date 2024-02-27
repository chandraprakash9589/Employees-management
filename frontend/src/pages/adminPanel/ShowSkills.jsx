import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import { BaseURL } from "../../Utils/utils";
import axios from "axios";

const ShowSkills = () => {
  const location = useLocation();
  const { id } = location.state;
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/EditSkills/${id}`);
        setSkills(response.data.EditSkills);
      } catch (error) {}
    };
    fetchData();
  }, [id]);
  return (
    <>
      <Layout newIndex="6">
        <div className="container mt-5">
          <h3 className="bg text-brand px-3 py-2 m-0">All Skills</h3>
          <div className="bg p-4">
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
        </div>
      </Layout>
    </>
  );
};

export default ShowSkills;
