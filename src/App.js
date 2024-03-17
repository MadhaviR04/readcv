import React from 'react';
import './App.css';
import ApplicationMainForm from './components/ApplicationMainForm';
import { Helmet } from 'react-helmet';


function App() {
  return (
    <div className="app">
       <Helmet>
        <title>RecruitGPT</title>
        <link rel="icon" type="image/png" href="/recruitment.png" /> {/* Path to your favicon */}
      </Helmet>
      <ApplicationMainForm />
    </div>
  );
}

export default App;