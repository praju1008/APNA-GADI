import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Typography,
  MenuItem,
  Button,
  InputLabel,
  Select,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";
import "./AddVehicle.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AddVehicle = () => {
  const [vehicleData, setVehicleData] = useState({
    type: "",
    name: "",
    company: "",
    model: "",
    batteryCapacity: "",
    number: "",
    rentAmount: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [editId, setEditId] = useState(null); // Track the vehicle being edited
  const topRef = useRef(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/vehicles");
      setVehicles(res.data);
    } catch (err) {
      console.error("Failed to fetch vehicles:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const handleRemoveNewImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(vehicleData).forEach((key) => {
      if (vehicleData[key]) formData.append(key, vehicleData[key]);
    });
    imageFiles.forEach((file) => formData.append("images", file));

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/updatevehicle/${editId}`, formData);
        alert("Vehicle updated successfully!");
      } else {
        await axios.post("http://localhost:5000/addvehicle", formData);
        alert("Vehicle added successfully!");
      }

      setVehicleData({
        type: "",
        name: "",
        company: "",
        model: "",
        batteryCapacity: "",
        number: "",
        rentAmount: "",
      });
      setImageFiles([]);
      setImagePreviews([]);
      setEditId(null);
      fetchVehicles();
    } catch (error) {
      console.error("Error submitting vehicle:", error);
      alert("Error submitting vehicle");
    }
  };

  const handleEdit = (vehicle) => {
    setEditId(vehicle.vehicle_id);
    setVehicleData({
      type: vehicle.vehicle_type,
      name: vehicle.name,
      company: vehicle.company,
      model: vehicle.model,
      batteryCapacity: vehicle.battery_capacity,
      number: vehicle.number,
      rentAmount: vehicle.rent_amount,
    });
    setImagePreviews(vehicle.images.split(",").map((img) => `http://localhost:5000/uploads/${img}`));
    window.scrollTo({ top: topRef.current.offsetTop, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await axios.delete(`http://localhost:5000/deletevehicle/${id}`);
        alert("Vehicle deleted successfully!");
        fetchVehicles();
      } catch (err) {
        console.error("Error deleting vehicle:", err);
        alert("Failed to delete vehicle");
      }
    }
  };

  return (
    <div ref={topRef} className="container">
      {/* Add Vehicle Section */}
      <div className="form-container">
        <Typography variant="h5" className="form-title">
          {editId ? "Edit Vehicle Details" : "Add Vehicle Details"}
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-row">
            <div className="form-field">
              <FormControl fullWidth required>
                <InputLabel>Type of Vehicle</InputLabel>
                <Select
                  name="type"
                  value={vehicleData.type}
                  label="Type of Vehicle"
                  onChange={handleChange}
                >
                  <MenuItem value="Bike">Bike</MenuItem>
                  <MenuItem value="Car">Car</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="form-field">
              <TextField
                label="Name of Vehicle"
                name="name"
                fullWidth
                required
                value={vehicleData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <TextField
                label="Company"
                name="company"
                fullWidth
                required
                value={vehicleData.company}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <TextField
                label="Model"
                name="model"
                fullWidth
                required
                value={vehicleData.model}
                onChange={handleChange}
              />
            </div>

          <div className="form-field">
  <TextField
    type="number"
    inputProps={{ min: 0, step: "any" }}
    label="Battery Capacity (kWh)"
    name="batteryCapacity"
    fullWidth
    required
    value={vehicleData.batteryCapacity}
    onChange={handleChange}
    onKeyDown={(e) => {
      // Allow: Backspace, Tab, Delete, arrows, dot, numbers
      const allowedKeys = [
        "Backspace",
        "Tab",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Home",
        "End",
        "."
      ];

      const isNumber = e.key >= "0" && e.key <= "9";

      if (!isNumber && !allowedKeys.includes(e.key)) {
        e.preventDefault(); // block any other input
      }

      // Prevent starting with a dot
      if (e.key === "." && e.target.value === "") {
        e.preventDefault();
      }

      // Prevent more than one dot
      if (e.key === "." && e.target.value.includes(".")) {
        e.preventDefault();
      }
    }}
  />
</div>



            <div className="form-field">
              <TextField
                label="Vehicle Number"
                name="number"
                fullWidth
                required
                value={vehicleData.number}
                onChange={handleChange}
              />
            </div>

           <div className="form-field">
  <TextField
    label="Rent Amount (₹)"
    name="rentAmount"
    fullWidth
    required
    value={vehicleData.rentAmount}
    onChange={handleChange}
    onKeyDown={(e) => {
      // Allow: Backspace, Tab, Delete, arrows, dot, numbers
      const allowedKeys = [
        "Backspace",
        "Tab",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Home",
        "End",
        "."
      ];

      const isNumber = e.key >= "0" && e.key <= "9";

      if (!isNumber && !allowedKeys.includes(e.key)) {
        e.preventDefault(); // block any other input
      }

      // Prevent starting with a dot
      if (e.key === "." && e.target.value === "") {
        e.preventDefault();
      }

      // Prevent more than one dot
      if (e.key === "." && e.target.value.includes(".")) {
        e.preventDefault();
      }
    }}
  />
</div>


            {/* Upload Images */}
            <div className="form-field">
             <Button
  variant="contained"
  component="label"
  style={{
    backgroundColor: "black",
    color: "white",
    transition: "all 0.3s ease-in-out",
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "yellow";
    e.target.style.color = "black";
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "black";
    e.target.style.color = "white";
  }}
>
  Upload Images
  <input
    type="file"
    hidden
    accept="image/*"
    multiple
    onChange={handleImageChange}
  />
</Button>

            </div>

            {/* Image Previews */}
            <div className="image-preview-container">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="image-preview">
                  <img src={preview} alt={`Preview ${index}`} className="preview-image" />
                  <button
                    className="delete-preview-button"
                    onClick={() => handleRemoveNewImage(index)}
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
           <Button
  type="submit"
  variant="contained"
  className="add-vehicle-button"
  style={{
    backgroundColor: "black", 
    color: "white",
    transition: "all 0.3s ease-in-out",
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "yellow";
    e.target.style.color = "black";
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "black";
    e.target.style.color = "white";
  }}
>
  {editId ? "Update Vehicle" : "Add Vehicle"}
</Button>

          </div>
        </form>
      </div>

      {/* Vehicle List Section */}
      <div className="vehicle-table">
        <Typography variant="h6" className="table-title">
          Vehicle List
        </Typography>
        <div className="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Battery Capacity</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Rent Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.vehicle_id}>
                  <TableCell>{vehicle.vehicle_type}</TableCell>
                  <TableCell>{vehicle.name}</TableCell>
                  <TableCell>{vehicle.company}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.battery_capacity}</TableCell>
                  <TableCell>{vehicle.number}</TableCell>
                  <TableCell>₹{vehicle.rent_amount}</TableCell>
                  <TableCell>
                    <EditIcon
                      style={{ color: "black", cursor: "pointer", marginRight: "10px" }}
                      onClick={() => handleEdit(vehicle)}
                    />
                    <DeleteIcon
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleDelete(vehicle.vehicle_id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
