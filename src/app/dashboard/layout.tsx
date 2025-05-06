"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Car,
  Badge,
  Menu,
  User,
} from "lucide-react";
import { Sidebar } from "@/components/ui/sidebar";

const navLinks = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    exact: true,
  },
  {
    name: "Appointments",
    href: "/dashboard/appointments",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
    icon: <Users className="h-5 w-5" />,
  },
  {
    name: "Vehicles",
    href: "/dashboard/vehicles",
    icon: <Car className="h-5 w-5" />,
  },
  {
    name: "Employees",
    href: "/dashboard/employees",
    icon: <Badge className="h-5 w-5" />,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        navLinks={navLinks}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPath={pathname}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <Button
              variant="ghost"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-4">
              <User className="h-5 w-5" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
