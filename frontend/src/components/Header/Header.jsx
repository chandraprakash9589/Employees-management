import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../style.css";
import "react-toastify/dist/ReactToastify.css";
import "font-awesome/css/font-awesome.min.css"; // Import Font Awesome CSS
import "../../bootstrap.min.css";
import ChangeStatus from "../../pages/ChangeStatus/ChangeStatus";
import { FaPenToSquare } from "react-icons/fa6";
import { BiSolidHomeHeart } from "react-icons/bi";
import { FaMedal, FaRegClipboard } from "react-icons/fa";
import Profile from "../../assets/Profile.jpeg";
import axios from "axios";
import { BaseURL } from "../../Utils/utils";

const Header = ({ newIndex }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const localToken = localStorage.getItem("jwtToken");
  const [toggleNav, setToggleNav] = useState(false);
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const [userStatus, setUserStatus] = useState([]);
  const role = localStorage.getItem("role");
  const profileImg = localStorage.getItem("profileImg");
  const [data, setData] = useState({
    Status: "",
    Hours: "",
    Note: "",
  });
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!localToken) {
      navigate("/login");
      return;
    }
  }, [localToken, navigate]);

  useEffect(() => {
    const fetchChangeStatus = async () => {
      try {
        const response = await axios.get(`${BaseURL}/changeStatus/${userId}`);
        setUserStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching change status");
      }
    };
    fetchChangeStatus();
  }, [data, userId]);

  const logout = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        localStorage.clear();
        toast.success("Logout successful");
      }
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  const location = useLocation();
  if (location.pathname === "/login") {
    return null;
  }
  const handleChangeStatus = () => {
    setShowModal(!showModal);
  };

  const { Status, Hours, Note } = data;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleClose = () => setShowModal(false);

  const statusid = userStatus?.map((item) => item._id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userStatus.length > 0) {
      try {
        await axios.put(`${BaseURL}/changeStatus/${statusid}`, {
          Status: Status,
          Hours: Hours,
          Note: Note,
          user: userId,
        });
        toast.success("Status Updated successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        handleClose();
        setData({ ...data, Status: "", Hours: "", Note: "" });
      } catch (error) {
        console.error("Error updating status", error);
      }
    } else {
      try {
        await axios.post(`${BaseURL}/changeStatus/${userId}`, {
          Status: Status,
          Hours: Hours,
          Note: Note,
          user: userId,
        });
        toast.success("Status Added successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        handleClose();
        setData({ ...data, Status: "", Hours: "", Note: "" });
      } catch (error) {
        console.error("Error changing status", error);
      }
    }
  };
  return (
    <>
      <div className="header-container">
        {/* sidebar start */}
        <div
          className={toggleNav ? "sidebar pe-4 pb-3 open" : "sidebar pe-4 pb-3"}
        >
          <nav className="navbar bg-secondary navbar-dark">
            <div className="ms-5 mt-0">
              <img
                src={require("../../assets/logo.png")}
                alt="logo"
                height={50}
                width={100}
              />
            </div>
            <div className="d-flex align-items-center ms-4 mt-4">
              <div className="position-relative">
                {profileImg ? (
                  <div>
                    <img
                      width={50}
                      height={50}
                      style={{ border: "1px solid #ccc", borderRadius: 50 }}
                      src={profileImg}
                      alt="Profile"
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      width={50}
                      height={50}
                      style={{ border: "1px solid #ccc", borderRadius: 50 }}
                      src={Profile}
                      alt="Default Profile"
                    />
                  </div>
                )}

                <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
              </div>
              <div className="ms-3">
                <h6 className="mb-0">{`${firstName} ${lastName}`}</h6>
                <span>{`${role}`}</span>
              </div>
            </div>
            <div className="navbar-nav w-100 mt-5">
              <Link to="/">
                <div className={!newIndex ? `nav-link active` : "nav-link"}>
                  <i className="fa fa-th me-2"></i>Dashboard
                </div>
              </Link>

              <Link to="/send_daily_status">
                <div
                  className={newIndex === "1" ? `nav-link active` : "nav-link"}
                >
                  <i className="me-2">
                    <FaPenToSquare />
                  </i>
                  Send Updates
                </div>
              </Link>
              <Link to="/daily_status_updates">
                <div
                  className={newIndex === "2" ? `nav-link active` : "nav-link"}
                >
                  <i className="fa fa-laptop me-2"></i>My Updates
                </div>
              </Link>
              <Link to="/projects">
                <div
                  className={newIndex === "7" ? `nav-link active` : "nav-link"}
                >
                  <i className="me-2">
                    <FaRegClipboard />
                  </i>
                  Projects
                </div>
              </Link>
              <Link to="/my_leave">
                <div
                  className={
                    newIndex === "3"
                      ? `nav-link d-flex align-items-center active`
                      : "nav-link d-flex align-items-center"
                  }
                >
                  <i className="me-2">
                    <BiSolidHomeHeart size={18} />
                  </i>
                  <span>My Leaves</span>
                </div>
              </Link>

              <Link to="/holidays">
                <div
                  className={newIndex === "4" ? `nav-link active` : "nav-link"}
                >
                  <i className="fa fa-table me-2"></i>Holidays
                </div>
              </Link>
              <Link to="/edit_skills">
                <div
                  className={newIndex === "5" ? `nav-link active` : "nav-link"}
                >
                  <i className="me-2">
                    <FaMedal />
                  </i>
                  Skills
                </div>
              </Link>
            </div>
          </nav>
        </div>
        {/* Sidebar End */}
        {/* Content Start */}
        <div className={toggleNav ? "content open" : "content"}>
          {/* Navbar Start  */}
          <Navbar
            collapseOnSelect
            expand="lg"
            className=" navbar-expand bg-secondary navbar-dark sticky-top m-0 ps-3 p-0"
          >
            <span
              className="sidebar-toggler text-brand content open flex-shrink-0"
              style={{ cursor: "pointer" }}
              onClick={() => setToggleNav(!toggleNav)}
            >
              <i className="fa fa-bars"></i>
            </span>
            {toggleNav ? <span className="showLogo">BESTPEERS</span> : ""}
            <Container className="pe-0 me-4">
              <div></div>
              <div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="bg-secondary">
                    <div className="d-flex nav-link">
                      <NavDropdown
                        title="Tests/Calls"
                        align="end"
                        menuVariant="dark"
                        id="collapsible-nav-dropdown"
                      >
                        <NavDropdown.Item onClick={() => navigate("/calls")}>
                          Calls
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("/tests")}>
                          Tests
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                    <div className="d-flex nav-link ms-0 ">
                      <NavDropdown
                        menuVariant="dark"
                        title="Support"
                        align="end"
                        id="collapsible-nav-dropdown-2"
                      >
                        <NavDropdown.Item
                          onClick={() => navigate("/discussion_desk")}
                        >
                          Discussion Desk
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          onClick={() => navigate("/help_desk")}
                        >
                          Help Desk
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                    <div className="d-flex nav-link ms-0 ">
                      <NavDropdown
                        align="end"
                        menuVariant="dark"
                        title={`${firstName} ${lastName}`}
                        id="collapsible-nav-dropdown-3"
                      >
                        <NavDropdown.Item onClick={() => handleChangeStatus()}>
                          Change Status
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          onClick={() => navigate("/edit_profile")}
                        >
                          Edit Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          onClick={() => navigate("/edit_personal_info")}
                        >
                          Edit Personal info
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => logout()}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                    {role === "admin" && localToken && (
                      <div className="d-flex nav-link ms-0 ">
                        <NavDropdown
                          title="Admin Panel"
                          menuVariant="dark"
                          align="end"
                          id="collapsible-nav-dropdown-4"
                        >
                          <NavDropdown.Item onClick={() => navigate("/Signup")}>
                            Add Employee
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() => navigate("/All_users")}
                          >
                            All Employees
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() => navigate("/projectUpdate")}
                          >
                            Projects
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() => navigate("/tests_calls")}
                          >
                            Tests/Calls
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            onClick={() => navigate("/all_leaves")}
                          >
                            All Leaves
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={() => navigate("/skills")}>
                            Employees Skills
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() => navigate("/add_holidays")}
                          >
                            Add Holidays
                          </NavDropdown.Item>
                        </NavDropdown>
                      </div>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </div>
            </Container>
          </Navbar>
          {/* Navbar End */}
        </div>
      </div>
      {showModal ? (
        <ChangeStatus
          showModal={showModal}
          setShowModal={setShowModal}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          data={data}
        />
      ) : null}
    </>
  );
};

export default Header;
