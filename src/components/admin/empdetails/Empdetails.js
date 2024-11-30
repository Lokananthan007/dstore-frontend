import React, { useState } from 'react';
import axios from 'axios';
import '../empdetails/Empdetails.css';

function Empdetdils() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        alternateNumber: '',
        dob: '',
        email: '',
        aadharNumber: '',
        panCardNumber: '',
        dateOfJoining: '',
        designation: '',
        empId: '',
        password: '',
        address: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            zipCode: '',
        },
        bankDetails: {
            bankName: '',
            branch: '',
            accountNumber: '',
            ifscCode: '',
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('address.') || name.includes('bankDetails.')) {
            const [section, key] = name.split('.');
            setFormData((prev) => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [key]: value,
                },
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/register', formData);
            alert('Employee registered successfully!');
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Failed to register employee.');
        }
    };

    const preventScroll = (e) => e.target.blur();

    return (
        <div className="main-content">
            <div id="Empdetdils">
                <div className="row">
                    <h1>Employee Registration</h1>
                    <form onSubmit={handleSubmit}>
                        <label>First Name:</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        <label>Last Name:</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                        <label>Mobile Number:</label>
                        <input type="number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} onWheel={preventScroll} />
                        <label>Alternate Number:</label>
                        <input type="number" name="alternateNumber" value={formData.alternateNumber} onChange={handleChange} onWheel={preventScroll} />
                        <label>Date Of Birth:</label>
                        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        <label>Aadhar Number:</label>
                        <input type="number" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} onWheel={preventScroll} />
                        <label>Pan Card Number:</label>
                        <input type="number" name="panCardNumber" value={formData.panCardNumber} onChange={handleChange} onWheel={preventScroll} />
                        <label>Date Of Joining:</label>
                        <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} />
                        <label>Designation:</label>
                        <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
                        <label>Emp ID:</label>
                        <input type="text" name="empId" value={formData.empId} onChange={handleChange} />
                        <label>Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        <h1>Address</h1>
                        <input type="text" name="address.line1" placeholder="Line 1" value={formData.address.line1} onChange={handleChange} />
                        <input type="text" name="address.line2" placeholder="Line 2" value={formData.address.line2} onChange={handleChange} />
                        <input type="text" name="address.city" placeholder="City" value={formData.address.city} onChange={handleChange} />
                        <input type="text" name="address.state" placeholder="State" value={formData.address.state} onChange={handleChange} />
                        <input type="number" name="address.zipCode" placeholder="Zip Code" value={formData.address.zipCode} onChange={handleChange} onWheel={preventScroll} />
                        <h1>Bank Details</h1>
                        <label>Bank Name:</label>
                        <input type="text" name="bankDetails.bankName" value={formData.bankDetails.bankName} onChange={handleChange} />
                        <label>Branch:</label>
                        <input type="text" name="bankDetails.branch" value={formData.bankDetails.branch} onChange={handleChange} />
                        <label>Account Number:</label>
                        <input type="number" name="bankDetails.accountNumber" value={formData.bankDetails.accountNumber} onChange={handleChange} onWheel={preventScroll} />
                        <label>IFSC Code:</label>
                        <input type="text" name="bankDetails.ifscCode" value={formData.bankDetails.ifscCode} onChange={handleChange} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Empdetdils;
