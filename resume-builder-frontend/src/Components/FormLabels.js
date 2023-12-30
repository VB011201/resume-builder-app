import React from "react";

const FormLabels = (props) => {
  return (
    <div className="mb-3 text-center">
      <label htmlFor={props.iid} className="form-label required">
        <strong>{props.title}</strong>
      </label>
      <input
        type={props.type}
        className="form-control"
        id={props.iid}
        rows="3"
        placeholder={props.dtext}
        value={props.value}
        onChange={props.handleChange(props.feild)}
        required
      ></input>
    </div>
  );
};

export default FormLabels;
