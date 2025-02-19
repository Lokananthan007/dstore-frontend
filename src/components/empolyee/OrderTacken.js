import React, { useEffect, useState } from 'react';
import './OrderTacken.css';
import axios from 'axios';


function OrderTacken() {
    const [orders, setOrders] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({ orderId: '', date: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const [users, setUsers] = useState([]);
    const [disabledButtons, setDisabledButtons] = useState({});


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };


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


    const fetchTodayOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/allorders/takenNo');
            const data = await response.json();
            if (response.ok) {
                setOrders(data); // Assuming `setOrders` is a state setter for the orders
            } else {
                console.error('Failed to fetch orders with empty or "No" taken value:', data.message);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    
    useEffect(() => {
        fetchTodayOrders();
    }, []);
    
    const searchOrders = async (e) => {
        e.preventDefault();
        try {
            const query = new URLSearchParams(searchCriteria).toString();
            const response = await fetch(`http://localhost:5000/api/allorders/search?${query}`);
            const data = await response.json();
            if (response.ok) {
                setOrders(data);
                setCurrentPage(1); // Reset to first page after search
            } else {
                console.error('Failed to fetch search results:', data.message);
            }
        } catch (error) {
            console.error('Error searching orders:', error);
        }
    };


    const updateOrder = async (orderId, updatedOrder) => {
        try {
            const response = await fetch('http://localhost:5000/api/allorders/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, updatedOrder }),
            });

            const data = await response.json();

            if (response.ok) {
                window.alert('Order updated successfully!');
                console.log('Order updated:', data.message);
                fetchTodayOrders(); // Refresh the orders
            } else {
                console.error('Failed to update order:', data.message);
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };
    
    const handleUpdateClick = async (order) => {
        setDisabledButtons((prev) => ({ ...prev, [order.orderId]: true })); // Disable button
    
        const updatedOrder = {
            ...order,
            designerName: order.designerName || '',
            taken: order.taken || '',
        };
    
        const isSuccess = await updateOrder(order.orderId, updatedOrder);
    
        if (isSuccess) {
            // Remove the updated row from the table
            setOrders((prevOrders) => prevOrders.filter((o) => o.orderId !== order.orderId));
        } else {
            setDisabledButtons((prev) => ({ ...prev, [order.orderId]: false })); // Re-enable if update fails
        }
    };
    
    

    const handleInputChange = (index, field, value) => {
        setOrders((prevOrders) => {
            const updatedOrders = [...prevOrders];
            updatedOrders[index] = { ...updatedOrders[index], [field]: value };
            return updatedOrders;
        });
    };

    // Pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = orders.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(orders.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="main-content">
            <div id="OrdersTaken">
                <h1>Take the order</h1>
                <div className="search">
                    <h4>Search the order</h4>
                    <form onSubmit={searchOrders}>
                        <input
                            name="orderId"
                            placeholder="Enter Order ID"
                            value={searchCriteria.orderId}
                            onChange={(e) =>
                                setSearchCriteria({ ...searchCriteria, orderId: e.target.value })
                            }
                        />
                        <input
                            name="date"
                            type="date"
                            value={searchCriteria.date}
                            onChange={(e) =>
                                setSearchCriteria({ ...searchCriteria, date: e.target.value })
                            }
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <table className="orders-table me-3">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Company</th>
                            <th>Contact Number</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Photo</th>
                            <th>Taken</th>
                            <th>Designer Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
    {currentRows.length === 0 ? (
        <tr>
            <td colSpan="10"><p className="text-center">No orders to display</p></td>
        </tr>
    ) : (
        currentRows
            .map((order, index) => (
            <tr key={order._id || index}>
                <td>{indexOfFirstRow + index + 1}</td>
                <td>{order.orderId}</td>
                <td>{formatDate(order.date)}</td>
                <td style={{textTransform:'capitalize'}}>{order.company}</td>
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
                <button
        onClick={() => handleUpdateClick(order)}
        disabled={disabledButtons[order.orderId] || order.taken !== 'Yes' || !order.designerName}
        className={disabledButtons[order.orderId] ? 'disabled-button' : ''}
    >
        {disabledButtons[order.orderId] ? 'Updating...' : 'Update'}
    </button>
                </td>
            </tr>
        )))}
</tbody>
                </table>
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1} // Disable if on the first page
                    >
                        Previous
                    </button>
                    <p>Page {currentPage} of {totalPages}</p>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages} // Disable if on the last page
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderTacken;