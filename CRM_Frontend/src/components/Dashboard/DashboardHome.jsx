import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities, selectActivities } from "../../features/activitiesSlice";
import { fetchCustomers, selectCustomers } from "../../features/customersSlice";
import { fetchDeals, selectDeals } from "../../features/dealsSlice";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Target,
  Phone,
  Mail,
  Calendar,
  MoreHorizontal,
  Plus
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recentActivities = useSelector(selectActivities);
  const customers = useSelector(selectCustomers);
  const deals = useSelector(selectDeals);

  useEffect(() => {
    dispatch(fetchActivities()).finally(() => setLoadingActivities(false));
    dispatch(fetchCustomers()).finally(() => setLoadingCustomers(false));
    dispatch(fetchDeals()).finally(() => setLoadingDeals(false));
  }, [dispatch]);
  
  function getMonthlyRevenue(customers) {
    return customers.reduce((acc, customer) => {
      const dateObj = new Date(customer.lastContacted);
      if (isNaN(dateObj)) return acc;

      const monthKey = dateObj.toLocaleString("default", { month: "long", year: "numeric" });
      const revenueNum = Number(customer.revenue) || 0;

      if (!acc[monthKey]) {
        acc[monthKey] = 0;
      }
      acc[monthKey] += revenueNum;

      return acc;
    }, {});
  }

  const monthlyRevenue = getMonthlyRevenue(customers);

  const monthlyRevenueData = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
    month: month.substring(0, 3),
    revenue: revenue
  }));

  console.log(monthlyRevenueData)

  const totalRevenue = () => {
    const sum = customers.reduce((acc, customer) => {
      const revenueNum = Number(customer.revenue) || 0;
      return acc + revenueNum;
    }, 0);
    return sum.toString();
  };

  const activeCustomers = () =>
  customers.filter((customer) => customer.status === "active").length;
  
  const statusCounts = deals.reduce((counts, deal) => {
    const status = deal.status.toLowerCase();
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {});

  const dealStageData = [
    { name: 'Lost', value: statusCounts.lost || 0, color: '#10b981' },
    { name: 'In Progress', value: statusCounts.inprogress || 0, color: '#3b82f6' },
    { name: 'Negotiation', value: statusCounts.negotiation || 0, color: '#ef4444' },
    { name: 'Proposal', value: statusCounts.proposal || 0, color: '#f59e0b' },
    { name: 'Won', value: statusCounts.won || 0, color: '#7656e9' },
  ];

  console.log(statusCounts);
  

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

  const getActivityIcon = (type) => {
    switch (type) {
      case 'call': return Phone;
      case 'email': return Mail;
      case 'meeting': return Calendar;
      default: return Calendar;
    }
  };

  function getActiveCustomerChangePercent(customers) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthCount = customers.filter(c => {
      const date = new Date(c.lastContacted);
      return (
        c.status === "active" &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    }).length;

    const prevMonthCount = customers.filter(c => {
      const date = new Date(c.lastContacted);
      return (
        c.status === "active" &&
        date.getMonth() === prevMonth &&
        date.getFullYear() === prevYear
      );
    }).length;

    if (prevMonthCount === 0) {
      return currentMonthCount === 0 ? "+0%" : "+100%";
    }

    const change = ((currentMonthCount - prevMonthCount) / prevMonthCount) * 100;
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(1)}%`;
  }

  function getRevenueIncrementPercent(customers) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const sumRevenueForMonth = (month, year) =>
      customers.reduce((acc, customer) => {
        const date = new Date(customer.lastContacted);
        if (date.getMonth() === month && date.getFullYear() === year) {
          const revenueNum = Number(customer.revenue) || 0;
          return acc + revenueNum;
        }
        return acc;
      }, 0);

    const currentMonthRevenue = sumRevenueForMonth(currentMonth, currentYear);
    const prevMonthRevenue = sumRevenueForMonth(prevMonth, prevYear);

    if (prevMonthRevenue === 0) {
      return currentMonthRevenue === 0 ? "0%" : "+100%";
    }

    const increment = ((currentMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100;
    const sign = increment >= 0 ? "+" : "";

    return `${sign}${increment.toFixed(1)}%`;
  }

  function getPipelineValue(customers) {
    const pipelineStatuses = new Set(["active", "pending"]);

    const pipelineValue = customers.reduce((acc, customer) => {
      if (pipelineStatuses.has(customer.status.toLowerCase())) {
        const revenueNum = Number(customer.revenue) || 0;
        return acc + revenueNum;
      }
      return acc;
    }, 0);

    return pipelineValue;
  }

  function getPipelineValueChangePercent(customers) {
  const now = new Date();
  const currentMonth = now.getMonth();  // 0-based index
  const currentYear = now.getFullYear();

  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const pipelineStatuses = new Set(["active", "pending"]);

  const sumPipelineValueForMonth = (month, year) =>
    customers.reduce((acc, customer) => {
      const date = new Date(customer.lastContacted);
      if (
        date.getMonth() === month &&
        date.getFullYear() === year &&
        pipelineStatuses.has(customer.status.toLowerCase())
      ) {
        const revenueNum = Number(customer.revenue) || 0;
        return acc + revenueNum;
      }
      return acc;
    }, 0);

  const currentValue = sumPipelineValueForMonth(currentMonth, currentYear);
    const prevValue = sumPipelineValueForMonth(prevMonth, prevYear);

    if (prevValue === 0) {
      return currentValue === 0 ? "0%" : "+100%";
    }

    const changePercent = ((currentValue - prevValue) / prevValue) * 100;
    const sign = changePercent >= 0 ? "+" : "";

    return `${sign}${changePercent.toFixed(1)}%`;
  }

  function getConversionRate(customers) {
    const pipelineStatuses = new Set(["active", "pending"]);

    const totalInPipeline = customers.filter(c => pipelineStatuses.has(c.status.toLowerCase())).length;
    if (totalInPipeline === 0) return "0%";

    const wonCount = deals.filter(c => c.status.toLowerCase() === "won").length;

    const rate = (wonCount / totalInPipeline) * 100;
    return `${rate.toFixed(1)}%`;
  }

  function getConversionRateChangePercent(customers) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const pipelineStatuses = new Set(["active", "pending"]);

    const calcConversionRate = (month, year) => {
      const customersInMonth = customers.filter(c => {
        const date = new Date(c.lastContacted);
        return date.getMonth() === month && date.getFullYear() === year;
      });

      const totalInPipeline = customersInMonth.filter(c => pipelineStatuses.has(c.status.toLowerCase())).length;
      if (totalInPipeline === 0) return 0;

      const wonCount = deals.filter(c => c.status.toLowerCase() === "won").length;
      return (wonCount / totalInPipeline) * 100;
    };

    const currentRate = calcConversionRate(currentMonth, currentYear);
    const prevRate = calcConversionRate(prevMonth, prevYear);

    if (prevRate === 0) {
      return currentRate === 0 ? "0%" : "+100%";
    }

    const change = ((currentRate - prevRate) / prevRate) * 100;
    const sign = change >= 0 ? "+" : "";

    return `${sign}${change.toFixed(1)}%`;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-gray-500 text-sm sm:text-lg">Welcome back! Here's what's happening with your sales.</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Revenue" value={"$"+totalRevenue()} change={getRevenueIncrementPercent(customers)} icon={DollarSign} />
        <MetricCard title="Active Customers" value={activeCustomers()} change={getActiveCustomerChangePercent(customers)} icon={Users} />
        <MetricCard title="Conversion Rate" value={getConversionRate(customers)} change={getConversionRateChangePercent(customers)} icon={TrendingUp} />
        <MetricCard title="Pipeline Value" value={"$"+getPipelineValue(customers)} change={getPipelineValueChangePercent(customers)} icon={Target} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-white shadow rounded-lg lg:col-span-2">
          <h2 className="font-bold text-lg mb-6">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#000" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="font-bold text-lg">Deal Pipeline</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={dealStageData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                {dealStageData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {dealStageData.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="p-4 bg-white shadow rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Recent Activities</h2>
          <button 
            onClick={() => navigate("/activities")}
            className="border px-3 py-1 rounded text-sm hover:bg-gray-100 cursor-pointer">View All</button>
        </div>
        <div className="space-y-4">
          {recentActivities.slice(0,5).map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="p-2 rounded-full bg-blue-100">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{activity.customer}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                </div>
                <div className="text-xs text-gray-500">{getTimeAgo(activity.time)}</div>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, icon: Icon }) {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{title}</p>
        <Icon className="h-4 w-4 text-gray-500" />
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-gray-500">
        <span className="text-green-600">{change}</span> from last month
      </p>
    </div>
  );
}