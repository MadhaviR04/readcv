import React, { useState } from 'react';
import './App.css';

function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFiles, setResumeFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleResumeUpload = (e) => {
    const files = Array.from(e.target.files);
    setResumeFiles([...resumeFiles, ...files]);
  };

  const handleSubmit = () => {
    // Here you can perform any submission logic
    console.log('Job Description:', jobDescription);
    console.log('Resumes:', resumeFiles);
    // Reset fields after submission if needed
    setJobDescription('');
    setResumeFiles([]);setSubmitted(true);
    setSubmitted(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ReedCV</h1>
        <div className="App-header-menu-items">
          <nav className="App-header-menu-item">
            <a href="#" className="menu-link">Contact</a>
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
          <div>
            {resumeFiles.map((file, index) => (
              <div key={index}>{file.name}</div>
            ))}
          </div>
        </div>
      </div>
        <button className="submit-btn" onClick={handleSubmit}>Submit</button> 
        {submitted && (
        <section className="results">
          <h2>Submission Results</h2>
          <p>Job Description: {jobDescription}</p>
          <div>
            <h3>Uploaded Resumes:</h3>
            <ul>
              {resumeFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
