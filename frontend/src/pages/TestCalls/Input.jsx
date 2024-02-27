import React from "react";
import Form from "react-bootstrap/Form";
import { useField } from "formik";
import style from "./InterviewCalls.module.css";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Group className="mb-3 ">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          {...field}
          {...props}
          style={{ colorScheme:'dark', backgroundColor: "black", color: "#bdb9b9" }}
        />
        {meta.touched && meta.error ? (
          <p className={style.error}>{meta.error}</p>
        ) : null}
      </Form.Group>
    </>
  );
};

export default Input;
