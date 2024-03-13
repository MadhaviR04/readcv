import React, { useState, useCallback, useRef } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-quartz.css';

function ResumeResults(props) {
  const gridRef = useRef();
  const [columnDefs] = useState([
    { headerName: "File Name", field: "filename", resizable: true },
    { headerName: "Email", field: "email" },
    { headerName: "Score", field: "score" },
    { headerName: "Contact Number", field: "contactnumber" },
    { headerName: "Missing Points", field: "missingpoints" }
  ]);

  const [rowData] = useState([
    { filename: "Name_resume_1", email: "name1@gmail.com", score: "79%", contactnumber:"+1 7787787890", missingpoints:"NIL", sortable: true, filter: true, resizable: true  },
    { filename: "Name_resume_2", email: "name2@gmail.com", score: "94%", contactnumber:"+1 5547787890", missingpoints:"NIL", sortable: true, filter: true, resizable: true  },
    { filename: "Name_resume_3", email: "name3@gmail.com", score: "71%", contactnumber:"+1 3214557223", missingpoints:"NIL", sortable: true, filter: true, resizable: true  },
    { filename: "Name_resume_4", email: "name4@gmail.com", score: "56%", contactnumber:"+1 5454987562", missingpoints:"NIL", sortable: true, filter: true, resizable: true  },
    { filename: "Name_resume_5", email: "name5@gmail.com", score: "34%", contactnumber:"+1 2213457627", missingpoints:"NIL", sortable: true, filter: true, resizable: true  },
  ]);

  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

return (

<div className="results">
    <h2>Submission Results</h2>
    <p>Job Description: {props.jobDesp}</p>
    <button onClick={onBtnExport}>Download CSV export file</button>
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