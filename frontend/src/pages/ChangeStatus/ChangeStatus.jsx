import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import OptionsSelect from "../../components/selectOption/selectOption";
import { changeStatus } from "../../Utils/constant";

const ChangeStatus = ({
  showModal,
  setShowModal,
  data,
  handleInputChange,
  handleSubmit,
}) => {
  const { Status, Hours, Note } = data;
  const handleClose = () => setShowModal(false);
  const [moreOptions, setMoreOptions] = useState(false);

  return (
    <>
      <Form>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Status</Form.Label>
            <Form.Select
              style={{ marginBottom: 10 }}
              name="Status"
              value={Status}
              onChange={(e) => {
                handleInputChange(e);
                if (e.target.value === "I am available partially")
                  setMoreOptions(true);
                else setMoreOptions(false);
              }}
            >
              <OptionsSelect
                options={changeStatus}
                defaultOption={"Select Status"}
              />
            </Form.Select>
            {moreOptions && (
              <>
                <Form.Label>How Many Hours?</Form.Label>
                <Form.Control
                  type="time"
                  name="Hours"
                  value={Hours}
                  onChange={(e) => handleInputChange(e)}
                  style={{ marginBottom: 10, colorScheme: "dark" }}
                />
              </>
            )}
            <Form.Label>Any Note</Form.Label>
            <Form.Control
              as="textarea"
              name="Note"
              value={Note}
              onChange={(e) => handleInputChange(e)}
              rows={2}
              style={{ marginBottom: 10 }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={handleClose}>
              Close
            </Button>
            <Button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              variant="outline-success"
            >
              Change Availability
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
};

export default ChangeStatus;
