import React, { useEffect, useState } from "react";
import { Search, Filter, Plus, MoreHorizontal, Calendar, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities, selectActivities, selectLoading, selectError } from "../../features/activitiesSlice";

export default function Activities(){
  
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activities = useSelector(selectActivities);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
      dispatch(fetchActivities());
    }, [dispatch]);

  const filteredActivities = activities.filter(a =>
    a.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActivityIcon = (type) => {
    switch (type) {
      case "call": return Phone;
      case "email": return Mail;
      case "meeting": return Calendar;
      default: return Calendar;
    }
  };

  function getTimeAgo(activityTimeStr) {
    const [h, m, s] = activityTimeStr.split(":").map(Number);
    const now = new Date();
    const activityTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, s);

    let diffMs = now - activityTime;
    if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000;

    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHrs > 0) {
      return `${diffHrs} hour${diffHrs > 1 ? "s" : ""} ago`;
    } else if (diffMins > 0) {
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Activities</h1>
          <p className="text-gray-500">Track all your interactions and tasks.</p>
        </div>
        <button
          onClick={() => navigate("/addActivity")} 
          className="flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer">
          <Plus className="w-4 h-4 mr-2" />
          Add Activity
        </button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-black"
          />
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {filteredActivities.map(activity => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg shadow hover:bg-gray-50 transition-colors">
              <div className="p-2 rounded-full bg-black/10">
                <Icon className="w-5 h-5 text-black" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{activity.customer}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${activity.status === "completed" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>
                    {activity.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{activity.description}</p>
              </div>
              <div className="text-xs text-gray-400">{getTimeAgo(activity.time)}</div>
              <button className="p-1 hover:bg-gray-200 rounded">
                <MoreHorizontal className="w-4 h-4 cursor-pointer" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}