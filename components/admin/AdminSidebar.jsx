"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home", icon: FaHome },
  { href: "/admin/dashboard", label: "Dashboard", icon: FaTachometerAlt },
  { href: "/admin/dashboard/orders", label: "Orders", icon: FaShoppingBag },
  { href: "/admin/dashboard/products", label: "Products", icon: FaBoxOpen },
  { href: "/admin/dashboard/customers", label: "Customers", icon: FaUsers },
];

const AdminSidebar = ({ onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  const navLinkClass = (href) => {
    const isActive =
      href === "/" || href === "/admin/dashboard"
        ? pathname === href
        : pathname.startsWith(href);
    return `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
      isActive
        ? "bg-green-600 text-white shadow-md"
        : "text-gray-300 hover:bg-slate-800 hover:text-white"
    }`;
  };

  return (
    <ul className="flex flex-col gap-1 p-4 h-full">
      <div className="mb-6 px-2 text-xl font-bold text-green-400 tracking-wide">
        Ponno Admin
      </div>

      {/* Nav Links */}
      {navLinks.map(({ href, label, icon: Icon }) => (
        <li key={href}>
          <Link href={href} className={navLinkClass(href)} onClick={onClose}>
            <Icon /> {label}
          </Link>
        </li>
      ))}

      {/* Logout */}
      <li className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-slate-800 hover:text-red-300 transition-all duration-200"
        >
          <FaSignOutAlt /> Logout
        </button>
      </li>
    </ul>
  );
};

export default AdminSidebar;
