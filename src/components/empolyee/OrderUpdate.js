import React, { useEffect, useState } from 'react';
import './OrderUpdate.css';

function OrderUpdate() {
    const [orders, setOrders] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({ orderId: '', date: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const fetchTodayOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/allorders/get-today');
            const data = await response.json();
            if (response.ok) {
                setOrders(data);
            } else {
                console.error('Failed to fetch today\'s orders:', data.message);
            }
        } catch (error) {
            console.error('Error fetching today\'s orders:', error);
        }
    };

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

    useEffect(() => {
        fetchTodayOrders();
    }, []);

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

    const handleUpdateClick = (order) => {
        const updatedOrder = {
            ...order,
            design: order.design || 'Pending',
            payment: order.payment || 'Pending',
            print: order.print || 'Not Printed',
            delivery: order.delivery || 'Not Delivered',
            remarks: order.remarks || '',
        };

        updateOrder(order.orderId, updatedOrder);
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
            <div id="TotalUpdateOrders">
                <h1>Update Orders</h1>
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
                <table className="orders-update-table me-3">
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
                        {currentRows.map((order, index) => (
                            <tr key={order._id || index}>
                                <td>{indexOfFirstRow + index + 1}</td>
                                <td>{order.orderId}</td>
                                <td>{formatDate(order.date)}</td>
                                <td>{order.contactNumber}</td>
                                <td>{order.product}</td>
                                <td>{order.price}</td>
                                <td>{order.photo}</td>
                                <td>{order.taken}</td>
                                <td>{order.designerName}</td>
                                <td>
                                    <select
                                        value={order.design || ''}
                                        onChange={(e) =>
                                            setOrders((prev) =>
                                                prev.map((o) =>
                                                    o.orderId === order.orderId
                                                        ? { ...o, design: e.target.value }
                                                        : o
                                                )
                                            )
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
                                            setOrders((prev) =>
                                                prev.map((o) =>
                                                    o.orderId === order.orderId
                                                        ? { ...o, payment: e.target.value }
                                                        : o
                                                )
                                            )
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
                                            setOrders((prev) =>
                                                prev.map((o) =>
                                                    o.orderId === order.orderId
                                                        ? { ...o, print: e.target.value }
                                                        : o
                                                )
                                            )
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
                                            setOrders((prev) =>
                                                prev.map((o) =>
                                                    o.orderId === order.orderId
                                                        ? { ...o, delivery: e.target.value }
                                                        : o
                                                )
                                            )
                                        }
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Not Delivered">Not Delivered</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        id='remarks'
                                        type="text"
                                        placeholder="Remarks"
                                        value={order.remarks || ''}
                                        onChange={(e) =>
                                            setOrders((prev) =>
                                                prev.map((o) =>
                                                    o.orderId === order.orderId
                                                        ? { ...o, remarks: e.target.value }
                                                        : o
                                                )
                                            )
                                        }
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleUpdateClick(order)}
                                        disabled={!order.taken || !order.designerName}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
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

export default OrderUpdate;
