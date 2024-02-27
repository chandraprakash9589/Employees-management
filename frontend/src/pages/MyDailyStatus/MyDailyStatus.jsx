import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../../Utils/utils";
import Layout from "../../components/Layout";
import "../index.css";
import StatusTable from "./MyStatusTable";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

export const MyDailyStatus = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    const getDailyStatus = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/tasks?page=${currentPage}&perPage=10&sortByDueDate=desc`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const formattedTasks = response?.data?.tasks.map((task) => {
          const formattedDate = new Date(task.date).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            },
          );
          return {
            ...task,
            date: formattedDate,
          };
        });

        setData(formattedTasks);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        toast.error("Session expired! Please login again", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    };

    getDailyStatus();
  }, [navigate, token, currentPage]);

  const handleNavigate = (item) => {
    navigate("/daily_status_updates_details", {
      state: {
        item,
      },
    });
  };
  const handleNavigate_Edit = async (item, index) => {
    navigate("/send_daily_status", {
      state: {
        item,
        index,
      },
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Layout newIndex="2">
        <div
          className="container mt-5 py-3"
          style={{ backgroundColor: "#191C24", maxWidth: 950 }}
        >
          <h2 className="text-brand">All Status</h2>
          <StatusTable
            data={data}
            handleNavigate={handleNavigate}
            handleNavigate_Edit={handleNavigate_Edit}
          />

          <div className="d-flex justify-content-center">
            <Button
              className="me-4"
              variant="success"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <Button
                  className="btn btn-success"
                  key={page}
                  onClick={() => handlePageChange(page)}
                  disabled={currentPage === page}
                >
                  {page}
                </Button>
              ),
            )}
            <Button
              className="ms-4"
              variant="success"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </Layout>
      <ToastContainer />
    </>
  );
};
