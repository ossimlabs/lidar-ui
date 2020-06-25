import React from "react";
import Table from "react-bootstrap/Table";
import LidarTableRow from "./LidarTableRow";

const LidarTable = ({ lidarRecords, loading }) => {
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
            <th>Link</th>
          </tr>
        </thead>
        <tbody className="table">
          <LidarTableRow lidarRecords={lidarRecords} loading={loading} />
        </tbody>
        {/*<tfoot></tfoot>*/}
      </Table>
  );
};
export default LidarTable;
