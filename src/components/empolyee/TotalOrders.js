import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TotalOrders.css';

function TotalOrders() {
    const [orders, setOrders] = useState([]);
    const [savedOrderIds, setSavedOrderIds] = useState([]); // To track saved order IDs
    const [searchCriteria, setSearchCriteria] = useState({ orderId: '', contactNumber: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    

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
    
    
    const searchOrders = async (e) => {
        e.preventDefault();
        try {
            const query = new URLSearchParams(searchCriteria).toString();
            const response = await fetch(`http://localhost:5000/api/orders/search?${query}`);
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
            <div id="TotalOrders">
                <h1>Total Orders</h1>
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
                            name="contacNnumper"
                            placeholder='Enter the Contact Number'
                            value={searchCriteria.date}
                            onChange={(e) =>
                                setSearchCriteria({ ...searchCriteria, contactNumber: e.target.value })
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.length > 0 && currentRows.some(order => !savedOrderIds.includes(order._id)) ? (
                            currentRows.map((order, index) => (
                                !savedOrderIds.includes(order._id) && (
                                    <tr key={order._id || index}>
                                        <td>{indexOfFirstRow + index + 1}</td>
                                        <td>{order.orderId}</td>
                                        <td>{order.date}</td>
                                        <td style={{textTransform:'capitalize'}}>{order.company}</td>
                                        <td>{order.contactNumber}</td>
                                        <td>{order.product}</td>
                                        <td>{order.price}</td>
                                        <td>
                                            <select
                                                value={order.photo || ''}
                                                onChange={(e) =>
                                                    handleInputChange(index, 'photo', e.target.value)
                                                }
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleSaveRow(index)}
                                                disabled={order.photo !== 'Yes'} // Button is enabled only if photo === 'Yes'
                                            >
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

export default TotalOrders;