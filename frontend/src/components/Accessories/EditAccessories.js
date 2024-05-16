import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextInput, Textarea, Label } from "flowbite-react";

const EditAccessories = () => {
  const { id } = useParams();
  const [accessory, setAccessory] = useState({
    AccessoriesID: "",
    AccessoriesName: "",
    Category: "",
    Quantity: "",
    Price_per_unit: "",
    Description: "",
  });

  useEffect(() => {
    // Fetch accessory details based on the provided ID
    fetch(`http://localhost:5000/api/accessories/getAccessoryById${id}`)
      .then((res) => res.json())
      .then((data) => setAccessory(data))
      .catch((error) =>
        console.error("Error fetching accessory details:", error)
      );
  }, [id]);

  const handleAccessoriesUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const updateAccessoriesObj = {
      AccessoriesID: form.AccessoriesID.value,
      AccessoriesName: form.AccessoriesName.value,
      Category: form.Category.value,
      Quantity: form.Quantity.value,
      Price_per_unit: form.Price_per_unit.value,
      Description: form.Description.value,
    };

    // Add validation for Quantity
    if (
      !updateAccessoriesObj.Quantity ||
      isNaN(updateAccessoriesObj.Quantity) ||
      updateAccessoriesObj.Quantity < 0 ||
      !Number.isInteger(parseFloat(updateAccessoriesObj.Quantity))
    ) {
      alert("Quantity must be a positive integer");
      return;
    }

    // Add validation for Price Per Unit
    if (
      !updateAccessoriesObj.Price_per_unit ||
      isNaN(updateAccessoriesObj.Price_per_unit) ||
      updateAccessoriesObj.Price_per_unit < 0
    ) {
      alert("Price Per Unit must be a positive number");
      return;
    }

    // Update accessories data
    fetch(`http://localhost:5000/api/accessories/updateAccessory${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateAccessoriesObj),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Accessories Updated Successfully");
      })
      .catch((error) => console.error("Error updating accessory:", error));
  };

  return (
    <div
      style={{
        padding: "10px",
        margin: "20px auto",
        maxWidth: "800px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          fontSize: "28px",
          textAlign: "center",
        }}
      >
        Update Accessories
      </h2>
      <form onSubmit={handleAccessoriesUpdate}>
        <div style={{ marginBottom: "20px" }}>
          <Label htmlFor="AccessoriesID" value="Accessories ID" />
          <TextInput
            id="AccessoriesID"
            name="AccessoriesID"
            type="text"
            placeholder="Enter Accessories ID"
            required
            defaultValue={accessory.AccessoriesID}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              pointerEvents: "none",
              backgroundColor: "#f2f2f2",
            }}
            readOnly
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Label htmlFor="AccessoriesName" value="Accessories Name" />
          <TextInput
            id="AccessoriesName"
            name="AccessoriesName"
            type="text"
            defaultValue={accessory.AccessoriesName}
            placeholder="Enter Accessories Name"
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Label htmlFor="Category" value="Category" />
          <select
            id="Category"
            name="Category"
            defaultValue={accessory.Category}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="Computer Accessories">Computer Accessories</option>
            <option value="Laptop Accessories">Laptop Accessories</option>
            <option value="CCTV Accessories">CCTV Accessories</option>
          </select>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Label htmlFor="Quantity" value="Quantity" />
          <TextInput
            id="Quantity"
            name="Quantity"
            type="number"
            defaultValue={accessory.Quantity}
            placeholder="Enter Quantity"
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            min="1"
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Label htmlFor="Price_per_unit" value="Price_per_unit" />
          <TextInput
            id="Price_per_unit"
            name="Price_per_unit"
            type="number"
            defaultValue={accessory.Price_per_unit}
            placeholder="Enter Price Per Unit"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            min="0"
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Label htmlFor="Description" value="Description" />
          <Textarea
            id="Description"
            name="Description"
            type="text"
            defaultValue={accessory.Description}
            placeholder="Enter Description"
            required
            rows={5}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
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
            display: "block",
            margin: "0 auto",
          }}
        >
          Update Accessories
        </button>
      </form>
    </div>
  );
};

export default EditAccessories;