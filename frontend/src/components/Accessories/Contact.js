import React, { useState } from "react";

export const Contact = ({ onSubmit }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen ">
      <div className="w-3/4 h-3/4 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4">Contact Supplier Manager</h2>
        <p className="text-sm mb-4">
          Please use the form below to send a message to the Supplier Manager.
          If you have any requests, feel free to reach out.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="mb-1">Message:</span>
            <textarea
              className="border border-gray-300 rounded-md p-2"
              rows="4"
              value={message}
              onChange={handleChange}
            />
          </label>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
