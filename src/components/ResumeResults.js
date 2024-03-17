import React, { useState, useCallback, useRef } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-quartz.css';

function ResumeResults(props) {
  console.log(props.rowData);

  const gridRef = useRef();

  const [columnDefs] = useState([
    { headerName: "File Name", field: "filename", resizable: true },
    { headerName: "Email Id", field: "email_id" },
    { headerName: "Phone Number", field: "phone_number" },
    { headerName: "Candidate Name", field: "Candidate Name" },
    { headerName: "Matching Score", field: "Matching Score", resizable: true },
    { headerName: "Missing Points", field: "Unmatched Keywords" }
  ]);

  const [rowData] = useState(props.rowData);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const autoSizeStrategy = {
    type: 'fitCellContents'
};

return (

<div className="results">
    <h2>Submission Results</h2>
    <p>Job Description: {props.jobDesp}</p>
    <button className="submit-btn" onClick={onBtnExport}>Download CSV export file</button>
     <div className="ag-theme-quartz" style={{ height: 300 , width: 1200 }}>
      <AgGridReact 
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}>
        autoSizeStrategy={autoSizeStrategy}
      </AgGridReact>
    </div>
</div>

)
	
}

export default ResumeResults;