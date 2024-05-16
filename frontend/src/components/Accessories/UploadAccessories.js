import React, { useState, useEffect } from "react";
import { Label, TextInput, Textarea } from "flowbite-react";

const UploadAccessories = () => {
  const category = [
    "Computer Accessories",
    "Laptop Accessories",
    "CCTV Accessories",
  ];
  const [selectedCategory, setSelectedCategory] = useState(category[0]);
  const [errors, setErrors] = useState({});
  const [allAccessories, setAllAccessories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/accessories/getAllAccessories")
      .then((res) => res.json())
      .then((data) => setAllAccessories(data))
      .catch((error) => console.error("Error fetching accessories:", error));
  }, []);

  const handleChangeSelectedValue = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAccessoriesSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const accessoriesObj = {
      AccessoriesID: form.AccessoriesID.value,
      AccessoriesName: form.AccessoriesName.value,
      Category: form.Category.value,
      Quantity: form.Quantity.value,
      Price_per_unit: form.Price_per_unit.value,
      Description: form.Description.value,
    };

    // Check if Accessories ID already exists
    const existingAccessory = allAccessories.find(
      (accessory) => accessory.AccessoriesID === accessoriesObj.AccessoriesID
    );

    const newErrors = {};
    if (existingAccessory) {
      newErrors.AccessoriesID = "Accessories ID already exists";
    }
    if (!accessoriesObj.AccessoriesID) {
      newErrors.AccessoriesID = "Accessories ID is required";
    }
    if (!accessoriesObj.AccessoriesName) {
      newErrors.AccessoriesName = "Accessories Name is required";
    }
    if (!accessoriesObj.Category) {
      newErrors.Category = "Category is required";
    }
    if (
      !accessoriesObj.Quantity ||
      isNaN(accessoriesObj.Quantity) ||
      accessoriesObj.Quantity < 0 ||
      !Number.isInteger(parseFloat(accessoriesObj.Quantity))
    ) {
      newErrors.Quantity = "Quantity must be a positive integer";
    }
    if (
      !accessoriesObj.Price_per_unit ||
      isNaN(accessoriesObj.Price_per_unit) ||
      accessoriesObj.Price_per_unit < 0
    ) {
      newErrors.Price_per_unit = "Price Per Unit must be a positive number";
    }

    if (!accessoriesObj.Description) {
      newErrors.Description = "Description is required";
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/accessories/createAccessory",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(accessoriesObj),
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to upload accessories. Please try again later."
          );
        }

        alert("Accessories Uploaded Successfully");
        form.reset();
      } catch (error) {
        console.error("Error during fetch:", error);
        alert(error.message);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h2 style={{ margin: "0 0 20px", fontSize: "28px" }}>
        Upload Accessories
      </h2>
      <form onSubmit={handleAccessoriesSubmit} style={{ textAlign: "left" }}>
        <div style={{ marginBottom: "20px" }}>
          <Label htmlFor="AccessoriesID" value="Accessories ID*" />
          <TextInput
            id="AccessoriesID"
            name="AccessoriesID"
            type="text"
            placeholder="Enter Accessories ID"
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              borderColor: errors.AccessoriesID ? "red" : "",
            }}
          />
          {errors.AccessoriesID && (
            <p style={{ color: "red" }}>{errors.AccessoriesID}</p>
          )}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Label htmlFor="AccessoriesName" value="Accessories Name*" />
          <TextInput
            id="AccessoriesName"
            name="AccessoriesName"
            type="text"
            placeholder="Enter Accessories Name"
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              borderColor: errors.AccessoriesName ? "red" : "",
            }}
          />
          {errors.AccessoriesName && (
            <p style={{ color: "red" }}>{errors.AccessoriesName}</p>
          )}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Label htmlFor="Category" value="Category*" />
          <select
            id="Category"
            name="Category"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              borderColor: errors.Category ? "red" : "",
            }}
            value={selectedCategory}
            onChange={handleChangeSelectedValue}
          >
            {category.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.Category && <p style={{ color: "red" }}>{errors.Category}</p>}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Label htmlFor="Quantity" value="Quantity*" />
          <TextInput
            id="Quantity"
            name="Quantity"
            type="text"
            placeholder="Enter Quantity"
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              borderColor: errors.Quantity ? "red" : "",
            }}
          />
          {errors.Quantity && <p style={{ color: "red" }}>{errors.Quantity}</p>}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Label htmlFor="Price_per_unit" value="Price Per Unit*" />
          <TextInput
            id="Price_per_unit"
            name="Price_per_unit"
            type="text"
            placeholder="Enter Price Per Unit"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              borderColor: errors.Price_per_unit ? "red" : "",
            }}
          />
          {errors.Price_per_unit && (
            <p style={{ color: "red" }}>{errors.Price_per_unit}</p>
          )}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Label htmlFor="Description" value="Description*" />
          <Textarea
            id="Description"
            name="Description"
            type="text"
            placeholder="Enter Description"
            required
            rows={5}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              borderColor: errors.Description ? "red" : "",
            }}
          />
          {errors.Description && (
            <p style={{ color: "red" }}>{errors.Description}</p>
          )}
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            fontSize: "18px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Upload Accessories
        </button>
      </form>
    </div>
  );
};

export default UploadAccessories;