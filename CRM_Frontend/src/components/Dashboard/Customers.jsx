import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCustomers, selectCustomers, selectLoading, selectError } from "../../features/customersSlice.js";

export default function Customers() {

  const customers = useSelector(selectCustomers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate("/addCustomer");
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const filteredCustomers = customers.filter((customer) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      customer.companyName.toLowerCase().includes(term) ||
      customer.email.toLowerCase().includes(term) ||
      customer.lastContacted.toLowerCase().includes(term) ||
      customer.revenue.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === "all" ? true : customer.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function daysAgo(dateString) {
    const now = new Date();
    const pastDate = new Date(dateString);

    const diffTime = now - pastDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "1 day ago";
    } else {
      return `${diffDays} days ago`;
    }
  }

  return (
  <div className="m-4">
    <div className="flex flex-row items-center justify-between">
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      <button
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer"
        onClick={handleClick}
      >
        + Add Customer
      </button>
    </div>
    <p className="text-gray-700 mb-4">
      Manage your customer relationships and accounts.
    </p>

    {/* Search + Filter */}
    <div className="w-full rounded-lg p-4 shadow-md mb-5 flex flex-row items-center gap-3">
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Customers..."
        className="flex-grow text-black font-semibold placeholder-gray-400 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none"
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="bg-gray-900 text-white px-5 pl-2 py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>

    <div className="bg-white shadow-md rounded-xl p-4 sm:border">
      <h1 className="font-semibold text-xl mb-5">Customer List</h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Company</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Revenue</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Last Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="border px-4 py-2.5">{customer.companyName}</td>
                <td className="border px-4 py-2.5">{customer.email}</td>
                <td className="border px-4 py-2.5">{customer.phone}</td>
                <td className="border px-4 py-2.5">${customer.revenue}</td>
                <td className="border px-4 py-2.5 text-sm lowercase">
                  <span
                    className={`p-2 rounded-2xl font-semibold ${getStatusClass(
                      customer.status
                    )}`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="border px-4 py-2.5">
                  {daysAgo(customer.lastContacted)}
                </td>
              </tr>
            ))}
            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No Customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {filteredCustomers.map((customer, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm bg-gray-50"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-gray-900">
                {customer.companyName}
              </h3>
              <span
                className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusClass(
                  customer.status
                )}`}
              >
                {customer.status}
              </span>
            </div>

            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-semibold">Email:</span> {customer.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {customer.phone}
              </p>
              <p>
                <span className="font-semibold">Revenue:</span> $
                {customer.revenue}
              </p>
              <p>
                <span className="font-semibold">Last Contact:</span>{" "}
                {daysAgo(customer.lastContacted)}
              </p>
            </div>
          </div>
        ))}

        {filteredCustomers.length === 0 && (
          <p className="text-center py-4 text-gray-500">No Customers found.</p>
        )}
      </div>
    </div>
  </div>
);

}