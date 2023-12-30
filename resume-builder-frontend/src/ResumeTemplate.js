import React from "react";
// import profileImage from "./assets/images/profile.jpg";
import "./assets/css/pillar-5.css";
import { useSelector } from "react-redux";
import avatar from "../src/assets/images/profile.jpg";

const ResumeTemplate = () => {
  const resumeData = useSelector((state) => state.resumeData);
  return (
    <>
      <article className="resume-wrapper text-center position-relative">
        <div className="resume-wrapper-inner mx-auto text-start bg-white shadow-lg">
          <header className="resume-header pt-4 pt-md-0">
            <div className="row">
              <div className="col-block col-md-auto resume-picture-holder text-center text-md-start">
                <img
                  className="picture"
                  src={
                    resumeData?.image
                      ? URL.createObjectURL(resumeData?.image)
                      : avatar
                  }
                  alt=""
                />
              </div>
              <div className="col">
                <div className="row p-4 justify-content-center justify-content-md-between">
                  <div className="primary-info col-auto">
                    <h1 className="name mt-0 mb-1 text-white text-uppercase text-uppercase">
                      {resumeData?.first_name} {resumeData?.last_name}
                    </h1>
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <a className="text-link" href={resumeData?.email}>
                          <i
                            className="far fa-envelope fa-fw me-2"
                            data-fa-transform="grow-3"
                          ></i>
                          {resumeData?.email}
                        </a>
                      </li>
                      <li>
                        <a className="text-link" href="/">
                          <i
                            className="fas fa-mobile-alt fa-fw me-2"
                            data-fa-transform="grow-6"
                          ></i>
                          {resumeData?.contact}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="secondary-info col-auto mt-2">
                    <ul className="resume-social list-unstyled">
                      <li className="mb-3">
                        <a className="text-link" href={resumeData?.linkedin}>
                          <span className="fa-container text-center me-2">
                            <i className="fab fa-linkedin-in fa-fw"></i>
                          </span>
                          LinkedIn
                        </a>
                      </li>
                      <li className="mb-3">
                        <a className="text-link" href={resumeData?.github}>
                          <span className="fa-container text-center me-2">
                            <i className="fab fa-github-alt fa-fw"></i>
                          </span>
                          Github
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="resume-body p-5">
            <section className="resume-section summary-section mb-5">
              <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                About Me
              </h2>
              <div className="resume-section-content text-justify">
                <p className="mb-0">{resumeData?.personalInfo}</p>
              </div>
            </section>
            <div className="row">
              <div className="col-lg-9">
                <section className="resume-section experience-section mb-5">
                  <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                    Work Experience
                  </h2>
                  <div className="resume-section-content">
                    <div className="resume-timeline position-relative">
                      <article className="resume-timeline-item position-relative pb-5">
                        <div className="resume-timeline-item-header mb-2">
                          <div className="d-flex flex-column flex-md-row">
                            <h3 className="resume-position-title font-weight-bold mb-1">
                              {resumeData?.company_position}
                            </h3>
                            <div className="resume-company-name ms-auto">
                              {resumeData?.company_name}
                            </div>
                          </div>
                          <div className="resume-position-time">
                            {resumeData?.workExStartdate} -    {" "}
                            {resumeData?.workExEndDate}
                          </div>
                        </div>
                        <div className="resume-timeline-item-desc text-justify">
                          <p>{resumeData?.workExperience}</p>
                        </div>
                      </article>
                    </div>
                  </div>
                </section>
                <section className="resume-section experience-section mb-5">
                  <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                    Project
                  </h2>
                  <div className="resume-section-content">
                    <div className="resume-timeline position-relative">
                      <article className="resume-timeline-item position-relative pb-5">
                        <div className="resume-timeline-item-header mb-2">
                          <div className="d-flex flex-column flex-md-row">
                            <h3 className="resume-position-title font-weight-bold mb-1">
                              {resumeData?.project_title}
                            </h3>
                            <div className="resume-company-name ms-auto">
                              <a target="_blank" href={resumeData?.project_link}>
                                Project Link
                              </a>
                            </div>
                          </div>
                          <div className="resume-position-time">
                            {resumeData?.projectStartdate} -{" "}
                            {resumeData?.projectEndDate}
                          </div>
                        </div>
                        <div className="resume-timeline-item-desc text-justify">
                          <p>{resumeData?.projects}</p>
                        </div>
                      </article>
                    </div>
                  </div>
                </section>
              </div>

              <div className="col-lg-3">
                <section className="resume-section skills-section mb-5">
                  <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                    Skills &amp; Tools
                  </h2>
                  <div>
                    <p>{resumeData?.skills}</p>
                  </div>
                </section>
                <section className="resume-section reference-section mb-5">
                  <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                    Achievements
                  </h2>
                  <div className="resume-section-content">
                    <ul className="list-unstyled resume-awards-list">
                      {resumeData?.achievements
                        ?.split(",")
                        .map((element, i) => {
                          return (
                            <li key={i} className="mb-2 ps-4 position-relative">
                              <i
                                className="resume-award-icon fas fa-trophy position-absolute"
                                data-fa-transform="shrink-2"
                              ></i>
                              <div className="resume-award-name">{element}</div>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default ResumeTemplate;
