import React from "react";

const LidarTableRow = ({lidarRecords, loading}) => {
    if (loading) {
        return <h2>Loading record... </h2>;
    }
    return(
        <React.Fragment>
        {lidarRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{new Date(record.ingest_date).toDateString()}</td>
              <td>{record.keyword}</td>
              <td>
                <a href={record.s3_link} target="_blank">
                  {record.s3_link}
                </a>
              </td>
            </tr>
        ))}
        </React.Fragment>
    )
};

export default LidarTableRow;