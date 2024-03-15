import React, { useState } from 'react';
import ResumeResults from './ResumeResults';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';


function ApplicationMainForm() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFiles, setResumeFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isActiveSubmit, setIsActiveSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rowData, setRowData] = useState([]);

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
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
      const response = await axios.post('http://172.172.161.88:8000/uploadfiles/', formData, config);
      console.log('API Response:', response.data);
      const modifiedData = response.data.map(item => ({
        ...item,
        MissingPoints: '-' // Add the new value
        }));
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
          <p>Please limit your files to 5 & file size don't exceed 5 MB</p>
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
        {error != null && <p>{error}</p>}
        {loading && <ProgressBar animated now={100} label={`Loading...`} style={{ width: '50%' }} />}
        {submitted && <ResumeResults rowData={rowData} jobDesp={jobDescription} />}
    </div>
  );
}

export default ApplicationMainForm;
