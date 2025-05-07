"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Wrench,
  BarChart3,
  Clock,
  Calendar,
  Car,
  User,
  Wallet,
  TrendingUp,
  CheckCircle,
  ClipboardList,
  Filter,
  Search,
  ChevronRight,
  AlertTriangle,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dummy data for the dashboard
const todaysStats = {
  appointments: 12,
  completed: 5,
  inProgress: 3,
  scheduled: 4,
  revenue: 1850,
};

const upcomingAppointments = [
  {
    id: "a1",
    time: "10:30 AM",
    customer: "John Smith",
    vehicle: "Toyota Camry 2018",
    services: ["Oil Change", "Tire Rotation"],
    status: "Scheduled",
  },
  {
    id: "a2",
    time: "11:45 AM",
    customer: "Sarah Williams",
    vehicle: "Honda Civic 2020",
    services: ["Brake Inspection"],
    status: "Scheduled",
  },
  {
    id: "a3",
    time: "1:15 PM",
    customer: "Michael Johnson",
    vehicle: "Ford F-150 2019",
    services: ["Engine Diagnostic", "Transmission Service"],
    status: "Confirmed",
  },
  {
    id: "a4",
    time: "3:00 PM",
    customer: "Emily Davis",
    vehicle: "Chevrolet Malibu 2017",
    services: ["Wheel Alignment", "Battery Replacement"],
    status: "Scheduled",
  },
];

const recentlyCompleted = [
  {
    id: "c1",
    customer: "David Wilson",
    vehicle: "Nissan Altima 2021",
    services: ["AC Service", "Coolant Flush"],
    technician: "Robert Johnson",
    total: 185.0,
  },
  {
    id: "c2",
    customer: "Alex Martinez",
    vehicle: "Tesla Model 3 2022",
    services: ["Tire Inspection", "Battery Check"],
    technician: "Jane Doe",
    total: 95.0,
  },
];

const maintenanceAlerts = [
  {
    customer: "Robert Brown",
    vehicle: "BMW X5 2019",
    alert: "Due for 60k mile service",
    priority: "high",
  },
  {
    customer: "Lisa Chen",
    vehicle: "Toyota Corolla 2017",
    alert: "Brake pads below 20%",
    priority: "medium",
  },
  {
    customer: "James Wilson",
    vehicle: "Honda Accord 2020",
    alert: "Oil change overdue by 2 months",
    priority: "low",
  },
];

const popularServices = [
  { name: "Oil Change", count: 28, revenue: 1260 },
  { name: "Tire Rotation", count: 22, revenue: 770 },
  { name: "Brake Service", count: 15, revenue: 1725 },
  { name: "Engine Diagnostic", count: 12, revenue: 1140 },
];

const inventoryAlerts = [
  { item: "Brake Pads", remaining: 3, status: "low" },
  { item: "Oil Filters", remaining: 5, status: "low" },
  { item: "Wiper Blades", remaining: 2, status: "critical" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [dateFilter, setDateFilter] = useState<string>("today");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Confirmed":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Scheduled":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Cancelled":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getInventoryStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "low":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-xl shadow-xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome to Adel Mechanic</h1>
            <p className="text-blue-100 mt-1">
              Here's what's happening at your shop today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 flex items-center gap-3">
              <Calendar className="h-5 w-5" />
              <div>
                <p className="text-sm text-blue-100">Today's Date</p>
                <p className="font-medium">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <Button
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => router.push("/dashboard/appointments")}
            >
              <Clock className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 flex flex-col">
            <p className="text-blue-100 text-sm">Appointments</p>
            <div className="flex items-end justify-between mt-1">
              <p className="text-2xl font-bold">{todaysStats.appointments}</p>
              <Calendar className="h-5 w-5 text-blue-200" />
            </div>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 flex flex-col">
            <p className="text-blue-100 text-sm">Completed</p>
            <div className="flex items-end justify-between mt-1">
              <p className="text-2xl font-bold">{todaysStats.completed}</p>
              <CheckCircle className="h-5 w-5 text-green-300" />
            </div>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 flex flex-col">
            <p className="text-blue-100 text-sm">In Progress</p>
            <div className="flex items-end justify-between mt-1">
              <p className="text-2xl font-bold">{todaysStats.inProgress}</p>
              <Wrench className="h-5 w-5 text-amber-300" />
            </div>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 flex flex-col">
            <p className="text-blue-100 text-sm">Waiting</p>
            <div className="flex items-end justify-between mt-1">
              <p className="text-2xl font-bold">{todaysStats.scheduled}</p>
              <Clock className="h-5 w-5 text-purple-300" />
            </div>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 flex flex-col">
            <p className="text-blue-100 text-sm">Revenue</p>
            <div className="flex items-end justify-between mt-1">
              <p className="text-2xl font-bold">${todaysStats.revenue}</p>
              <Wallet className="h-5 w-5 text-blue-200" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-slate-50 border-b flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Today's Appointments
                </CardTitle>
                <CardDescription>
                  Scheduled services for{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    {dateFilter === "today"
                      ? "Today"
                      : dateFilter === "tomorrow"
                      ? "Tomorrow"
                      : dateFilter === "week"
                      ? "This Week"
                      : ""}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setDateFilter("today")}>
                    Today
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter("tomorrow")}>
                    Tomorrow
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter("week")}>
                    This Week
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() =>
                      router.push(`/dashboard/appointments/${appointment.id}`)
                    }
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 text-blue-600 p-3 rounded-full hidden md:flex">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-lg">
                              {appointment.time}
                            </p>
                            <Badge
                              variant="outline"
                              className={getStatusColor(appointment.status)}
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <User className="h-3.5 w-3.5" />
                            {appointment.customer}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Car className="h-3.5 w-3.5" />
                            {appointment.vehicle}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-wrap gap-1">
                          {appointment.services.map((service, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-slate-100 border-slate-200 text-xs"
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>
                        <button
                          className="text-blue-600 text-xs flex items-center mt-2 hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/dashboard/appointments/${appointment.id}`
                            );
                          }}
                        >
                          View Details
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <Button
                  variant="outline"
                  className="w-full text-blue-600"
                  onClick={() => router.push("/dashboard/appointments")}
                >
                  View All Appointments
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md overflow-hidden">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Recently Completed
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {recentlyCompleted.map((job, index) => (
                  <div
                    key={job.id}
                    className="p-4 hover:bg-slate-50 transition-colors cursor-pointer border-b last:border-b-0"
                    onClick={() =>
                      router.push(`/dashboard/appointments/${job.id}`)
                    }
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{job.customer}</p>
                        <p className="text-sm text-muted-foreground">
                          {job.vehicle}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {job.services.map((service, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="bg-slate-100 border-slate-200 text-xs"
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-green-600">
                          ${job.total.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Tech: {job.technician}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full text-green-600"
                    onClick={() =>
                      router.push("/dashboard/appointments?status=completed")
                    }
                  >
                    View All Completed
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md overflow-hidden">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  Maintenance Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {maintenanceAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-slate-50 transition-colors cursor-pointer border-b last:border-b-0"
                    onClick={() => {}}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{alert.customer}</p>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(alert.priority)}
                          >
                            {alert.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {alert.vehicle}
                        </p>
                        <p className="text-sm font-medium text-amber-600 mt-1">
                          {alert.alert}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-blue-600 h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push("/dashboard/appointments/add");
                        }}
                      >
                        Schedule
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="p-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full text-amber-600"
                    onClick={() => router.push("/dashboard/maintenance")}
                  >
                    View All Alerts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-slate-50 border-b pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Popular Services
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {popularServices.map((service, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between mb-1">
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {service.count} jobs
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress
                      value={(service.count / popularServices[0].count) * 100}
                      className="h-2"
                    />
                    <span className="text-sm font-medium text-blue-600">
                      ${service.revenue}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-blue-600" />
                Inventory Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {inventoryAlerts.length > 0 ? (
                <div className="divide-y">
                  {inventoryAlerts.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.item}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.remaining} remaining
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={getInventoryStatusColor(item.status)}
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-muted-foreground">No inventory alerts</p>
                </div>
              )}
              <div className="p-4 border-t">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/dashboard/inventory")}
                >
                  Manage Inventory
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <Button
                className="w-full justify-start bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push("/dashboard/appointments/add")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                New Appointment
              </Button>

              <Button
                className="w-full justify-start bg-emerald-600 hover:bg-emerald-700"
                onClick={() => router.push("/dashboard/vehicles/add")}
              >
                <Car className="mr-2 h-4 w-4" />
                Register Vehicle
              </Button>

              <Button
                className="w-full justify-start bg-purple-600 hover:bg-purple-700"
                onClick={() => router.push("/dashboard/customers/add")}
              >
                <User className="mr-2 h-4 w-4" />
                Add Customer
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push("/dashboard/reports")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Generate Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
