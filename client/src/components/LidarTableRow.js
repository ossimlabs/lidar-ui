import React from "react";

const LidarTableRow = ({s3WebHostLink, lidarRecords, loading}) => {
  if (loading) {
    return <h2>Loading record... </h2>;
  } else{
    return(
      <>
        {lidarRecords.map((record) => (
          <tr key={record.id}>
            <td>{record.id}</td>
            <td>{new Date(record.ingest_date).toDateString()}</td>
            <td>{record.keyword}</td>
            <td>
              <a href={s3WebHostLink + record.s3_link + "/index.html"} target="_blank" rel="noopener noreferrer">View</a>
            </td>
            <td>
              <a href={s3WebHostLink + record.s3_link + "/FTSTORY_Potree_Viewshed_Imagery_sampled.zip"} target="_blank" rel="noopener noreferrer">Download</a>
            </td>
          </tr>
        ))}
      </>
    )
  }

};

export default LidarTableRow;