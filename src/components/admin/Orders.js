import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';

import jsPDF from "jspdf";
import "jspdf-autotable";

const downloadPDF = (rows) => {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4", // A4 page size
    });

    const tableColumn = [
        "S.No",
        "Order ID",
        "Date",
        "Contact Number",
        "Product",
        "Price",
        "Photo",
        "Taken",
        "Designer Name",
        "Design",
        "Payment",
        "Print",
        "Delivery",
        "Remarks",
    ];
    const tableRows = [];

    // Prepare table rows
    rows.forEach((order, index) => {
        // Parse the date to ensure it's in a valid Date object
        const parsedDate = new Date(order.date);
        
        // Format the date in dd/mm/yyyy format
        const formattedDate = parsedDate.toLocaleDateString("en-GB"); // "en-GB" ensures dd/mm/yyyy format
    
        const rowData = [
            index + 1, // S.No
            order.orderId,
            formattedDate, // Use the formatted date here
            order.contactNumber,
            order.product,
            order.price,
            order.photo,
            order.taken,
            order.designerName || "--",
            order.design || "--",
            order.payment || "--",
            order.print || "--",
            order.delivery || "--",
            order.remarks || "--",
        ];
        tableRows.push(rowData);
    });

    // Add title
    doc.setFontSize(16);
    doc.text("Orders Report", 14, 10);

    // Add autoTable
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        theme: "grid",
        styles: {
            fontSize: 10, // Font size for table text
            cellPadding: 1, // Padding inside table cells
            halign: "center", // Center-align text in cells
            valign: "middle", // Vertically align text
        },
        columnStyles: {
            0: { cellWidth: 10 }, // Adjust width for S.No
            1: { cellWidth: 25 }, // Adjust width for Order ID
            2: { cellWidth: 20 }, // Adjust width for Date
            3: { cellWidth: 30 }, // Adjust width for Contact Number
            4: { cellWidth: 40 }, // Adjust width for Product
            // Add other columns as necessary
        },
    });

    // Save the PDF
    doc.save("orders-report.pdf");
};

function Orders() {
    const [orders, setOrders] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({ orderId: '', date: '' ,designerName:'' ,contactNumber: ''});
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const [users, setUsers] = useState([]);
    

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
            designerName:order.designerName || '',
            design: order.design || 'Pending',
            payment: order.payment || 'Pending',
            print: order.print || 'Not Printed',
            delivery: order.delivery || 'Not Delivered',
            remarks: order.remarks || '',
        };

        updateOrder(order.orderId, updatedOrder);
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


    const handleDeleteClick = async (order) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete order ${order.orderId}?`);
    
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5000/api/allorders/delete/${order.orderId}`, {
                    method: 'DELETE',
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    alert(data.message); // Show success message
                    setOrders((prev) => prev.filter((o) => o.orderId !== order.orderId)); // Remove the deleted row
                } else {
                    alert(`Error: ${data.message}`);
                }
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        }
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
            <div id="Orders">
                <h1>All Orders</h1>
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
                            name="designerName"
                            placeholder="Enter The Desiner Name"
                            value={searchCriteria.designerName}
                            onChange={(e) =>
                                setSearchCriteria({ ...searchCriteria, designerName: e.target.value })
                            }
                        />
                        <input
                            name="contactNumber"
                            placeholder="Enter The Contact Number"
                            value={searchCriteria.contactNumber}
                            onChange={(e) =>
                                setSearchCriteria({ ...searchCriteria, contactNumber: e.target.value })
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
                <table className="orders-table">
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
                                <td>
                                    <select
                                        value={order.designerName || ''}
                                        onChange={(e) =>
                                            setOrders((prev) =>
                                                prev.map((o) =>
                                                    o.orderId === order.orderId
                                                    ? { ...o, designerName: e.target.value }
                                                    : o
                                                    ))}>
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
                                <td>                                                <button
                                        onClick={() => handleUpdateClick(order)}                                   >
                                        Update
                                    </button>
                                    <button className='delete' onClick={() => handleDeleteClick(order)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <button className='download' onClick={() => downloadPDF(currentRows)}>Download</button>
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

export default Orders;
