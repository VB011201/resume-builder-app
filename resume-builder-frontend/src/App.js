// src/App.js
import React from "react";
import ResumeForm from "./Components/ResumeForm";
import ResumeTemplate from "./ResumeTemplate";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const App = () => {
  const printRef = React.useRef();
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("print.pdf");
  };
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <h1 className="text-center my-5">Fill out these Details</h1>
                <ResumeForm />
              </div>
            }
          ></Route>
          <Route
            path="/resume"
            element={
              <>
                <div ref={printRef}>
                  <ResumeTemplate />
                </div>
                <div className="d-flex justify-content-center mb-5">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleDownloadPdf}
                  >
                    Download as PDF
                  </button>
                </div>
              </>
            }
          ></Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
