import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TotalOrders.css';

function TotalOrders() {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [savedOrderIds, setSavedOrderIds] = useState([]); // To track saved order IDs

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders/get');
                const fetchedOrders = response.data.filter(order => !order.saved);
                setOrders(fetchedOrders);

                // Fetch the saved orders from the backend
                const savedOrdersResponse = await axios.get('http://localhost:5000/api/allorders/get');
                setSavedOrderIds(savedOrdersResponse.data.map(order => order._id)); // Assuming _id is the identifier
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleInputChange = (index, field, value) => {
        const updatedOrders = [...orders];
        updatedOrders[index][field] = value;
        setOrders(updatedOrders);
    };

    const handleSaveRow = async (index) => {
        try {
            const order = orders[index];
            const response = await axios.post('http://localhost:5000/api/allorders/save-one', {
                order,
            });

            alert(response.data.message);

            // Update the saved order IDs
            setSavedOrderIds([...savedOrderIds, order._id]);

            // Hide the saved row by removing it from the orders array
            setOrders(orders.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error saving order:', error);
            alert('Failed to save the order.');
        }
    };

    return (
        <div className="main-content">
            <div id="TotalOrders">
                <h1>Total Orders</h1>
                <table className="orders-table me-3">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Contact Number</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Photo</th>
                            <th>Taken</th>
                            <th>Designer Name</th>
                            <th>Design</th>
                            <th>Payment</th>
                            <th>Print</th>
                            <th>Delivery</th>
                            <th>Remarks</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 && orders.some(order => !savedOrderIds.includes(order._id)) ? (
                            orders.map((order, index) => (
                                !savedOrderIds.includes(order._id) && (
                                    <tr key={order._id || index}>
                                        <td>{index + 1}</td>
                                        <td>{order.orderId}</td>
                                        <td>{order.date}</td>
                                        <td>{order.contactNumber}</td>
                                        <td>{order.product}</td>
                                        <td>{order.price}</td>
                                        <td>{order.photo}</td>
                                        <td>
                                            <select
                                                value={order.taken || ''}
                                                onChange={(e) =>
                                                    handleInputChange(index, 'taken', e.target.value)
                                                }
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={order.designerName || ''}
                                                onChange={(e) =>
                                                    handleInputChange(index, 'designerName', e.target.value)
                                                }
                                            >
                                                <option value="" disabled>Select Designer</option>
                                                {users.map(user => (
                                                    <option key={user._id} value={user.username}>
                                                        {user.username}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={order.design || ''}
                                                onChange={(e) =>
                                                    handleInputChange(index, 'design', e.target.value)
                                                }
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Pending">Pending</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={order.payment || ''}
                                                onChange={(e) =>
                                                    handleInputChange(index, 'payment', e.target.value)
                                                }
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Pending">Pending</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={order.print || ''}
                                                onChange={(e) =>
                                                    handleInputChange(index, 'print', e.target.value)
                                                }
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="Printed">Printed</option>
                                                <option value="Not Printed">Not Printed</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={order.delivery || ''}
                                                onChange={(e) =>
                                                    handleInputChange(index, 'delivery', e.target.value)
                                                }
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Not Delivered">Not Delivered</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                placeholder="Remarks"
                                                value={order.remarks || ''}
                                                onChange={(e) =>
                                                    handleInputChange(index, 'remarks', e.target.value)
                                                }
                                            />
                                        </td>
                                        <td>
                                            <button onClick={() => handleSaveRow(index)}
                                                disabled={!order.taken || !order.designerName}>
                                                Save
                                            </button>
                                        </td>
                                    </tr>
                                )
                            ))
                        ) : (
                            <tr>
                                <td colSpan="15" className="text-center">
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TotalOrders;
