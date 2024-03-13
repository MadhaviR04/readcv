import React, { useState } from 'react';
import ResumeResults from './ResumeResults';

function ApplicationMainForm() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFiles, setResumeFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isActiveSubmit, setIsActiveSubmit] = useState(false);

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  /*const handleResumeUpload = (e) => {
    const files = Array.from(e.target.files);
    setResumeFiles([...resumeFiles, ...files]);
  };*/

  const handleSubmit = () => {
    // Here you can perform any submission logic
    console.log('Job Description:', jobDescription);
    console.log('Resumes:', resumeFiles);
    // Reset fields after submission if needed
    setJobDescription('');
    setResumeFiles([]);setSubmitted(true);
    setSubmitted(true);
  };



  const handleResumeUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (totalSize > maxSize) {
      e.target.value = null; // Clear the file input
      setIsActiveSubmit(true);
    } else {
      setResumeFiles([...resumeFiles, ...selectedFiles]);
      setIsActiveSubmit(false);
    }
  };

  const handleRemoveFile = (fileIndex) => {
    const updatedFiles = [...resumeFiles];
    updatedFiles.splice(fileIndex, 1);
    setResumeFiles(updatedFiles);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ReedCV</h1>
        <div className="App-header-menu-items">
          <nav className="App-header-menu-item">
            <p className="menu-link">Contact</p>
          </nav>
        </div>
      </header>
      <div className="form-actions">
        <div className="container action-textbox">
          <h2>Job Description</h2>
          <textarea
            value={jobDescription}
            onChange={handleJobDescriptionChange}
            placeholder="Paste job description here..."
            rows={10}
          />
        </div>
        <div className="container action-upload">
          <h2>Upload Resumes</h2>
          <p>Allowed file formats: PDF / Docx / Doc</p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            multiple
          />
          {isActiveSubmit  && <p className="error-msg">Total file size exceeds 5MB limit</p>}
          <div>
            {resumeFiles.map((file, index) => (
              <div key={index}>
                {file.name} - {file.size} bytes
                <button onClick={() => handleRemoveFile(index)}>X</button>
              </div>
            ))}
          </div>
        </div>
      </div>
        <button className="submit-btn" onClick={handleSubmit} disabled={isActiveSubmit}>Submit</button> 
        {submitted && <ResumeResults jobDesp={jobDescription} />}
    </div>
  );
}

export default ApplicationMainForm;
