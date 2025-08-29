import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddLeadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const response = await fetch(`https://salesnest.onrender.com/addLead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || `Failed to add customer, status: ${response.status}`);
      }

      setSuccessMsg("Customer added successfully!");
      reset();
      navigate("/leads");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-xl font-bold text-center mb-4">Add Details</h2>

        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 font-medium">Name</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`border rounded px-3 py-2 outline-none ${errors.name ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className={`border rounded px-3 py-2 outline-none ${errors.email ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-1 font-medium">Phone</label>
          <input
            id="phone"
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\+?[1-9]\d{1,14}$/,
                message: "Invalid phone number format",
              },
            })}
            className={`border rounded px-3 py-2 outline-none ${errors.phone ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label htmlFor="status" className="mb-1 font-medium">Status</label>
          <select
            id="status"
            {...register("status", { required: "Status is required" })}
            className={`border rounded px-3 py-2 outline-none ${errors.status ? "border-red-500" : "border-gray-300"}`}
            defaultValue=""
          >
            <option disabled value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="inactive">Contacted</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
        </div>

        {/* Error and Success Messages */}
        {error && <p className="text-red-600 text-center">{error}</p>}
        {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/leads")}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLeadForm;
