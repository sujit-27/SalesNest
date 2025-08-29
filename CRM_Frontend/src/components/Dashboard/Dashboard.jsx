import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../Logo/graph-icon-trendy-flat-style-600nw-407313520-removebg-preview.png"
import {
  Menu,
  X,
  BarChart2,
  Users,
  UserCircle,
  DollarSign,
  Calendar,
  Settings as SettingsIcon,
  Search,
} from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-50 flex items-center px-4 shadow z-40">
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
          className="text-gray-700"
        >
          <Menu size={28} className="cursor-pointer"/>
        </button>
        <img src={Logo} alt="Logo" className=" ml-2 w-15"/>
        <span className="text-xl font-bold">SalesNest</span>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-transparent bg-opacity-40 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 min-h-screen w-80 bg-gray-50 border-r border-gray-300 transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block`}
      >
        {/* Logo + Close button */}
        <div className="flex items-center px-5 py-3 mb-1">
          <img src={Logo} alt="Logo" className="w-15"/>
          <span className="font-bold text-xl text-gray-800">SalesNest</span>
          <button
            className="ml-auto md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={24} className="cursor-pointer"/>
          </button>
        </div>

        <div className="px-4 mb-6 border-b border-gray-300 pb-6">
          <h1 className="text-gray-600 font-semibold text-sm">"Your Trusted Partner for <span className="text-black font-bold">Efficient Customer Management</span> and Business Growth."</h1>
        </div>

        {/* Navigation — separate for each nav item */}
        <nav className="flex flex-col px-7">
          <ul className="space-y-3">
            <li>
              <NavLink
                to="/"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                    isActive
                      ? "bg-black font-bold text-white"
                      : "hover:bg-gray-200 text-gray-700"
                  }`
                }
              >
                <span className="mr-3 font-bold"><BarChart2 /></span>
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/customers"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                    isActive
                      ? "bg-black font-bold text-white"
                      : "hover:bg-gray-200 text-gray-700"
                  }`
                }
              >
                <span className="mr-3 font-bold"><Users /></span>
                Customers
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/leads"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                    isActive
                      ? "bg-black font-bold text-white"
                      : "hover:bg-gray-200 text-gray-700"
                  }`
                }
              >
                <span className="mr-3 font-bold"><UserCircle /></span>
                Leads
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/deals"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                    isActive
                      ? "bg-black font-bold text-white"
                      : "hover:bg-gray-200 text-gray-700"
                  }`
                }
              >
                <span className="mr-3 font-bold"><DollarSign /></span>
                Deals
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/activities"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                    isActive
                      ? "bg-black font-bold text-white"
                      : "hover:bg-gray-200 text-gray-700"
                  }`
                }
              >
                <span className="mr-3 font-bold"><Calendar /></span>
                Activities
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-2 transition-all duration-200 mt-14 sm:mt-0">
        <Outlet />
      </main>
    </div>
  );
}
