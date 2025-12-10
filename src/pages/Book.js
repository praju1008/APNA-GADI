import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Book.css'; // Import the CSS file

const Book = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false); // State for receipt modal
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    pickup_date: '',
    drop_date: '',
    pickup_time: '',
    drop_time: '',
    pickup_location: '',
    drop_location: '',
    total_cost: 0, // Default to 0
    document: null,
  });

  const [receiptData, setReceiptData] = useState(null); // State to store receipt details

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/vehicles');
        setVehicles(res.data);
      } catch (err) {
        console.error('Error fetching vehicles:', err);
      }
    };

    fetchVehicles();
  }, []);

  const handleShow = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedVehicle(null);
    setFormData({
      name: '',
      mobile: '',
      pickup_date: '',
      drop_date: '',
      pickup_time: '',
      drop_time: '',
      pickup_location: '',
      drop_location: '',
      total_cost: 0,
      document: null,
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: files ? files[0] : value,
      };

      // Recalculate total cost if pickup/drop date or time changes
      if (
        name === 'pickup_date' ||
        name === 'drop_date' ||
        name === 'pickup_time' ||
        name === 'drop_time'
      ) {
        updatedFormData.total_cost = calculateTotalCost(
          updatedFormData.pickup_date,
          updatedFormData.drop_date,
          updatedFormData.pickup_time,
          updatedFormData.drop_time,
          selectedVehicle?.rent_amount
        );
      }

      return updatedFormData;
    });
  };

  const calculateTotalCost = (pickupDate, dropDate, pickupTime, dropTime, rentAmount) => {
    if (!pickupDate || !dropDate || !pickupTime || !dropTime || !rentAmount) {
      return 0;
    }

    const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
    const dropDateTime = new Date(`${dropDate}T${dropTime}`);

    if (pickupDateTime >= dropDateTime) {
      alert('Drop date and time must be after pickup date and time.');
      return 0;
    }

    const durationInHours = Math.abs(dropDateTime - pickupDateTime) / (1000 * 60 * 60); // Convert milliseconds to hours
    return Math.ceil(durationInHours) * rentAmount; // Round up to the nearest hour
  };

  const handleBooking = async () => {
    const { pickup_date, drop_date, pickup_time, drop_time } = formData;

    // Validate pickup and drop date/time
    const pickupDateTime = new Date(`${pickup_date}T${pickup_time}`);
    const dropDateTime = new Date(`${drop_date}T${drop_time}`);

    if (!pickup_date || !drop_date || !pickup_time || !drop_time) {
      alert('Please fill in all date and time fields.');
      return;
    }

    if (pickupDateTime >= dropDateTime) {
      alert('Drop date and time must be after pickup date and time.');
      return;
    }
    if (!document) {
  alert("Please upload a valid ID document (Aadhaar card or Government Verified ID).");
  return;
}
    

    try {
      const data = new FormData();
      data.append('vehicle_id', selectedVehicle.vehicle_id);
      data.append('vehicle_type', selectedVehicle.vehicle_type);
      data.append('vehicle_name', selectedVehicle.name);
      data.append('vehicle_company', selectedVehicle.company);
      data.append('vehicle_model', selectedVehicle.model);
      data.append('vehicle_number', selectedVehicle.vehicle_number);

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const res = await axios.post('http://localhost:5000/bookvehicle', data);
      alert(res.data.message);

      // Set receipt data and show receipt modal
      setReceiptData({
        name: formData.name,
        mobile: formData.mobile,
        vehicle: selectedVehicle.name,
        pickup_date: formData.pickup_date,
        drop_date: formData.drop_date,
        pickup_time: formData.pickup_time,
        drop_time: formData.drop_time,
        total_cost: formData.total_cost,
      });
      setShowReceipt(true);

      handleClose();
    } catch (err) {
      console.error('Booking error:', err);
      alert('Failed to book vehicle');
    }
  };

  const handleReceiptClose = () => {
    setShowReceipt(false);
    setReceiptData(null);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Book Your Ride</h2>
      <Row>
        {vehicles.map((vehicle) => (
          <Col key={vehicle.vehicle_id} xs={12} sm={6} md={4} className="mb-4">
            <Card className="h-100 shadow">
              <Card.Img
                variant="top"
                src={`http://localhost:5000/uploads/${vehicle.images.split(',')[0]}`}
                alt={vehicle.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>
                  {vehicle.name} ({vehicle.model})
                </Card.Title>
                <Card.Text>
                  <strong>Type:</strong> {vehicle.vehicle_type}
                  <br />
                  <strong>Battery:</strong> {vehicle.battery_capacity} kWh
                  <br />
                  <strong>Rent:</strong> ₹{vehicle.rent_amount}/hour
                </Card.Text>
                <Button variant="primary" onClick={() => handleShow(vehicle)}>
                  Book
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Booking Modal */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Book {selectedVehicle?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <Form>
            <Form.Group>
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                onKeyPress={(e) => {
                  if (!/^\d$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                required
                pattern="^\d{10}$"
                title="Please enter a valid 10-digit mobile number"
                maxLength="10"
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Pickup Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="pickup_date"
                    value={formData.pickup_date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Drop Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="drop_date"
                    value={formData.drop_date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Pickup Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="pickup_time"
                    value={formData.pickup_time}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Drop Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="drop_time"
                    value={formData.drop_time}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Pickup Location</Form.Label>
              <Form.Control
                type="text"
                name="pickup_location"
                value={formData.pickup_location}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Drop Location</Form.Label>
              <Form.Control
                type="text"
                name="drop_location"
                value={formData.drop_location}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Total Cost</Form.Label>
              <Form.Control
                type="number"
                name="total_cost"
                value={formData.total_cost}
                readOnly
              />
            </Form.Group>
           <Form.Group>
  <Form.Label>Upload ID Document</Form.Label>
  <Form.Control
    type="file"
    name="document"
    onChange={handleChange}
    accept=".jpg,.jpeg,.png,.pdf"
    required  // This makes the file upload mandatory
  />
</Form.Group>


          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleBooking}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Receipt Modal */}
      <Modal show={showReceipt} onHide={handleReceiptClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Booking Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {receiptData && (
            <div>
              <p><strong>Name:</strong> {receiptData.name}</p>
              <p><strong>Mobile:</strong> {receiptData.mobile}</p>
              <p><strong>Vehicle:</strong> {receiptData.vehicle}</p>
              <p><strong>Pickup Date:</strong> {receiptData.pickup_date}</p>
              <p><strong>Drop Date:</strong> {receiptData.drop_date}</p>
              <p><strong>Pickup Time:</strong> {formatTime(receiptData.pickup_time)}</p>
              <p><strong>Drop Time:</strong> {formatTime(receiptData.drop_time)}</p>
              <p><strong>Total Cost:</strong> ₹{receiptData.total_cost}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleReceiptClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Book;
