import React from "react";

const DisplayResume = (props) => {
  return (
    <div className="mb-3">
    <label htmlFor={props.title} className="form-label"><strong>{props.title}</strong></label>
    <textarea className="form-control" id={props.title} rows="3" defaultValue={props.data}></textarea>
  </div>
  );
};

export default DisplayResume;
