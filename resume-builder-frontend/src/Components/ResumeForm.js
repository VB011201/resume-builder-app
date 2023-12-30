// src/ResumeForm.js
import React, { useState } from "react";
import "../App.css";
import FormLabels from "./FormLabels";
import DisplayResume from "./DisplayResume";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { resumeDataActions } from "../redux/resumeDataSlice";

// import { Link } from "react-router-dom";
function ResumeForm() {
  const [workExStartdate, setWorkExStartDate] = useState("");
  const [workExEndDate, setWorkExEndDate] = useState("");

  const [projectStartdate, setProjectStartDate] = useState("");
  const [projectEndDate, setProjectEndDate] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const resumeData = useSelector((state) => state.resumeData);

  const [formDataFront, setFormDataFront] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company_name: "",
    company_position: "",
    skills: "",
    project_title: "",
    project_link: "",
    achievements: "",
    positionsOfResponsibility: "",
    github: "",
    linkedin: "",
  });
  const [formData, setFormData] = useState({
    personalInfo: "",
    projects: "",
    workExperience: "",
  });
  const handleChange = (category) => (e) => {
    setFormDataFront({ ...formDataFront, [category]: e.target.value });
    dispatch(
      resumeDataActions.formData({ ...resumeData, [category]: e.target.value })
    );
    // console.log(resumeData);
  };

  const handleChangeBack = (category) => (e) => {
    setFormData({ ...formData, [category]: e.target.value });
    dispatch(
      resumeDataActions.formData({ ...resumeData, [category]: e.target.value })
    );
    // console.log(resumeData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/generate_resume", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error generating resume");
      }

      const result = await response.json();
      dispatch(
        resumeDataActions.formData({
          ...resumeData,
          personalInfo: result.resume.personalInfo,
          projects: result.resume.projects,
          workExperience: result.resume.workExperience,
        })
      );
      // console.log(result.resume);
      // console.log(resumeData?.personalInfo);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="container" id="form">
          <form onSubmit={handleSubmit}>
            <div className="row my-3">
              <label className="form-label text-center">
                <strong>Name</strong>
              </label>
              <div className="col">
                <FormLabels
                  type="text"
                  iid="first_name"
                  title="First Name *"
                  dtext="First Name"
                  value={formDataFront.first_name}
                  handleChange={handleChange}
                  feild="first_name"
                />
              </div>
              <div className="col">
                <FormLabels
                  type="text"
                  iid="last_name"
                  title="Last Name *"
                  dtext="Last Name"
                  value={formDataFront.last_name}
                  handleChange={handleChange}
                  feild="last_name"
                />
              </div>
            </div>
            <div className="mb-3 text-center">
              <label htmlFor="formFile" className="form-label">
                <strong> {image ? image?.name : "Upload Image *"}</strong>
              </label>
              <input
                required
                className="form-control"
                type="file"
                id="formFile"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  dispatch(
                    resumeDataActions.formData({
                      ...resumeData,
                      image: e.target.files[0],
                    })
                  );
                }}
              />
            </div>
            <FormLabels
              type="email"
              iid="email"
              title="Email Address *"
              dtext="name@example.com"
              value={formDataFront.email}
              handleChange={handleChange}
              feild="email"
            />
            <FormLabels
              type="tel"
              iid="phone"
              title="Contact *"
              dtext="10 digit valid number"
              value={formDataFront.phone}
              handleChange={handleChange}
              feild="phone"
            />
            <FormLabels
              type="text"
              iid="about"
              title="About You *"
              dtext="Personal Information"
              value={formData.personalInfo}
              handleChange={handleChangeBack}
              feild="personalInfo"
            />
            <h6 style={{ textAlign: "center" }}>
              {" "}
              <strong>Work Experience</strong>{" "}
            </h6>
            <div className="row g-3 mb-3">
              <div className="col-md-6  text-center">
                <label htmlFor="CompanyName" className="form-label">
                  <strong>Company Name *</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="CompanyName"
                  value={formDataFront.company_name}
                  onChange={handleChange("company_name")}
                  required
                />
              </div>
              <div className="col-md-6  text-center">
                <label htmlFor="Position" className="form-label">
                  <strong>Position *</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Position"
                  value={formDataFront.company_position}
                  onChange={handleChange("company_position")}
                  required
                />
              </div>
              <div className="d-flex mt-4 justify-content-center align-items-center">
                <div className="d-flex col">
                  <div className="px-3">
                    <strong>Start Date *</strong>
                  </div>
                  <DatePicker
                    selected={workExStartdate}
                    onChange={(date) => {
                      setWorkExStartDate(date);
                      dispatch(
                        resumeDataActions.formData({
                          ...resumeData,
                          workExStartdate:
                            date.getDate().toString() +
                            "/" +
                            (date.getMonth() + 1).toString() +
                            "/" +
                            date.getFullYear().toString(),
                        })
                      );
                    }}
                  />
                </div>
                <div className="d-flex col">
                  <div className="px-3">
                    <strong>End Date *</strong>
                  </div>
                  <DatePicker
                    selected={workExEndDate}
                    onChange={(date) => {
                      setWorkExEndDate(date);
                      dispatch(
                        resumeDataActions.formData({
                          ...resumeData,
                          workExEndDate:
                            date.getDate().toString() +
                            "/" +
                            (date.getMonth() + 1).toString() +
                            "/" +
                            date.getFullYear().toString(),
                        })
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <FormLabels
              type="text"
              iid="workExperience"
              title="Description *"
              dtext="Work Experience(Keywords),Rest of magic we will do"
              value={formData.workExperience}
              handleChange={handleChangeBack}
              feild="workExperience"
            />
            <h6 style={{ textAlign: "center" }}>
              {" "}
              <strong>Project</strong>{" "}
            </h6>
            <div className="row g-3 mb-3">
              <div className="col-md-6  text-center">
                <label htmlFor="ProjectTitle" className="form-label">
                  <strong>Project Title *</strong>
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="ProjectTitle"
                  value={formDataFront.project_title}
                  onChange={handleChange("project_title")}
                />
              </div>
              <div className="col-md-6  text-center">
                <label htmlFor="ProjectLink" className="form-label">
                  <strong>Project Link *</strong>
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="ProjectLink"
                  value={formDataFront.project_link}
                  onChange={handleChange("project_link")}
                  required
                />
              </div>
              <div className="d-flex mt-4 justify-content-center align-items-center">
                <div className="d-flex col">
                  <div className="px-3">
                    <strong>Start Date *</strong>
                  </div>
                  <DatePicker
                    selected={projectStartdate}
                    onChange={(date) => {
                      setProjectStartDate(date);
                      dispatch(
                        resumeDataActions.formData({
                          ...resumeData,
                          projectStartdate:
                            date.getDate().toString() +
                            "/" +
                            (date.getMonth() + 1).toString() +
                            "/" +
                            date.getFullYear().toString(),
                        })
                      );
                    }}
                  />
                </div>
                <div className="d-flex col">
                  <div className="px-3">
                    <strong>End Date *</strong>
                  </div>
                  <DatePicker
                    selected={projectEndDate}
                    onChange={(date) => {
                      setProjectEndDate(date);
                      dispatch(
                        resumeDataActions.formData({
                          ...resumeData,
                          projectEndDate:
                            date.getDate().toString() +
                            "/" +
                            (date.getMonth() + 1).toString() +
                            "/" +
                            date.getFullYear().toString(),
                        })
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <FormLabels
              type="text"
              iid="projects"
              title="Description *"
              dtext="Projects (Keywords with bit of explanation),Rest of magic we will do"
              value={formData.projects}
              handleChange={handleChangeBack}
              feild="projects"
            />
            <FormLabels
              type="text"
              iid="skills"
              title="Skill Set *"
              dtext="Enter Skills comma seperated"
              value={formDataFront.skills}
              handleChange={handleChange}
              feild="skills"
            />
            <FormLabels
              type="text"
              iid="achievements"
              title="Achievements *"
              dtext="List down your achievements seperated by ';'"
              value={formDataFront.achievements}
              handleChange={handleChange}
              feild="achievements"
            />
            <FormLabels
              type="text"
              iid="por"
              title="Position of Responsibility *"
              dtext="Positions of Responsibility"
              value={formDataFront.positionsOfResponsibility}
              handleChange={handleChange}
              feild="positionsOfResponsibility"
            />
            <div className="container text-center mb-3">
              <button type="submit" className="text-center">
                Preview Text
              </button>
            </div>
          </form>
        </div>

        <h2 className="text-center my-5">Check your info below</h2>
        <div className="container mt-3" id="checkResume">
          <div className="row my-3">
            <div className="col">
              <label htmlFor="firstname" className="form-label required">
                <strong>First Name</strong>
              </label>
              <textarea
                type="text"
                className="form-control"
                id="firstname"
                rows="1"
                defaultValue={formDataFront.first_name}
              ></textarea>
            </div>
            <div className="col">
              <label htmlFor="lastname" className="form-label required">
                <strong>Last Name</strong>
              </label>
              <textarea
                type="text"
                className="form-control"
                id="lastname"
                rows="1"
                defaultValue={formDataFront.last_name}
              ></textarea>
            </div>
          </div>
          <div className="my-3">
            <label htmlFor="email" className="form-label required">
              <strong>Email</strong>
            </label>
            <textarea
              type="email"
              className="form-control"
              id="email"
              rows="1"
              defaultValue={formDataFront.email}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label required">
              <strong>Contact</strong>
            </label>
            <textarea
              type="text"
              className="form-control"
              id="phone"
              rows="1"
              defaultValue={formDataFront.phone}
            ></textarea>
          </div>

          <DisplayResume title="About" data={resumeData.personalInfo} />
          <DisplayResume
            title="Work Description"
            data={resumeData.workExperience}
          />
          <DisplayResume
            title="Project Description"
            data={resumeData.projects}
          />
          <DisplayResume
            title="Achievements"
            data={formDataFront.achievements}
          />
          <DisplayResume title="Skill Set" data={formDataFront.skills} />
          <DisplayResume
            title="Positions of Responsibility"
            data={formDataFront.positionsOfResponsibility}
          />
        </div>
      </div>
    </>
  );
}

export default ResumeForm;
