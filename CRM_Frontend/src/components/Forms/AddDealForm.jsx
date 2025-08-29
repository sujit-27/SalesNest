import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddDealForm() {
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
      const response = await fetch(`https://salesnest.onrender.com/addDeal`, {
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

      setSuccessMsg("Deal added successfully!");
      reset();
      navigate("/home");

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
        <h2 className="text-xl font-bold text-center mb-4">Add Deal</h2>

        {/* Deal Name */}
        <div className="flex flex-col">
            <label htmlFor="dealName" className="mb-1 font-medium">Deal Name</label>
            <input
                id="dealName"
                type="text"
                {...register("dealName", { required: "Deal Name is required" })}
                className={`border rounded px-3 py-2 outline-none ${errors.dealName ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter deal name"
            />
            {errors.dealName && <p className="text-red-500 text-sm mt-1">{errors.dealName.message}</p>}
            </div>

            {/* Customer Name */}
            <div className="flex flex-col">
            <label htmlFor="customerName" className="mb-1 font-medium">Customer Name</label>
            <input
                id="customerName"
                type="text"
                {...register("customerName", { required: "Customer Name is required" })}
                className={`border rounded px-3 py-2 outline-none ${errors.customerName ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter customer name"
            />
            {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>}
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
                <option value="won">Won</option>
                <option value="negotiation">Negotiation</option>
                <option value="lost">Lost</option>
                <option value="inprogress">In Progress</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
            </div>

            {/* Value */}
            <div className="flex flex-col">
            <label htmlFor="value" className="mb-1 font-medium">Value</label>
            <input
                id="value"
                type="number"
                step="0.01"
                {...register("value", {
                required: "Value is required",
                min: { value: 0, message: "Value must be non-negative" },
                })}
                className={`border rounded px-3 py-2 outline-none ${errors.value ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter value"
            />
            {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value.message}</p>}
        </div>


        {/* Error and Success Messages */}
        {error && <p className="text-red-600 text-center">{error}</p>}
        {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/deals")}
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

export default AddDealForm;
