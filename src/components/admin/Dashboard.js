import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUsers ,FaShoppingCart ,FaRupeeSign } from "react-icons/fa";
import './Dashboard.css';
import Employee from './Employee';
// import Footer from '../footer/Footer';

function Dashboard() {
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalAdmin, setTotalAdmin] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [deliveredOrders, setDeliveredOrders] = useState(0);
    const [stats, setStats] = useState({
        totalPayments: 0,
        pendingPayments: 0,
    });

    useEffect(() => {
        // Fetch total employees
        const fetchTotalEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/total-employees');
                setTotalEmployees(response.data.totalEmployees);
            } catch (error) {
                console.error("Error fetching total employees:", error);
            }
        };

        fetchTotalEmployees();
    }, []);

    useEffect(() => {
        const fetchTotalAdmin = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/total-admin');
                setTotalAdmin(response.data.totalAdmin); // Update state with fetched value
            } catch (error) {
                console.error("Error fetching total admins:", error);
            }
        };

        fetchTotalAdmin();
    }, []);


    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/allorders/stats"); // Adjust API endpoint if needed
                setStats({
                    totalPayments: response.data.totalPayments,
                    pendingPayments: response.data.pendingPayments,
                });
                setTotalOrders(response.data.totalOrders); // Set total orders
                setDeliveredOrders(response.data.deliveredOrders); // Set delivered orders
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);
    


    return (
        <div className="main-content">
            <div className="dashboard-container">
                <div className="dashboard-row">
                    {/* Total Employees */}
                    <div className="dashboard-card bg-c-blue">
                        <h6 className="card-title">Total Employees</h6>
                        <h2 className="card-data">
                            <FaUsers className="card-icon" />
                            <span>{totalEmployees}</span>
                        </h2>
                        <p className="card-footer">
                        Total Admin <span className="right">{totalAdmin}</span>
                        </p>
                    </div>

                    {/* Total Orders */}
                    <div className="dashboard-card bg-c-green">
                        <h6 className="card-title">Total Orders</h6>
                        <h2 className="card-data">
                            <FaShoppingCart  className="card-icon" />
                            <span>{totalOrders}</span>
                        </h2>
                        <p className="card-footer">
                            Delivered Orders <span className="right">{deliveredOrders}</span>
                        </p>
                    </div>

                    {/* Total Payments */}
                    <div className="dashboard-card bg-c-yellow">
                        <h6 className="card-title">Total Payments</h6>
                        <h2 className="card-data">
                            <FaRupeeSign  className="card-icon" />
                            <span>{stats.totalPayments.toLocaleString()}</span>
                        </h2>
                        <p className="card-footer">
                            Pending Payments <span className="right"><FaRupeeSign/>{stats.pendingPayments.toLocaleString()}</span>
                        </p>
                    </div>
                </div>
            </div>
            <Employee/>
            {/* <Footer/> */}
        </div>
    );
}

export default Dashboard;
