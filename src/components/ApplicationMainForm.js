import React, { useState, useEffect, useRef } from 'react';
import ResumeResults from './ResumeResults';
import ApplicationFooter from './ApplicationFooter';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';


function ApplicationMainForm() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFiles, setResumeFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isActiveSubmit, setIsActiveSubmit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(null);
  const [rowData, setRowData] = useState([]);
  const uploadInputRef = useRef(null);

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setSubmitted(false);
      if (uploadInputRef.current) {
        uploadInputRef.current.value = ''; // Clear the value of the file input
      }
      const formData = new FormData();
      formData.append('job_description', jobDescription);
      resumeFiles.forEach((file) => {
        formData.append('files', file);
      });
      const config = {
      headers: {
        'Content-Type': 'multipart/form-data' // Set Content-Type header
      }
    };
      const response = await axios.post('https://recruitgpt.eastus.cloudapp.azure.com/uploadfiles/', formData, config);
      console.log('API Response:', response.data);
      const modifiedData = response.data;
      setRowData(modifiedData);
      //setJobDescription('');
      setResumeFiles([]);
      setSubmitted(true);
      setLoading(false);
    } catch (error) {
      console.error('API Error:', error);
      setError('Failed to submit. Please try again later.');
      setLoading(false);
    }
  };

  const handleResumeUpload = (e) => {
    const files = Array.from(e.target.files);
    const selectedFiles = files.slice(0, 5);
    const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
    const maxSize = 1 * 1024 * 1024; // 5MB in bytes
    if (totalSize > maxSize) {
      e.target.value = null; // Clear the file input
      setShowError(true);
      setIsActiveSubmit(true);
    } else {
      setResumeFiles([...resumeFiles, ...selectedFiles]);
      setShowError(false);
      setIsActiveSubmit(false);
    }
  };

  const handleRemoveFile = (fileIndex) => {
    const updatedFiles = [...resumeFiles];
    updatedFiles.splice(fileIndex, 1);
    setResumeFiles(updatedFiles);
  };


  // Disable submit button if job description or resume files are empty
  useEffect(() => {
    const activeSubmit = jobDescription.trim() === '' || resumeFiles.length === 0;
    setIsActiveSubmit(activeSubmit);
  }, [jobDescription, resumeFiles]);
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>RecruitGPT</h1>
        <div className="App-header-menu-items">
          <nav className="App-header-menu-item">
            <p className="menu-link">Contact:<a href="mailto:recruitgpt.ai@gmail.com">recruitgpt.ai@gmail.com</a></p>
            <p className="menu-link"><a href="https://forms.gle/SVoNaXcNNAWHQb3z6" target="_blank" rel="noreferrer" className="feedback-link">Your feedback here</a></p>         </nav>
        </div>
      </header>
      <div className="app-desc"><p>
        Automation, Primary Objective is to help recruiters in their hiring process by efficiently matching job descriptions with candidate resumes. I analyze the job description provided by the recruiter, identifying key skills, qualifications, and experience requirements. Simultaneously, I evaluate resumes attached here, extracting relevant information such as roles and reposibilities across work history, skills, and achievements. By employing natural language processing (NLP) techniques and machine learning algorithms, I compare the job description criteria with the content of resumes to generate a comprehensive score for each candidate. This score serves as a quantitative measure of how well a candidate's qualifications align with the job requirements, enabling human recruiters to easily shortlist resumes based on objective assessments. Ultimately, our goal is to save time and effort for recruiters, ensuring that only the most suitable candidates advance in the hiring process.
      </p></div>
      <div className="form-actions">
        <div className="container action-textbox">
          <h2>Job Description</h2>
          <textarea
            value={jobDescription}
            onChange={handleJobDescriptionChange}
            placeholder="Paste your job description (JD) here..."
            rows={10}
          />
        </div>
        <div className="container action-upload">
          <h2>Upload Resumes</h2>
          <p>Allowed file formats: PDF / Docx / Doc</p>
          <p>Please limit your files to 5 & File size shouldn't exceed 5 MB</p>
          <input
            ref={uploadInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            multiple
          />
          {showError  && <p className="error-msg">Total file size exceeds 5MB limit</p>}
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
        <button className={`submit-btn ${isActiveSubmit ? 'disabled' : ''}`} onClick={handleSubmit} disabled={isActiveSubmit}>Submit</button> 
        {error != null && <p>{error}</p>}
        {loading && <ProgressBar animated now={100} label={`Loading...`} style={{ width: '50%' }} />}
        {submitted && <ResumeResults rowData={rowData} jobDesp={jobDescription} />}
        <ApplicationFooter/>
      </div>
  );
}

export default ApplicationMainForm;
