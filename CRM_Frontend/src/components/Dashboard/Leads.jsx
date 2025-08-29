import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchLeads, selectLeads, selectLeadsLoading, selectLeadsError } from "../../features/leadsSlice";

export default function Leads() {

  const dispatch = useDispatch();
  const leads = useSelector(selectLeads);
  const loading = useSelector(selectLeadsLoading);
  const error = useSelector(selectLeadsError);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");

  const handleClick = () => {
    navigate("/addLead");
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "contacted":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const filteredLeads = leads.filter((lead) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      lead.name.toLowerCase().includes(term) ||
      lead.email.toLowerCase().includes(term) ||
      lead.status.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === "all" ? true : lead.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
  <div className="m-4">
    {/* Header */}
    <div className="flex flex-row items-center justify-between">
      <h2 className="text-2xl font-bold mb-4">Leads</h2>
      <button
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer"
        onClick={handleClick}
      >
        + Add Lead
      </button>
    </div>
    <p className="text-gray-700 mb-4">
      Manage and track your potential customers here.
    </p>

    {/* Search + Filter */}
    <div className="w-full rounded-lg p-4 shadow-md mb-5 flex flex-row items-center gap-3">
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search leads..."
        className="flex-grow text-black font-semibold placeholder-gray-400 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="bg-gray-900 text-white px-5 pl-2 py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="contacted">Contacted</option>
        <option value="pending">Pending</option>
      </select>
    </div>

    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2.5">{lead.name}</td>
                <td className="border border-gray-300 px-4 py-2.5">{lead.phone}</td>
                <td className="border border-gray-300 px-4 py-2.5">{lead.email}</td>
                <td className="border border-gray-300 px-4 py-2.5 text-sm lowercase">
                  <span
                    className={`p-2 rounded-2xl font-semibold ${getStatusClass(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredLeads.map((lead, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm bg-gray-50"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-gray-900">{lead.name}</h3>
              <span
                className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusClass(
                  lead.status
                )}`}
              >
                {lead.status}
              </span>
            </div>

            {/* Info */}
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Phone:</span> {lead.phone}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {lead.email}
              </p>
            </div>
          </div>
        ))}

        {filteredLeads.length === 0 && (
          <p className="text-center py-4 text-gray-500">No leads found.</p>
        )}
      </div>
    </div>
  </div>
);

}