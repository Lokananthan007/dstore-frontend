import React, { useEffect, useState } from 'react';
import './Orders.css';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({ orderId: '', date: '' ,designerName:''});
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
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((order, index) => (
                            <tr key={order._id}>
                                <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                <td>{order.orderId}</td>
                                <td>{formatDate(order.createdAt)}</td>
                                <td>{order.contactNumber}</td>
                                <td>{order.product}</td>
                                <td>{order.price}</td>
                                <td>{order.photo}</td>
                                <td>{order.taken}</td>
                                <td>{order.designerName}</td>
                                <td>{order.design}</td>
                                <td>{order.payment}</td>
                                <td>{order.print}</td>
                                <td>{order.delivery}</td>
                                <td>{order.remarks}</td>
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

export default Orders;
