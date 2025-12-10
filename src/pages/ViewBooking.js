import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import moment from 'moment';
import './ViewBooking.css'; // Custom styling

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/bookings')
      .then(res => {
        console.log('Bookings:', res.data); // Debugging
        setBookings(res.data);
      })
      .catch(err => console.error("Error loading bookings", err));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter bookings by vehicle number, booked by (name), or mobile number
  const filteredBookings = bookings.filter((booking) => {
    return (
      booking.vehicle_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.mobile.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Container className="view-booking-container mt-5">
      <h2 className="view-booking-title">All Bookings</h2>
      
      {/* Search input */}
      <div className="search-container mb-4">
        <Form.Control
          type="text"
          placeholder="Search by Vehicle No, Booked By, or Mobile"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <Row>
        {filteredBookings.length === 0 ? (
          <p className="no-booking-text">No bookings match your search.</p>
        ) : (
          filteredBookings.map((booking, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-4">
              <Card className="booking-card h-100 shadow">
                <Card.Body>
                  <Card.Title className="booking-card-title">
                    {booking.vehicle_name} ({booking.vehicle_type})
                  </Card.Title>
                  <Card.Text className="booking-card-text">
                    <strong>Model:</strong> {booking.vehicle_model}<br />
                    <strong>Company:</strong> {booking.vehicle_company}<br />
                    <strong>Vehicle No:</strong> {booking.vehicle_number}<br />
                    <strong>Booked By:</strong> {booking.name}<br />
                    <strong>Mobile:</strong> {booking.mobile}<br />
                    <strong>Pickup Date:</strong>{' '}
                    {moment(booking.pickup_date).format('DD/MM/YYYY')}<br />
                    <strong>Drop Date:</strong>{' '}
                    {moment(booking.drop_date).format('DD/MM/YYYY')}<br />
                    <strong>Pickup Time:</strong> {booking.pickup_time}<br />
                    <strong>Drop Time:</strong> {booking.drop_time}<br />
                    <strong>Pickup Location:</strong> {booking.pickup_location}<br />
                    <strong>Drop Location:</strong> {booking.drop_location}<br />
                    <strong>Total Cost:</strong> ₹{booking.total_cost}<br />
                    {booking.document && (
                      <>
                        <strong>Document:</strong>{' '}
                        <a
                          href={`http://localhost:5000/uploads/docs/${booking.document}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="download-link"
                        >
                          Download
                        </a>
                        <br />
                      </>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default ViewBooking;
