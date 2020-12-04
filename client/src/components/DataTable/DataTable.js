import React from "react"
import Table from "react-bootstrap/Table"

function DataTable({data, webHostLink}) {
    const isRecordConvertingBackbroundColor = (status) => {
      if(status === "Uploading"){
        console.log("Uploading!");
        return '#cce6ff';
      } else if (status === "Converting" ) {
        console.log("Converting!");
        return '#ffffcc';
      } else if (status === "Zipping" ) {
        console.log("Zipping!");
        return '#ffd699';
      }
      else if (status === "Success") {
        console.log("Success!");
        return '#ccffcc';
      }
      // TODO: Handle errors, and possible add a delete button???
    }
    const showSpinner = (status) => {
      if(status === "Completed") {
        return "hidden"
      }
    }
    const isRecordEntwine = (type) => {
      if(type === "entwine") {
        return "none"
      } else {
        return "initial"
      }
    }
    return (
        <Table className="table table-striped" cellSpacing={0} cellPadding={0}>
            <thead>
                <tr>
                  <th>ID</th>
                    <th>Status</th>
                    <th>Ingested</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Project</th>
                    <th>Zip</th>               
                </tr>
            </thead>
            <tbody>
                {data.map(info =>
                  <tr style={{ backgroundColor: isRecordConvertingBackbroundColor(info.status)}} key={info.id}>
                       <td>{info.id}</td>
                       <td>
                         <div style={{visibility: showSpinner(info.status), marginRight: "5px"}} className="spinner-grow spinner-grow-sm text-secondary" role="status">
                         </div>
                         {info.status}
                       </td>
                       <td>{new Date(info.ingest_date).toDateString() + " " + new Date(info.ingest_date).toLocaleTimeString('en-US')}</td>
                       <td>{info.type}</td>
                       <td>{info.keyword}</td>
                       <td>
                       <span style={{display: isRecordEntwine(info.type)}}><a href={`${webHostLink}${info.s3_link}/index.html`} target="_blank" rel="noopener noreferrer">View</a></span>
                      </td>
                      <td>
                      <a href={`${webHostLink}${info.s3_link}/${info.keyword}.zip`} target="_blank" rel="noopener noreferrer">Download</a>
                      </td>
                  </tr>
                )}
            </tbody>
        </Table>
    )
}

export default DataTable;
