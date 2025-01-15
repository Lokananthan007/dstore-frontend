import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Employee.css';

function Employee() {
    const [employees, setEmployees] = useState([]);

    // Fetch employees
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/users');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        fetchEmployees();
    }, []);

    // Delete employee
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/auth/delete/${id}`);
            setEmployees(employees.filter(employee => employee._id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div id="employee">
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Employee Name</th>
                        <th>Employee Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee._id}>
                            <td>{index + 1}</td>
                            <td>{employee.username}</td>
                            <td>{employee.role}</td>
                            <td>
                                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Employee;
