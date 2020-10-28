import React, {useState, useEffect} from "react"
import Table from "react-bootstrap/Table"

function DataTable({data, s3WebHostLink}) {
    return (
        <Table className="table table-striped" cellSpacing={0} cellPadding={0}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Ingested</th>
                    <th>Name</th>
                    <th>Project</th>
                    <th>Zip</th>               
                </tr>
            </thead>
            <tbody>
                {data.map(info => 
                <tr key={info.id}>
                     <td>{info.id}</td>
                     <td>{new Date(info.ingest_date).toDateString()}</td>
                     <td>{info.keyword}</td>
                     <td>
                     <a href={s3WebHostLink + info.s3_link + "/index.html"} target="_blank" rel="noopener noreferrer">View</a>
                    </td>
                    <td>
                    <a href={s3WebHostLink + info.s3_link} target="_blank" rel="noopener noreferrer">Download</a>
                    </td>
                </tr>)}
            </tbody>
        </Table>
    )
}

export default DataTable;
