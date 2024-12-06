import React from "react";
import "../Empattendancedata/Empattendancedata.css";

const Empattendance = () => {
  

  return (
      <div id="empattendancedata">
        <h1>Employee Attendance update Table</h1>
        <table className="attendance-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Emp Id</th>
              <th>Emp Name</th>
              <th>Date</th>
              <th>Login Time</th>
              <th>Break Time 1</th>
              <th>Lunch Time</th>
              <th>Break Time 2</th>
              <th>Permission</th>
              <th>Logout Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
  );
};

export default Empattendance;
