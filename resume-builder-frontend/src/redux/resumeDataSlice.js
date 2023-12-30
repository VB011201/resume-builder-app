import { createSlice } from "@reduxjs/toolkit";

const resumeDataSlice = createSlice({
  name: "resumeData",
  initialState: {
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
    personalInfo: "",
    projects: "",
    workExperience: "",
    workExStartdate: "",
    workExEndDate:"",
    projectStartdate: "",
    projectEndDate: "",
    image: "",
  },

  reducers: {
    formData(state, actions) {
      state.first_name = actions.payload?.first_name;
      state.last_name = actions.payload?.last_name;
      state.email = actions.payload?.email;
      state.phone = actions.payload?.phone;
      state.company_name = actions.payload?.company_name;
      state.company_position = actions.payload?.company_position;
      state.skills = actions.payload?.skills;
      state.project_title = actions.payload?.project_title;
      state.project_link = actions.payload?.project_link;
      state.achievements = actions.payload?.achievements;
      state.positionsOfResponsibility =
        actions.payload?.positionsOfResponsibility;
      state.github = actions.payload?.github;
      state.linkedin = actions.payload?.linkedin;
      state.personalInfo = actions.payload?.personalInfo;
      state.projects = actions.payload?.projects;
      state.workExperience = actions.payload?.workExperience;
      state.workExStartdate = actions.payload?.workExStartdate;
      state.workExEndDate = actions.payload?.workExEndDate;
      state.projectStartdate = actions.payload?.projectStartdate;
      state.projectEndDate = actions.payload?.projectEndDate;
      state.image = actions.payload?.image;
    },
  },
});

export const resumeDataActions = resumeDataSlice.actions;
export default resumeDataSlice;
