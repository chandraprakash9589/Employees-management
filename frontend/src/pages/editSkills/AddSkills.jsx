import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { skillOptions } from "../../Utils/constant";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import axios from "axios";
import { BaseURL } from "../../Utils/utils";
import { ToastContainer, toast } from "react-toastify";

export const AddSkills = () => {
  const [beginnerTech, setBeginnerTech] = useState([]);
  const [intermediateTech, setIntermediateTech] = useState([]);
  const [proficientTech, setProficientTech] = useState([]);
  const [editSkills, setEditSkills] = useState([]);
  const label = ["Beginner", "Intermediate", "Proficient"];
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/EditSkills/${userId}`);
        setEditSkills(response.data.EditSkills);

        if (response.data.EditSkills.length > 0) {
          const skills = response.data.EditSkills[0];
          setBeginnerTech(skills.beginnerTech);
          setIntermediateTech(skills.intermediateTech);
          setProficientTech(skills.proficientTech);
        }
      } catch (error) {
        console.error("Error while fetching the skills: ", error);
      }
    };
    fetchData();
  }, [userId]);

  const editSkillsId = editSkills?.map((item) => item._id);
  const handleAddSkillsSubmit = async () => {
    if (editSkills.length > 0) {
      try {
        await axios.put(`${BaseURL}/EditSkills/${editSkillsId}`, {
          beginnerTech: beginnerTech,
          intermediateTech: intermediateTech,
          proficientTech: proficientTech,
          user: userId,
        });
        toast.success("Skills updated successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
        setTimeout(() => {
          navigate("/edit_skills");
        }, 1000);
      } catch (error) {
        console.error("Error Updating Skills: ", error);
      }
    } else {
      try {
        await axios.post(`${BaseURL}/EditSkills/${userId}`, {
          beginnerTech: beginnerTech,
          intermediateTech: intermediateTech,
          proficientTech: proficientTech,
          user: userId,
        });

        toast.success("Skills added successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
        setTimeout(() => {
          navigate("/edit_skills");
        }, 2000);
      } catch (error) {
        console.error("Error Adding Skills: ", error);
      }
    }
  };
  return (
    <>
      <Layout newIndex="5">
        <div className="container mt-5">
          <h3 className="px-3 py-2 m-0 bg text-brand">Add Skills</h3>
          <div className="p-4 bg m-0">
            <Form>
              {label.map((val) => (
                <Form.Group
                  key={val}
                  as={Row}
                  className="mb-3 align-items-center"
                >
                  <Form.Label column sm={2}>
                    {val} Technology
                  </Form.Label>
                  <Col sm={10}>
                    <Select
                      multi
                      searchable
                      style={{ colorScheme: "dark" }}
                      placeholder="Select Technology"
                      color="#515151"
                      className="bg-dark p-1 border-secondary"
                      options={skillOptions}
                      values={
                        val === "Beginner"
                          ? beginnerTech.map((label) => ({
                              label,
                              value: label,
                            }))
                          : val === "Intermediate"
                            ? intermediateTech.map((label) => ({
                                label,
                                value: label,
                              }))
                            : proficientTech.map((label) => ({
                                label,
                                value: label,
                              }))
                      }
                      onChange={(values) => {
                        if (val === "Beginner") {
                          setBeginnerTech(values?.map((item) => item.label));
                        } else if (val === "Intermediate") {
                          setIntermediateTech(
                            values?.map((item) => item.label),
                          );
                        } else if (val === "Proficient") {
                          setProficientTech(values?.map((item) => item.label));
                        }
                      }}
                    />
                  </Col>
                </Form.Group>
              ))}
            </Form>
            <div style={{ textAlign: "center" }}>
              <Button
                type="submit"
                onClick={() => handleAddSkillsSubmit()}
                variant="outline-info"
                style={{ width: "140px" }}
              >
                UPDATE
              </Button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
};
