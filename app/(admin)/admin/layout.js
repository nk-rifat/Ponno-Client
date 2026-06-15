import AdminMobileHeader from "@/components/admin/AdminMobileHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-950 border-r border-slate-800 fixed top-0 left-0 h-screen">
        <AdminSidebar />
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 lg:ml-64">
        {/* Mobile Header + Drawer */}
        <AdminMobileHeader />

        {/* Page content */}
        <main className="flex-1 p-6 bg-slate-900 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
