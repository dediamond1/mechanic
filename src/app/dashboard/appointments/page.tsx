"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Calendar,
  Clock,
  Filter,
  ChevronDown,
  Car,
  User,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddAppointmentForm from "@/components/ui/add-appointment-form";

// Dummy appointment data
const dummyAppointments = [
  {
    id: "a1",
    date: "2024-05-10T14:00:00",
    customer: "John Smith",
    vehicle: "Toyota Camry 2018",
    vehicleId: "v1",
    status: "Scheduled",
    services: ["Oil Change", "Tire Rotation"],
    employee: "Robert Johnson",
    employeeId: "3",
    notes: "Customer requested quick service",
  },
  {
    id: "a2",
    date: "2024-05-15T10:30:00",
    customer: "Sarah Williams",
    vehicle: "Honda Civic 2020",
    vehicleId: "v2",
    status: "Completed",
    services: ["Brake Inspection", "Air Filter Replacement"],
    employee: "Jane Doe",
    employeeId: "2",
    notes: "",
  },
  {
    id: "a3",
    date: "2024-05-20T09:00:00",
    customer: "Michael Johnson",
    vehicle: "Ford F-150 2019",
    vehicleId: "v3",
    status: "In Progress",
    services: ["Engine Diagnostic", "Transmission Service"],
    employee: "Robert Johnson",
    employeeId: "3",
    notes: "Customer waiting in lounge",
  },
  {
    id: "a4",
    date: "2024-05-25T11:15:00",
    customer: "Emily Davis",
    vehicle: "Chevrolet Malibu 2017",
    vehicleId: "v4",
    status: "Scheduled",
    services: ["Wheel Alignment", "Battery Replacement"],
    employee: "Michael Brown",
    employeeId: "5",
    notes: "",
  },
  {
    id: "a5",
    date: "2024-05-30T13:45:00",
    customer: "David Wilson",
    vehicle: "Nissan Altima 2021",
    vehicleId: "v5",
    status: "Scheduled",
    services: ["AC Service", "Coolant Flush"],
    employee: "Michael Brown",
    employeeId: "5",
    notes: "New customer",
  },
  {
    id: "a6",
    date: "2024-06-05T15:30:00",
    customer: "Alex Martinez",
    vehicle: "Tesla Model 3 2022",
    vehicleId: "v6",
    status: "Scheduled",
    services: ["Electric System Diagnostic", "Tire Inspection"],
    employee: "Michael Brown",
    employeeId: "5",
    notes: "First service for this vehicle",
  },
];

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState(dummyAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter appointments based on search term and status filter
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.services.some((service) =>
        service.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === null || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleAddAppointment = (newAppointment: any) => {
    // In a real app, you'd make an API call here
    const id = `a${appointments.length + 1}`;

    setAppointments([
      ...appointments,
      {
        ...newAppointment,
        id,
      },
    ]);

    setIsAddDialogOpen(false);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-600 text-white";
      case "In Progress":
        return "bg-blue-600 text-white";
      case "Cancelled":
        return "bg-rose-600 text-white";
      default:
        return "bg-amber-500 text-white";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-xl shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-white">Appointments</h1>
          <p className="text-blue-100">
            Schedule and manage service appointments
          </p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-white text-blue-600 hover:bg-blue-50"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex items-center rounded-lg border bg-card shadow-sm p-4">
          <Search className="h-5 w-5 text-muted-foreground ml-2 mr-3" />
          <Input
            type="search"
            placeholder="Search by customer, vehicle, or service..."
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {statusFilter || "All Statuses"}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem onClick={() => setStatusFilter(null)}>
              All Statuses
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Scheduled")}>
              <div className="w-2 h-2 rounded-full bg-amber-500 mr-2" />
              Scheduled
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("In Progress")}>
              <div className="w-2 h-2 rounded-full bg-blue-600 mr-2" />
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Completed")}>
              <div className="w-2 h-2 rounded-full bg-green-600 mr-2" />
              Completed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Cancelled")}>
              <div className="w-2 h-2 rounded-full bg-rose-600 mr-2" />
              Cancelled
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppointments.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg border p-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <Calendar className="size-6" />
              </div>
              <p className="font-medium">No appointments found</p>
              <p className="text-sm text-muted-foreground mt-1">
                {searchTerm || statusFilter
                  ? "Try adjusting your search or filters"
                  : "Get started by creating your first appointment"}
              </p>
              {!searchTerm && !statusFilter && (
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="mt-4"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Appointment
                </Button>
              )}
            </div>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <Card
              key={appointment.id}
              className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow"
              onClick={() =>
                router.push(`/dashboard/appointments/${appointment.id}`)
              }
            >
              <div
                className={`h-2 ${
                  appointment.status === "Completed"
                    ? "bg-green-600"
                    : appointment.status === "In Progress"
                    ? "bg-blue-600"
                    : appointment.status === "Cancelled"
                    ? "bg-rose-600"
                    : "bg-amber-500"
                }`}
              />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className={getStatusBadgeColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/dashboard/appointments/${appointment.id}`);
                    }}
                  >
                    <Eye className="size-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg mt-2">
                  {appointment.vehicle}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">
                        {new Date(appointment.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-full">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">
                        {new Date(appointment.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 text-amber-600 p-2 rounded-full">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Customer</p>
                      <p className="font-medium">{appointment.customer}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
                      <Car className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Services</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {appointment.services.map((service, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-emerald-50 border-emerald-200 text-emerald-700 text-xs"
                          >
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add Appointment Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Schedule New Appointment
            </DialogTitle>
          </DialogHeader>
          <AddAppointmentForm
            onSubmit={handleAddAppointment}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
