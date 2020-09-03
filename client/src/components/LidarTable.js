import React from "react";
import Table from "react-bootstrap/Table";
import LidarTableRow from "./LidarTableRow";

const LidarTable = ({ s3WebHostLink, lidarRecords, loading }) => {
  if (loading) {
    return <h2>Loading table...</h2>;
  }
  return (
      <Table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Ingested</th>
            <th>Name</th>
            <th>Project</th>
            <th>Zip</th>
          </tr>
        </thead>
        <tbody>
          <LidarTableRow s3WebHostLink={s3WebHostLink} lidarRecords={lidarRecords} loading={loading} />
        </tbody>
      </Table>
  );
};
export default LidarTable;
