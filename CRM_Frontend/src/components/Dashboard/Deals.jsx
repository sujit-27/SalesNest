import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDeals, selectDeals, selectDealsLoading, selectDealsError } from "../../features/dealsSlice";
import { Plus } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Deals() {

  const dispatch = useDispatch();
  const deals = useSelector(selectDeals);
  const loading = useSelector(selectDealsLoading);
  const error = useSelector(selectDealsError);
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="flex flex-row items-center justify-between mb-3">
        <h1 className="text-2xl font-bold mb-4">Deals</h1>
        <button 
            onClick={() => navigate("/addDeal")}
            className="flex items-center bg-black text-white px-1 sm:px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>New Deal</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">Deal Name</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Value</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal,index) => (
              <tr key={index} className="border-t hover:bg-gray-100 even:bg-gray-50">
                <td className="p-3">{deal.dealName}</td>
                <td className="p-3 font-semibold">{deal.customerName}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      deal.status === "Won"
                        ? "bg-green-100 text-green-700"
                        : deal.status === "Lost"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {deal.status}
                  </span>
                </td>
                <td className="p-3 font-semibold">${deal.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}