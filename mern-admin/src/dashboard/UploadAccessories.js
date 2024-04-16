import React, { useState } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { data } from "autoprefixer";

const UploadAccessories = () => {
  const category = [
    "Computer Accessories",
    "Laptop Accessories",
    "CCTV Accessories",
  ];

  const [selectedCategory, setSelectedCategory] = useState(category[0]);

  const handleChangeSelectedValue = (event) => {
    console.log(event.target.value);
    setSelectedCategory(event.target.value);
  };

  //Handle Book Submission
  const handleAccessoriesSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const AccessoriesID = form.AccessoriesID.value;
    const AccessoriesName = form.AccessoriesName.value;
    const Category = form.Category.value;
    const Quantity = form.Quantity.value;
    const Price_per_unit = form.Price_per_unit.value;
    const Description = form.Description.value;

    const accessoriesObj = {
      AccessoriesID,
      AccessoriesName,
      Category,
      Quantity,
      Price_per_unit,
      Description,
    };

    //console.log(accessoriesObj);

    //send data to database

    fetch("http://localhost:8000/upload-accessories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accessoriesObj),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Failed to upload accessories. Please try again later."
          );
        }
        return res.json();
      })
      .then((data) => {
        alert("Accessories Uploaded Successfully");
        form.reset();
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        alert(error.message); // Display the error message to the user
      });
  };
  return (
    <div className="py-10 my-12 ">
      <h2 className="mb-8 text-3xl font-bold">Upload Accessories</h2>
      <form
        onSubmit={handleAccessoriesSubmit}
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
              value={selectedCategory}
              onChange={handleChangeSelectedValue}
            >
              {category.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="Quantity" value="Quantity" />
            </div>
            <TextInput
              id="Quantity"
              name="Quantity"
              type="text"
              placeholder="Enter Quantity"
              required
              className="w-full border border-gray-300 rounded-md focus:border-black"
            />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="Price_per_unit" value="Price Per Unit" />
            </div>
            <TextInput
              id="Price_per_unit"
              name="Price_per_unit"
              type="text"
              placeholder="Enter Price Per Unit"
              className="w-full border border-gray-300 rounded-md focus:border-black"
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
          Upload Accessories
        </button>
      </form>
    </div>
  );
};

export default UploadAccessories;
