"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  exact?: boolean;
}

interface SidebarProps {
  navLinks: NavLink[];
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export function Sidebar({
  navLinks,
  isOpen,
  onClose,
  currentPath,
}: SidebarProps) {
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-all duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:relative md:translate-x-0"
      )}
    >
      <div className="flex h-full flex-col p-4">
        <div className="mb-8 p-4">
          <h2 className="text-xl font-bold text-gray-800">
            Mechanic Dashboard
          </h2>
        </div>
        <nav className="flex-1 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-4 py-3 text-gray-700 transition-colors",
                (
                  link.exact
                    ? currentPath === link.href
                    : currentPath.startsWith(link.href)
                )
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-100"
              )}
              onClick={onClose}
            >
              <span className="text-gray-500">{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
