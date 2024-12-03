import React, { useState, useEffect } from "react";
import axios from "axios";
import "../empdetails/Empattendance.css";

const Empattendance = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/employee");
        const initialAttendance = response.data.map((record) => ({
          ...record,
          status: null, // Initially no status
        }));
        setAttendance(initialAttendance);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, []);



  const handleMarkAttendance = async (index, status) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index].status = status;
    setAttendance(updatedAttendance);
  
    const attendanceData = {
      empId: updatedAttendance[index].empId,
      empName: `${updatedAttendance[index].firstName} ${updatedAttendance[index].lastName}`,
      date: new Date().toISOString().slice(0, 10),
      loginTime: updatedAttendance[index].loginTime || "09:30",
      breakTime1: updatedAttendance[index].breakTime1 || "11:30",
      lunchTime: updatedAttendance[index].lunchTime || "13:30",
      breakTime2: updatedAttendance[index].breakTime2 || "16:30",
      permission: updatedAttendance[index].permission || "",
      logoutTime: updatedAttendance[index].logoutTime || "18:30",
      status: status, // Present or Absent
    };
  
    try {
      await axios.post("http://localhost:5000/api/users/attendance", attendanceData);
      console.log("Attendance saved successfully");
    } catch (error) {
      console.error("Error saving attendance data:", error);
    }
  };
  

  return (
    <div className="main-content">
      <div id="empattendance">
        <h1>employee Attendance Table</h1>
        <table className="attendance-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Emp Id</th>
              <th>Emp Name</th>
              <th>Date</th>
              <th>login time</th>
              <th>break time</th>
              <th>lunch time</th>
              <th>break time</th>
              <th>permission</th>
              <th>logut time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{record.empId}</td>
                <td>{record.firstName} {record.lastName}</td>
                <td>{new Date().toISOString().slice(0, 10).split('-').reverse().join('-')}</td>
                <td><input type="time" defaultValue="09:30"></input></td>
                <td><input type="time" defaultValue="11:30"></input></td>
                <td><input type="time" defaultValue="13:30"></input></td>
                <td><input type="time" defaultValue="16:30"></input></td>
                <td><input type="text" ></input></td>
                <td><input type="time" defaultValue="18:30"></input></td>
                <td>
                  {record.status ? (
                    <span className={`status ${record.status.toLowerCase()}`}>
                      {record.status}
                    </span>
                  ) : (
                    <>
                      <button
                        className="present-btn"
                        onClick={() => handleMarkAttendance(index, "Present")}
                      >
                        Present
                      </button>
                      <button
                        className="absent-btn"
                        onClick={() => handleMarkAttendance(index, "Absent")}
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
