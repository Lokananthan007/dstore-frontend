import React from 'react';
import '../admin/Admindashboard.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2'; // Import Bar
import {
  Chart as ChartJS,
  ArcElement,
  BarElement, // Import BarElement
  CategoryScale, // For Bar chart's X-axis
  LinearScale, // For Y-axis
  Tooltip,
  Legend
} from 'chart.js';

// Register chart components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Pie Chart Data
const pieData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  datasets: [
    {
      label: 'Color Distribution',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
      borderWidth: 1,
    },
  ],
};

// Bar Chart Data
const barData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Monthly Sales',
      data: [65, 59, 80, 81, 56],
      backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

function Admindashboard() {
  return (
    <div className="main-content">
      <Container className="mt-5">
        <Row>
          <Col>
            <Card>
              <Card.Header>Pie Chart Example</Card.Header>
              <Card.Body>
                <Pie data={pieData} />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header>Bar Chart Example</Card.Header>
              <Card.Body>
                <Bar data={barData} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Admindashboard;
