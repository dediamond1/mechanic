"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Car,
  User,
  Clipboard,
  FileText,
  UserCheck,
  Wrench,
  MessageSquare,
  Edit,
  MoreHorizontal,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditAppointmentForm from "@/components/ui/edit-appointment-form";

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

// Dummy service prices for total calculation
const dummyServicePrices = {
  "Oil Change": 45,
  "Tire Rotation": 35,
  "Brake Inspection": 65,
  "Air Filter Replacement": 25,
  "Engine Diagnostic": 95,
  "Transmission Service": 150,
  "Wheel Alignment": 85,
  "Battery Replacement": 120,
  "AC Service": 110,
  "Coolant Flush": 75,
  "Electric System Diagnostic": 125,
  "Tire Inspection": 15,
};

export default function AppointmentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [appointment, setAppointment] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddNoteDialogOpen, setIsAddNoteDialogOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [confirmChangeStatus, setConfirmChangeStatus] = useState<string | null>(
    null
  );
  const id = use(params).id as any;

  useEffect(() => {
    // Fetch appointment data
    const found = dummyAppointments.find((app) => app.id === id);

    if (found) {
      setAppointment(found);
    } else {
      // Appointment not found, redirect to appointments list
      router.push("/dashboard/appointments");
    }
  }, [id, router]);

  const handleEditAppointment = (updatedAppointment: any) => {
    setAppointment(updatedAppointment);
    setIsEditDialogOpen(false);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedNotes = appointment.notes
        ? `${appointment.notes}\n\n${new Date().toLocaleString()}: ${newNote}`
        : `${new Date().toLocaleString()}: ${newNote}`;

      setAppointment({
        ...appointment,
        notes: updatedNotes,
      });

      setNewNote("");
      setIsAddNoteDialogOpen(false);
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setConfirmChangeStatus(newStatus);
  };

  const confirmStatusChange = () => {
    if (confirmChangeStatus) {
      setAppointment({
        ...appointment,
        status: confirmChangeStatus,
      });
      setConfirmChangeStatus(null);
    }
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

  // Calculate total price
  const calculateTotal = () => {
    if (!appointment) return 0;

    return appointment.services.reduce((total: number, service: string) => {
      return (
        total +
        (dummyServicePrices[service as keyof typeof dummyServicePrices] || 0)
      );
    }, 0);
  };

  if (!appointment) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-blue-50 p-6 rounded-lg flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="text-blue-600 font-medium">
            Loading appointment data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/dashboard/appointments")}
            className="rounded-full h-10 w-10 border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Appointment Details</h1>
          <Badge className={getStatusBadgeColor(appointment.status)}>
            {appointment.status}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsAddNoteDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Add Note
          </Button>

          <Button
            variant="outline"
            onClick={() => setIsEditDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                disabled={appointment.status === "Scheduled"}
                onClick={() => handleStatusChange("Scheduled")}
              >
                <div className="w-2 h-2 rounded-full bg-amber-500 mr-2" />
                Mark as Scheduled
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={appointment.status === "In Progress"}
                onClick={() => handleStatusChange("In Progress")}
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 mr-2" />
                Mark as In Progress
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={appointment.status === "Completed"}
                onClick={() => handleStatusChange("Completed")}
              >
                <div className="w-2 h-2 rounded-full bg-green-600 mr-2" />
                Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={appointment.status === "Cancelled"}
                onClick={() => handleStatusChange("Cancelled")}
                className="text-rose-600"
              >
                <div className="w-2 h-2 rounded-full bg-rose-600 mr-2" />
                Mark as Cancelled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-0 shadow-md overflow-hidden">
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
            <CardHeader className="pb-0 pt-6">
              <CardTitle className="text-2xl">{appointment.vehicle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">
                        {new Date(appointment.date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">
                        {new Date(appointment.date).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 text-amber-600 p-3 rounded-full">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Customer</p>
                      <p className="font-medium">{appointment.customer}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
                      <Car className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Vehicle</p>
                      <p className="font-medium">{appointment.vehicle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
                      <UserCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Assigned To
                      </p>
                      <p className="font-medium">{appointment.employee}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-rose-100 text-rose-600 p-3 rounded-full">
                      <Clipboard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge
                        className={getStatusBadgeColor(appointment.status)}
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-600" />
                Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {appointment.services.map((service: string, index: number) => {
                  const price =
                    dummyServicePrices[
                      service as keyof typeof dummyServicePrices
                    ] || 0;

                  return (
                    <div
                      key={index}
                      className="py-3 flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-100 p-2 rounded-full">
                          <Wrench className="h-4 w-4 text-slate-600" />
                        </div>
                        <span>{service}</span>
                      </div>
                      <span className="font-medium">${price.toFixed(2)}</span>
                    </div>
                  );
                })}

                <div className="py-3 flex justify-between items-center font-medium">
                  <span>Total</span>
                  <span className="text-lg">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appointment.notes ? (
                <div className="whitespace-pre-line bg-slate-50 p-4 rounded-lg">
                  {appointment.notes}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="bg-slate-100 p-4 rounded-full mb-3">
                    <FileText className="h-6 w-6 text-slate-400" />
                  </div>
                  <p className="text-slate-600 font-medium">No notes yet</p>
                  <p className="text-slate-500 text-sm mt-1 max-w-md">
                    Add notes about customer requests, issues, or other
                    important information.
                  </p>
                  <Button
                    onClick={() => setIsAddNoteDialogOpen(true)}
                    className="mt-4"
                    variant="outline"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start bg-blue-600 hover:bg-blue-700"
                disabled={appointment.status === "In Progress"}
                onClick={() => handleStatusChange("In Progress")}
              >
                <div className="bg-blue-500 p-1.5 rounded mr-2">
                  <Clipboard className="h-4 w-4 text-white" />
                </div>
                Start Service
              </Button>

              <Button
                className="w-full justify-start bg-green-600 hover:bg-green-700"
                disabled={appointment.status === "Completed"}
                onClick={() => handleStatusChange("Completed")}
              >
                <div className="bg-green-500 p-1.5 rounded mr-2">
                  <Check className="h-4 w-4 text-white" />
                </div>
                Complete Service
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start text-rose-600 border-rose-200 hover:bg-rose-50"
                disabled={appointment.status === "Cancelled"}
                onClick={() => handleStatusChange("Cancelled")}
              >
                <div className="bg-rose-100 p-1.5 rounded mr-2">
                  <X className="h-4 w-4 text-rose-600" />
                </div>
                Cancel Appointment
              </Button>

              <Separator />

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <div className="bg-slate-100 p-1.5 rounded mr-2">
                  <Edit className="h-4 w-4 text-slate-600" />
                </div>
                Edit Details
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setIsAddNoteDialogOpen(true)}
              >
                <div className="bg-slate-100 p-1.5 rounded mr-2">
                  <MessageSquare className="h-4 w-4 text-slate-600" />
                </div>
                Add Note
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle>Related Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() =>
                  router.push(`/dashboard/customers/${appointment.customerId}`)
                }
              >
                <div className="bg-blue-100 p-1.5 rounded mr-2">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                View Customer
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() =>
                  router.push(`/dashboard/vehicles/${appointment.vehicleId}`)
                }
              >
                <div className="bg-emerald-100 p-1.5 rounded mr-2">
                  <Car className="h-4 w-4 text-emerald-600" />
                </div>
                View Vehicle
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() =>
                  router.push(`/dashboard/employees/${appointment.employeeId}`)
                }
              >
                <div className="bg-purple-100 p-1.5 rounded mr-2">
                  <UserCheck className="h-4 w-4 text-purple-600" />
                </div>
                View Employee
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Appointment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Appointment</DialogTitle>
          </DialogHeader>
          {appointment && (
            <EditAppointmentForm
              appointment={appointment}
              onSubmit={handleEditAppointment}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Add Note Dialog */}
      <Dialog open={isAddNoteDialogOpen} onOpenChange={setIsAddNoteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Add Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter note details..."
              className="min-h-[150px]"
            />
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setIsAddNoteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                Add Note
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm Status Change Dialog */}
      <Dialog
        open={!!confirmChangeStatus}
        onOpenChange={() => setConfirmChangeStatus(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Confirm Status Change</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Are you sure you want to change the appointment status from{" "}
              <Badge className={getStatusBadgeColor(appointment.status)}>
                {appointment.status}
              </Badge>{" "}
              to{" "}
              <Badge className={getStatusBadgeColor(confirmChangeStatus || "")}>
                {confirmChangeStatus}
              </Badge>
              ?
            </p>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setConfirmChangeStatus(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmStatusChange}
                className={`${
                  confirmChangeStatus === "Completed"
                    ? "bg-green-600 hover:bg-green-700"
                    : confirmChangeStatus === "In Progress"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : confirmChangeStatus === "Cancelled"
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-amber-500 hover:bg-amber-600"
                }`}
              >
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
