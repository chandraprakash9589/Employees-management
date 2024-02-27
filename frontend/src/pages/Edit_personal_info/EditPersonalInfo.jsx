import React, { useRef, useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./EditPersonalInfo.css";
import { bloodGroupOptions, maritalStatusOptions } from "../../Utils/constant";
import Layout from "../../components/Layout";
import OptionsSelect from "../../components/selectOption/selectOption";
import { BaseURL } from "../../Utils/utils";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "../../assets/Profile.jpeg";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const EditPersonalInfo = () => {
  const [isGetData, setIsGetData] = useState(false);
  const [errors, setErrors] = useState({
    image: "",
    fatherName: "",
    motherName: "",
    personalEmail: "",
    bloodGroup: "",
    personalContactNum: "",
    emergencyContactNum: "",
    dateOfBirth: "",
    birthDay: "",
    presentAddress: "",
    maritalStatus: "",
    permanentAddress: "",
  });
  const [userData, setUserData] = useState({
    image: "",
    fatherName: "",
    motherName: "",
    personalEmail: "",
    bloodGroup: "",
    personalContactNum: "",
    emergencyContactNum: "",
    dateOfBirth: "",
    birthDay: "",
    presentAddress: "",
    dateOfMarriage: "",
    maritalStatus: "",
    permanentAddress: "",
  });
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const imgRef = useRef(null);
  useEffect(() => {
    const projectUpdate = async () => {
      try {
        const response = await axios.get(`${BaseURL}/editPesonalInfo`);
        const data = response.data.personalInfo;
        const userIndexData = data.filter((val) => val.user === userId);
        if (userIndexData.length > 0) {
          setIsGetData(true);
          const userInfo = userIndexData[0];
          setUserData(userInfo);
          localStorage.setItem("profileImg", userInfo.image);
        }
      } catch (error) {
        alert("error:", error);
      }
    };
    projectUpdate();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevData) => ({
      ...prevData,
      [name]: null,
    }));
  };

  const handleImageClick = () => {
    imgRef.current.click();
  };

  const imagebase64 = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      const data = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
      });
      return data;
    }
  };

  const handleImageChange = async (e) => {
    const files = e.target.files[0];
    if (files?.size > 1000000) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Image size should not be greater than 1MB",
      }));
      return;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      image: "",
    }));
    const images = await imagebase64(files);
    setUserData((prevData) => ({
      ...prevData,
      image: images,
    }));
  };
  const validationCheck = () => {
    let isValid = true;
    const newErrors = { errors };

    const namePattern = /^[A-Za-z]+(?: [A-Za-z]+){0,3}$/;
    if (!motherName.trim() || !namePattern.test(motherName.trim())) {
      isValid = false;
      newErrors.motherName = "Invalid MotheName";
    }

    if (!fatherName.trim() || !namePattern.test(fatherName.trim())) {
      isValid = false;
      newErrors.fatherName = "Invalid FatherName";
    }

    const emailPattern = /^[^\s@]+@(bestpeers|gmail)+.(in|com)$/;
    if (
      !personalEmail ||
      !personalEmail.trim() ||
      !emailPattern.test(personalEmail)
    ) {
      isValid = false;
      newErrors.personalEmail = "Invalid Email";
    }

    const numPattern = /^[6-9][0-9]{9}$/;
    if (!personalContactNum.trim() || !numPattern.test(personalContactNum)) {
      isValid = false;
      newErrors.personalContactNum = "Invalid Number";
    }

    if (!emergencyContactNum.trim() || !numPattern.test(emergencyContactNum)) {
      isValid = false;
      newErrors.emergencyContactNum = "Invalid emergencyContactNum";
    }

    if (!dateOfBirth) {
      isValid = false;
      newErrors.dateOfBirth = "Invalid DOB";
    }

    if (!birthDay) {
      isValid = false;
      newErrors.birthDay = "Invalid Birthday";
    }

    if (!presentAddress.trim()) {
      isValid = false;
      newErrors.presentAddress = "Invalid Address";
    }

    if (!permanentAddress.trim()) {
      isValid = false;
      newErrors.permanentAddress = "Invalid Address";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validationCheck()) {
      if (isGetData) {
        try {
          await axios.put(`${BaseURL}/editPesonalInfo/${userId}`, userData);
          localStorage.setItem("profileImg", userData.image);
          toast.success("Information updated successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
        } catch (error) {
          toast.error("Something went wrong! please login again", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      } else {
        try {
          await axios.post(`${BaseURL}/editPesonalInfo`, {
            user: userId,
            ...userData,
          });
          toast.success("Information added successfully!", {
            position: "top-center",
            autoClose: 2000,
          });
        } catch (error) {
          toast.error("Something went wrong! please login again", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      }
    }
  };
  const {
    image,
    fatherName,
    motherName,
    personalEmail,
    bloodGroup,
    maritalStatus,
    dateOfMarriage,
    personalContactNum,
    emergencyContactNum,
    dateOfBirth,
    birthDay,
    presentAddress,
    permanentAddress,
  } = userData;

  return (
    <Layout newIndex="6">
      <div className="containerOne">
        <div>
          <h3 className="headOne">Personal Information</h3>
        </div>
        <div>
          <Form className="p-4 backg">
            <div
              onClick={handleImageClick}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {image ? (
                <div className="profile-icon-div">
                  <img className="profile-img" src={image} alt="Profile" />
                  <div className="icon-styles">
                    <FaCamera size={20} />
                  </div>
                </div>
              ) : (
                <div className="profile-icon-div">
                  <img
                    className="profile-img"
                    src={Profile}
                    alt="Default Profile"
                  />
                  <div className="icon-styles">
                    <FaCamera size={20} />
                  </div>
                </div>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                ref={imgRef}
                style={{ display: "none" }}
              />
            </div>
            <span className="text-danger d-flex justify-content-center m-2">
              {errors.image}
            </span>
            <Row>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Father name</Form.Label>
                <Form.Control
                  type="text"
                  className="bg-dark text-white"
                  placeholder="Enter father name"
                  name="fatherName"
                  value={fatherName}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.fatherName}</span>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Mother name</Form.Label>
                <Form.Control
                  type="text"
                  className="bg-dark text-white"
                  placeholder="Enter Mother name"
                  name="motherName"
                  value={motherName}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.motherName}</span>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Personal Email</Form.Label>
                <Form.Control
                  type="email"
                  className="bg-dark text-white"
                  placeholder="Enter your email"
                  name="personalEmail"
                  value={personalEmail}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.personalEmail}</span>
              </Form.Group>

              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Blood Group</Form.Label>
                <Form.Control
                  as="select"
                  className="bg-dark text-white"
                  name="bloodGroup"
                  value={bloodGroup}
                  onChange={handleChange}
                >
                  <OptionsSelect
                    options={bloodGroupOptions}
                    defaultOption="Select Blood Group"
                  />
                </Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Personal Contact</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your contact number"
                  className="bg-dark text-white"
                  name="personalContactNum"
                  value={personalContactNum}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.personalContactNum}</span>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Emergency Contact</Form.Label>
                <Form.Control
                  type="text"
                  className="bg-dark text-white"
                  placeholder="Enter your contact number"
                  name="emergencyContactNum"
                  value={emergencyContactNum}
                  onChange={handleChange}
                />
                <span className="text-danger">
                  {errors.emergencyContactNum}
                </span>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter your date of birth"
                  style={{ colorScheme: "dark" }}
                  name="dateOfBirth"
                  className="bg-dark text-white "
                  value={dateOfBirth}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.dateOfBirth}</span>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  style={{ colorScheme: "dark" }}
                  placeholder="Enter your date of birth"
                  className="bg-dark text-white"
                  name="birthDay"
                  value={birthDay}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.birthDay}</span>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Date of marriage</Form.Label>
                <Form.Control
                  type="date"
                  style={{ colorScheme: "dark" }}
                  name="dateOfMarriage"
                  className="bg-dark text-white"
                  value={dateOfMarriage}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Marital status</Form.Label>
                <Form.Control
                  as="select"
                  className="bg-dark text-white"
                  name="maritalStatus"
                  value={maritalStatus}
                  onChange={handleChange}
                >
                  <OptionsSelect
                    options={maritalStatusOptions}
                    defaultOption="Select Marital Status"
                  />
                </Form.Control>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Present address</Form.Label>
              <Form.Control
                as="textarea"
                className="bg-dark text-white"
                placeholder="Enter present address"
                name="presentAddress"
                value={presentAddress}
                onChange={handleChange}
              />
              <span className="text-danger">{errors.presentAddress}</span>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Permanent address</Form.Label>
              <Form.Control
                as="textarea"
                className="bg-dark text-white"
                name="permanentAddress"
                placeholder="Enter permanent address"
                value={permanentAddress}
                onChange={handleChange}
              />
              <span className="text-danger">{errors.permanentAddress}</span>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="outline-success" onClick={handleFormSubmit}>
                Update
              </Button>
              <Button variant="outline-primary" onClick={() => navigate("/")}>
                Back
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default EditPersonalInfo;
