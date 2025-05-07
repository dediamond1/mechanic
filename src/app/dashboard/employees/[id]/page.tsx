"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Edit,
  Clock,
  Car,
  Clipboard,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditEmployeeForm from "@/components/ui/add-employee-form";

// Dummy data based on EmployeeModel
const dummyEmployees = [
  {
    id: "1",
    name: "John Smith",
    role: "manager",
    email: "john.smith@adelmechanic.com",
    phone: "+1234567890",
    appointments: [],
    createdAt: "2023-10-15",
  },
  {
    id: "2",
    name: "Jane Doe",
    role: "employee",
    email: "jane.doe@adelmechanic.com",
    phone: "+1987654321",
    appointments: ["a1", "a2"],
    createdAt: "2023-11-25",
  },
  {
    id: "3",
    name: "Robert Johnson",
    role: "admin",
    email: "robert.johnson@adelmechanic.com",
    phone: "+1122334455",
    appointments: ["a3"],
    createdAt: "2024-01-10",
  },
  {
    id: "4",
    name: "Lisa Chen",
    role: "employee",
    email: "lisa.chen@adelmechanic.com",
    phone: "+1567890123",
    appointments: [],
    createdAt: "2024-02-05",
  },
  {
    id: "5",
    name: "Michael Brown",
    role: "employee",
    email: "michael.brown@adelmechanic.com",
    phone: "+1456789012",
    appointments: ["a4", "a5", "a6"],
    createdAt: "2024-03-20",
  },
];

// Dummy appointments data
const dummyAppointments = [
  {
    id: "a1",
    date: "2024-05-10T14:00:00",
    vehicle: "Toyota Camry 2018",
    status: "Scheduled",
    services: ["Oil Change", "Tire Rotation"],
  },
  {
    id: "a2",
    date: "2024-05-15T10:30:00",
    vehicle: "Honda Civic 2020",
    status: "Completed",
    services: ["Brake Inspection", "Air Filter Replacement"],
  },
  {
    id: "a3",
    date: "2024-05-20T09:00:00",
    vehicle: "Ford F-150 2019",
    status: "In Progress",
    services: ["Engine Diagnostic", "Transmission Service"],
  },
  {
    id: "a4",
    date: "2024-05-25T11:15:00",
    vehicle: "Chevrolet Malibu 2017",
    status: "Scheduled",
    services: ["Wheel Alignment", "Battery Replacement"],
  },
  {
    id: "a5",
    date: "2024-05-30T13:45:00",
    vehicle: "Nissan Altima 2021",
    status: "Scheduled",
    services: ["AC Service", "Coolant Flush"],
  },
  {
    id: "a6",
    date: "2024-06-05T15:30:00",
    vehicle: "Tesla Model 3 2022",
    status: "Scheduled",
    services: ["Electric System Diagnostic", "Tire Inspection"],
  },
];

export default function EmployeeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [employee, setEmployee] = useState<any>(null);
  const [employeeAppointments, setEmployeeAppointments] = useState<any[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const id = use(params).id as any;

  useEffect(() => {
    // Fetch employee data
    const found = dummyEmployees.find((emp) => emp.id === id);

    if (found) {
      setEmployee(found);

      // Fetch employee's appointments
      const appointments = dummyAppointments.filter((app) =>
        found.appointments.includes(app.id)
      );
      setEmployeeAppointments(appointments);
    } else {
      // Employee not found, redirect to employees list
      router.push("/dashboard/employees");
    }
  }, [id, router]);

  const handleEditEmployee = (updatedEmployee: any) => {
    setEmployee(updatedEmployee);
    setIsEditDialogOpen(false);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-600 hover:bg-purple-600";
      case "manager":
        return "bg-blue-600 hover:bg-blue-600";
      default:
        return "bg-green-600 hover:bg-green-600";
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  };

  const getAvatarColor = (id: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-amber-500",
      "bg-rose-500",
      "bg-indigo-500",
      "bg-emerald-500",
    ];
    return colors[parseInt(id) % colors.length];
  };

  if (!employee) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-blue-50 p-6 rounded-lg flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="text-blue-600 font-medium">Loading employee data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/dashboard/employees")}
          className="rounded-full h-10 w-10 border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Employee Profile</h1>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg overflow-hidden">
        <div className="relative py-8 px-10 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar
              className={`${getAvatarColor(
                employee.id
              )} h-20 w-20 border-4 border-white/30`}
            >
              <AvatarFallback className="text-white text-2xl">
                {getInitials(employee.name)}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h2 className="text-2xl font-bold">{employee.name}</h2>
                <Badge
                  className={`${getRoleBadgeColor(
                    employee.role
                  )} text-white capitalize px-3 py-1 md:ml-2`}
                >
                  {employee.role}
                </Badge>
              </div>
              <div className="flex items-center text-blue-100">
                <Mail className="h-4 w-4 mr-2" />
                {employee.email}
              </div>
              <div className="flex items-center text-blue-100">
                <Phone className="h-4 w-4 mr-2" />
                {employee.phone}
              </div>
            </div>

            <div className="ml-auto mt-4 md:mt-0">
              <Button
                onClick={() => setIsEditDialogOpen(true)}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/40"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-12">
        <Tabs defaultValue="overview" className="w-full">
          <div className="bg-white px-6 py-4 rounded-lg border shadow-sm mb-6">
            <TabsList className="bg-slate-100 p-1">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-white rounded-md text-sm px-4"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="appointments"
                className="data-[state=active]:bg-white rounded-md text-sm px-4"
              >
                Appointments
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1 shadow-md border-0 overflow-hidden">
                <CardHeader className="bg-slate-50 border-b">
                  <CardTitle className="text-lg">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{employee.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Email Address
                      </p>
                      <p className="font-medium">{employee.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Phone Number
                      </p>
                      <p className="font-medium">{employee.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-amber-100 text-amber-600 p-3 rounded-full">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Joined Date
                      </p>
                      <p className="font-medium">
                        {new Date(employee.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1 md:col-span-2 shadow-md border-0 overflow-hidden">
                <CardHeader className="bg-slate-50 border-b">
                  <CardTitle className="text-lg">Activity Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                  <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full mb-3">
                      <CalendarDays className="h-6 w-6" />
                    </div>
                    <p className="text-3xl font-bold text-blue-600">
                      {employee.appointments.length}
                    </p>
                    <p className="text-blue-700">Total Appointments</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <div className="bg-green-100 text-green-600 p-3 rounded-full mb-3">
                      <Clipboard className="h-6 w-6" />
                    </div>
                    <p className="text-3xl font-bold text-green-600">
                      {
                        employeeAppointments.filter(
                          (a) => a.status === "Completed"
                        ).length
                      }
                    </p>
                    <p className="text-green-700">Completed Jobs</p>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <div className="bg-amber-100 text-amber-600 p-3 rounded-full mb-3">
                      <Clock className="h-6 w-6" />
                    </div>
                    <p className="text-3xl font-bold text-amber-600">
                      {
                        employeeAppointments.filter(
                          (a) =>
                            a.status === "Scheduled" ||
                            a.status === "In Progress"
                        ).length
                      }
                    </p>
                    <p className="text-amber-700">Pending Jobs</p>
                  </div>

                  {employee.appointments.length === 0 && (
                    <div className="col-span-3 bg-slate-50 rounded-lg p-6 text-center">
                      <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600 font-medium">
                        No appointment history
                      </p>
                      <p className="text-slate-500 text-sm mt-1">
                        This employee doesn't have any appointments assigned
                        yet.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <Card className="shadow-md border-0 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-lg">Appointment History</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {employeeAppointments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="bg-slate-100 p-4 rounded-full mb-3">
                      <Calendar className="h-10 w-10 text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-medium">
                      No appointments assigned
                    </p>
                    <p className="text-slate-500 text-sm mt-1 max-w-md">
                      This employee doesn't have any appointments assigned yet.
                      Appointments will appear here once they are assigned.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {employeeAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="py-4 hover:bg-slate-50 transition-colors rounded-lg"
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                                <Car className="h-5 w-5" />
                              </div>
                              <div className="font-medium text-lg">
                                {appointment.vehicle}
                              </div>
                              <Badge
                                className={getStatusBadgeColor(
                                  appointment.status
                                )}
                              >
                                {appointment.status}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Appointment Date
                                </p>
                                <p className="font-medium">
                                  {new Date(
                                    appointment.date
                                  ).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>

                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Appointment Time
                                </p>
                                <p className="font-medium">
                                  {new Date(
                                    appointment.date
                                  ).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>

                              <div className="md:col-span-2">
                                <p className="text-sm text-muted-foreground">
                                  Services
                                </p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {appointment.services.map(
                                    (service: any, index: any) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="bg-blue-50 border-blue-200 text-blue-700"
                                      >
                                        {service}
                                      </Badge>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="pl-11 md:pl-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-200 text-slate-700"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Employee</DialogTitle>
          </DialogHeader>
          {employee && (
            <EditEmployeeForm
              employee={employee}
              onSubmit={handleEditEmployee}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
