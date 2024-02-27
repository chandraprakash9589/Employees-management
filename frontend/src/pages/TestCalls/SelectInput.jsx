import React from "react";
import Form from "react-bootstrap/Form";
import { useField } from "formik";
import style from "./InterviewCalls.module.css";
const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Group className="mb-3 ">
        <Form.Label>{label}</Form.Label>
        <Form.Select
          {...field}
          {...props}
          style={{ backgroundColor: "black", color: "#fff" }}
        >
          {props.children}
        </Form.Select>
        {meta.touched && meta.error ? (
          <p className={style.error}>{meta.error}</p>
        ) : null}
      </Form.Group>
    </>
  );
};

export default SelectInput;
