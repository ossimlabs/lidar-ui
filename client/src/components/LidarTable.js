import React from "react";
import Table from "react-bootstrap/Table";
import LidarTableRow from "./LidarTableRow";

const LidarTable = ({ lidarRecords, loading, viewerBaseURL }) => {
  if (loading) {
    return <h2>Loading table...</h2>;
  }

  // console.log('LidarTable.viewerBaseURL', viewerBaseURL);

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
          <LidarTableRow
              lidarRecords={lidarRecords}
              loading={loading}
              viewerBaseURL={viewerBaseURL}
          />
        </tbody>
        {/*<tfoot></tfoot>*/}
      </Table>
  );
};
export default LidarTable;
