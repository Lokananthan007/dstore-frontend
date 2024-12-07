import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Empattendancedata/Empattendancedata.css";

const Empattendancedata = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Convert Date to dd/mm/yyyy format
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Convert time to 12-hour format
  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    let h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    h = h ? h : 12;
    return `${h}:${minutes} ${ampm}`;
  };

  // Fetch attendance data for today
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const response = await axios.get(
          `http://localhost:5000/api/users/attendance?date=${today}`
        );
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchAttendanceData();
  }, []);

  // Handle editing a specific row
  const handleEditClick = (record) => {
    setEditingRow(record._id);
    setFormData(record);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle saving the edited row
  const handleSaveClick = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/attendance/${id}`,
        formData
      );
      setAttendanceData((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, ...response.data.updatedAttendance } : item
        )
      );
      setEditingRow(null);
    } catch (error) {
      console.error("Error updating attendance data:", error);
    }
  };

  const handleUpdateClick = () => {
    navigate("/dashboard/empattendance");
  };

  return (
    <div className="main-content">
      <div id="empattendancedata">
        <h1>Employee Attendance Update Table</h1>
        <button onClick={handleUpdateClick}>Back</button>
        <table className="attendancedata-table">
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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{record.empId}</td>
                <td>{record.empName}</td>
                <td>{formatDate(record.Date)}</td>
                <td>
                  {editingRow === record._id ? (
                    <input
                      type="time"
                      name="loginTime"
                      value={formData.loginTime || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    formatTime(record.loginTime)
                  )}
                </td>
                <td>
                  {editingRow === record._id ? (
                    <input
                      type="time"
                      name="breakTime1"
                      value={formData.breakTime1 || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    formatTime(record.breakTime1)
                  )}
                </td>
                <td>
                  {editingRow === record._id ? (
                    <input
                      type="time"
                      name="lunchTime"
                      value={formData.lunchTime || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    formatTime(record.lunchTime)
                  )}
                </td>
                <td>
                  {editingRow === record._id ? (
                    <input
                      type="time"
                      name="breakTime2"
                      value={formData.breakTime2 || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    formatTime(record.breakTime2)
                  )}
                </td>
                <td>
                  {editingRow === record._id ? (
                    <input
                      type="text"
                      name="permission"
                      value={formData.permission || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    record.permission
                  )}
                </td>
                <td>
                  {editingRow === record._id ? (
                    <input
                      type="time"
                      name="logoutTime"
                      value={formData.logoutTime || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    formatTime(record.logoutTime)
                  )}
                </td>
                <td>{record.status}</td>
                <td>
                  {editingRow === record._id ? (
                    <button onClick={() => handleSaveClick(record._id)}>Save</button>
                  ) : (
                    <button onClick={() => handleEditClick(record)}>Edit</button>
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

export default Empattendancedata;
