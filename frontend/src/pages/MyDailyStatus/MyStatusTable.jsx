import React from "react";
import { FaPen } from "react-icons/fa6";
import { BiSolidShow } from "react-icons/bi";
import { Button } from "react-bootstrap";

const StatusTable = ({ data, handleNavigate, handleNavigate_Edit }) => {
  return (
    <table className="table my-3" style={{ backgroundColor: "#191C24" }}>
      <thead>
        <tr className="status">
          <th>Name</th>
          <th>Status Date</th>
          <th>In-Time</th>
          <th>In-Out</th>
          <th>Total Hours</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="status">
        {data && data.length > 0
          ? data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    {item?.user?.firstName} {item?.user?.lastName}
                  </td>
                  <td>{item.date}</td>
                  <td></td>
                  <td></td>
                  <td>:</td>
                  <td>
                    <div>
                      {item.completed ? (
                        <Button
                          variant="outline-info"
                          onClick={() => handleNavigate(item)}
                        >
                          <BiSolidShow /> Show
                        </Button>
                      ) : (
                        <Button
                          variant="outline-success"
                          onClick={() => handleNavigate_Edit(item, index)}
                        >
                          <FaPen />
                          Edit
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          : null}
      </tbody>
    </table>
  );
};

export default StatusTable;
