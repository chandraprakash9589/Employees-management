import React from "react";
const OptionsSelect = ({ options, defaultOption }) => {
  return (
    <>
      <option value="" disabled hidden>
        {defaultOption}
      </option>
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </>
  );
};

export default OptionsSelect;
