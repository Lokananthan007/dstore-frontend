import React, { useState } from 'react';
import axios from 'axios';
import './OrderRegister.css';

function OrderRegister() {
    // Helper function to generate Order ID
    const generateOrderId = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomLetter1 = letters[Math.floor(Math.random() * letters.length)];
        const randomLetter2 = letters[Math.floor(Math.random() * letters.length)];
        const randomNumbers = Math.floor(1000 + Math.random() * 9000);
        return `${randomLetter1}${randomLetter2}${randomNumbers}`;
    };

    // Helper function to get the current date in YYYY-MM-DD format
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Initial state for form
    const initialState = {
        orderId: generateOrderId(),
        date: getCurrentDate(),
        contactNumber: '',
        product: '',
        price: '',
        photo: '',
    };

    const [formData, setFormData] = useState(initialState);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Post data to backend
            const response = await axios.post('http://localhost:5000/api/orders/save', formData);
            alert('Order registered successfully!');
            console.log(response.data);

            // Reset the form to initial state
            setFormData(initialState);
        } catch (error) {
            console.error('Error saving order:', error);
            alert('Failed to save order. Please try again.');
        }
    };

    return (
        <div className="main-content">
            <div id="OrderRegister">
                <div className="form-card">
                    <h1 className="form-title">Order Register Form</h1>
                    <form onSubmit={handleSubmit}>
                        <table className="form-table">
                            <tbody>
                                <tr>
                                    <td><label>Order ID</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="orderId"
                                            value={formData.orderId}
                                            readOnly
                                            className="form-control"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Date</label></td>
                                    <td>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Contact Number</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="contactNumber"
                                            placeholder="Enter contact number"
                                            value={formData.contactNumber}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Product</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="product"
                                            placeholder="Enter product name"
                                            value={formData.product}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Price</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="price"
                                            placeholder="Enter price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Photo</label></td>
                                    <td>
                                        <select
                                            name="photo"
                                            value={formData.photo}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            required
                                        >
                                            <option value="" disabled>Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="text-center">
                                        <button type="submit" className="btn">
                                            Submit
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OrderRegister;
