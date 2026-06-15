"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";

const AdminMobileHeader = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Topbar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-950 border-b border-slate-800 lg:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white text-xl p-1"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <span className="font-bold text-green-400 tracking-wide">
          Ponno Admin
        </span>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-slate-950 border-r border-slate-800 z-50 transform transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </aside>
    </>
  );
};

export default AdminMobileHeader;
