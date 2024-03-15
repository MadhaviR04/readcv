import React, { useState, useCallback, useRef } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-quartz.css';

function ResumeResults(props) {
  console.log(props.rowData);

  const gridRef = useRef();

  const [columnDefs] = useState([
    { headerName: "File Name", field: "filename", resizable: true },
    { headerName: "Candidate Name", field: "Candidate Name" },
    { headerName: "Phone Number", field: "Phone Number" },
    { headerName: "Matching Score", field: "Matching Score" },
    { headerName: "Missing Points", field: "MissingPoints" }
  ]);

  const [rowData] = useState(props.rowData);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

return (

<div className="results">
    <h2>Submission Results</h2>
    <p>Job Description: {props.jobDesp}</p>
    <button className="submit-btn" onClick={onBtnExport}>Download CSV export file</button>
     <div className="ag-theme-quartz" style={{ height: 300 , width: 1000 }}>
      <AgGridReact 
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}>
      </AgGridReact>
    </div>
</div>

)
	
}

export default ResumeResults;