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
    fetch(`http://localhost:8000/accessories/${id}`)
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

    // Update accessories data
    fetch(`http://localhost:8000/accessories/${id}`, {
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
    <div className="py-10 my-12">
      <h2 className="mb-8 text-3xl font-bold">Update Accessories</h2>
      <form
        onSubmit={handleAccessoriesUpdate}
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
      >
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="AccessoriesID" value="Accessories ID" />
            </div>
            <TextInput
              id="AccessoriesID"
              name="AccessoriesID"
              type="text"
              placeholder="Enter Accessories ID"
              required
              defaultValue={accessory.AccessoriesID}
              className="w-full border border-gray-300 rounded-md focus:border-black"
            />
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="AccessoriesName" value="Accessories Name" />
            </div>
            <TextInput
              id="AccessoriesName"
              name="AccessoriesName"
              type="text"
              defaultValue={accessory.AccessoriesName}
              placeholder="Enter Accessories Name"
              required
              className="w-full border border-gray-300 rounded-md focus:border-black"
            />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="Category" value="Category" />
            </div>
            <select
              id="Category"
              name="Category"
              className="w-full border border-gray-300 rounded-md focus:border-black"
              defaultValue={accessory.Category}
            >
              <option value="Computer Accessories">Computer Accessories</option>
              <option value="Laptop Accessories">Laptop Accessories</option>
              <option value="CCTV Accessories">CCTV Accessories</option>
            </select>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="Quantity" value="Quantity" />
            </div>
            <TextInput
              id="Quantity"
              name="Quantity"
              type="number" // Ensures numeric input
              defaultValue={accessory.Quantity}
              placeholder="Enter Quantity"
              required
              className="w-full border border-gray-300 rounded-md focus:border-black"
              min="1" // Optional: Set a minimum value
            />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="Price_per_unit" value="Price_per_unit" />
            </div>
            <TextInput
              id="Price_per_unit"
              name="Price_per_unit"
              type="number" // Ensures numeric input
              defaultValue={accessory.Price_per_unit}
              placeholder="Enter Price Per Unit"
              className="w-full border border-gray-300 rounded-md focus:border-black"
              min="0" // Optional: Set a minimum value
            />
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="Description" value="Description" />
            </div>
            <Textarea
              id="Description"
              name="Description"
              type="text"
              defaultValue={accessory.Description}
              placeholder="Enter Description"
              required
              rows={5}
              className="w-full border border-gray-300 rounded-md focus:border-black"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Update Accessories
        </button>
      </form>
    </div>
  );
};

export default EditAccessories;
