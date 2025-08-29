import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddActivityForm() {
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
      const response = await fetch(`https://salesnest.onrender.com/addActivity`, {
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

      setSuccessMsg("Activity added successfully!");
      reset();
      navigate("/activities");

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
        <h2 className="text-xl font-bold text-center mb-4">Add Activity</h2>

        {/* Name */}
        <div className="flex flex-col">
            <label htmlFor="type" className="mb-1 font-medium">Type</label>
            <input
                id="type"
                type="text"
                {...register("type", { required: "Type is required" })}
                className={`border rounded px-3 py-2 outline-none ${errors.type ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter type"
            />
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
            </div>

            <div className="flex flex-col">
            <label htmlFor="customer" className="mb-1 font-medium">Customer</label>
            <input
                id="customer"
                type="text"
                {...register("customer", { required: "Customer is required" })}
                className={`border rounded px-3 py-2 outline-none ${errors.customer ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter customer"
            />
            {errors.customer && <p className="text-red-500 text-sm mt-1">{errors.customer.message}</p>}
            </div>

            <div className="flex flex-col">
            <label htmlFor="description" className="mb-1 font-medium">Description</label>
            <textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                className={`border rounded px-3 py-2 outline-none ${errors.description ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter description"
                rows={3}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div className="flex flex-col">
            <label htmlFor="time" className="mb-1 font-medium">Time</label>
            <input
                id="time"
                type="time"
                {...register("time", { required: "Time is required" })}
                className={`border rounded px-3 py-2 outline-none ${errors.time ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter time"
            />
            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
            </div>

            <div className="flex flex-col">
            <label htmlFor="status" className="mb-1 font-medium">Status</label>
            <select
                id="status"
                {...register("status", { required: "Status is required" })}
                className={`border rounded px-3 py-2 outline-none ${errors.status ? "border-red-500" : "border-gray-300"}`}
                defaultValue=""
            >
                <option disabled value="">Select Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
            </div>

        {/* Error and Success Messages */}
        {error && <p className="text-red-600 text-center">{error}</p>}
        {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/activities")}
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

export default AddActivityForm;
