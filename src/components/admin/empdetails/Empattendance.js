import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../empdetails/Empattendance.css";

const Empattendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        // Fetch employee data
        const employeeResponse = await axios.get("http://localhost:5000/api/users/employee");
        const employees = employeeResponse.data;
  
        // Get today's date
        const today = new Date().toISOString().slice(0, 10);
  
        // Fetch today's attendance records
        const attendanceResponse = await axios.get(
          `http://localhost:5000/api/users/attendance?date=${today}`
        );
        const savedAttendance = attendanceResponse.data;
  
        // Merge employee data with attendance
        const initialAttendance = employees.map((record) => {
          const savedRecord = savedAttendance.find(
            (att) => att.empId === record.empId
          );
          return {
            ...record,
            loginTime: savedRecord?.loginTime || "09:30",
            breakTime1: savedRecord?.breakTime1 || "11:30",
            lunchTime: savedRecord?.lunchTime || "13:30",
            breakTime2: savedRecord?.breakTime2 || "16:30",
            permission: savedRecord?.permission || "",
            logoutTime: savedRecord?.logoutTime || "18:30",
            status: savedRecord?.status || null,
          };
        });
  
        setAttendance(initialAttendance);
        setIsDataFetched(true);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
  
    fetchAttendanceData();
  }, []);

  
  const handleInputChange = (index, field, value) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index][field] = value;
    setAttendance(updatedAttendance);
  };

  const handleMarkAttendance = async (index, status) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index].status = status;
    setAttendance(updatedAttendance);

    const attendanceData = {
      empId: updatedAttendance[index].empId,
      empName: `${updatedAttendance[index].firstName} ${updatedAttendance[index].lastName}`,
      date: new Date().toISOString().slice(0, 10),
      loginTime: updatedAttendance[index].loginTime,
      breakTime1: updatedAttendance[index].breakTime1,
      lunchTime: updatedAttendance[index].lunchTime,
      breakTime2: updatedAttendance[index].breakTime2,
      permission: updatedAttendance[index].permission,
      logoutTime: updatedAttendance[index].logoutTime,
      status: status,
    };

    try {
      await axios.post("http://localhost:5000/api/users/attendance", attendanceData);
      console.log("Attendance marked successfully");
    } catch (error) {
      console.error("Error saving attendance data:", error);
    }
  };


  const handleUpdateClick = () => {
    navigate("/dashboard/empattendance/empattendancedata"); 
  };

  return (
    <div className="main-content">
      <div id="empattendance">
        <h1>Employee Attendance Table</h1>
        <button className='update-btn' onClick={handleUpdateClick}>Update</button>
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
            {attendance.map((record, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{record.empId}</td>
                <td>{record.firstName} {record.lastName}</td>
                <td>{new Date().toISOString().slice(0, 10).split("-").reverse().join("-")}</td>
                <td>
                  <input
                    type="time"
                    value={record.loginTime}
                    onChange={(e) => handleInputChange(index, "loginTime", e.target.value)}
                    disabled={record.status} // Disable if status is set
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={record.breakTime1}
                    onChange={(e) => handleInputChange(index, "breakTime1", e.target.value)}
                    disabled={record.status} // Disable if status is set
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={record.lunchTime}
                    onChange={(e) => handleInputChange(index, "lunchTime", e.target.value)}
                    disabled={record.status} // Disable if status is set
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={record.breakTime2}
                    onChange={(e) => handleInputChange(index, "breakTime2", e.target.value)}
                    disabled={record.status} // Disable if status is set
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={record.permission}
                    onChange={(e) => handleInputChange(index, "permission", e.target.value)}
                    disabled={record.status} // Disable if status is set
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={record.logoutTime}
                    onChange={(e) => handleInputChange(index, "logoutTime", e.target.value)}
                    disabled={record.status} // Disable if status is set
                  />
                </td>
                <td>
                  {record.status ? (
                    <span className={`status ${record.status.toLowerCase()}`}>
                      {record.status}
                    </span>
                  ) : (
                    <>
                      <button 
                        className="present"
                        onClick={() => handleMarkAttendance(index, "Present")}
                        disabled={isDataFetched && record.status}
                      >
                        Present
                      </button>
                      <button 
                        className="absent"
                        onClick={() => handleMarkAttendance(index, "Absent")}
                        disabled={isDataFetched && record.status}
                      >
                        Absent
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Empattendance;
