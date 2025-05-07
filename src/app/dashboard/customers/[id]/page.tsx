"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Home,
  Calendar,
  Car,
  Plus,
  Edit,
  Trash2,
  Clock,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddVehicleForm from "@/components/ui/add-vehicle-form";
import DeleteConfirmation from "@/components/ui/customer-delete-confirmation";
import EditCustomerForm from "@/components/ui/edit-customer-form";

// Dummy customer data
const dummyCustomers = [
  {
    id: "c1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1234567890",
    address: "123 Main St, Anytown, USA",
    vehicles: ["v1"],
    createdAt: "2023-10-15",
  },
  {
    id: "c2",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1987654321",
    address: "456 Oak Ave, Somewhere, USA",
    vehicles: ["v2"],
    createdAt: "2023-11-25",
  },
  {
    id: "c3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "+1122334455",
    address: "789 Pine Rd, Nowhere, USA",
    vehicles: ["v3"],
    createdAt: "2024-01-10",
  },
  {
    id: "c4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1567890123",
    address: "101 Elm Blvd, Anywhere, USA",
    vehicles: ["v4"],
    createdAt: "2024-02-05",
  },
  {
    id: "c5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1456789012",
    address: "202 Maple Ln, Everywhere, USA",
    vehicles: ["v5"],
    createdAt: "2024-03-20",
  },
  {
    id: "c6",
    name: "Alex Martinez",
    email: "alex.martinez@example.com",
    phone: "+1345678901",
    address: "303 Cedar Ct, Somewhere, USA",
    vehicles: ["v6"],
    createdAt: "2024-04-15",
  },
];

// Dummy vehicle data
const dummyVehicles = [
  {
    id: "v1",
    make: "Toyota",
    model: "Camry",
    year: 2018,
    licensePlate: "ABC123",
    vin: "1HGCM82633A123456",
    customerId: "c1",
  },
  {
    id: "v2",
    make: "Honda",
    model: "Civic",
    year: 2020,
    licensePlate: "DEF456",
    vin: "2HGFG12567H789012",
    customerId: "c2",
  },
  {
    id: "v3",
    make: "Ford",
    model: "F-150",
    year: 2019,
    licensePlate: "GHI789",
    vin: "1FTFW1ET5DFA34567",
    customerId: "c3",
  },
  {
    id: "v4",
    make: "Chevrolet",
    model: "Malibu",
    year: 2017,
    licensePlate: "JKL012",
    vin: "1G1ZD5ST1JF890123",
    customerId: "c4",
  },
  {
    id: "v5",
    make: "Nissan",
    model: "Altima",
    year: 2021,
    licensePlate: "MNO345",
    vin: "1N4AL3AP7JC456789",
    customerId: "c5",
  },
  {
    id: "v6",
    make: "Tesla",
    model: "Model 3",
    year: 2022,
    licensePlate: "PQR678",
    vin: "5YJ3E1EA1JF012345",
    customerId: "c6",
  },
];

// Dummy appointment data
const dummyAppointments = [
  {
    id: "a1",
    date: "2024-05-10T14:00:00",
    customer: "John Smith",
    customerId: "c1",
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
    date: "2024-04-15T10:30:00",
    customer: "John Smith",
    customerId: "c1",
    vehicle: "Toyota Camry 2018",
    vehicleId: "v1",
    status: "Completed",
    services: ["Brake Inspection", "Air Filter Replacement"],
    employee: "Jane Doe",
    employeeId: "2",
    notes: "",
  },
  {
    id: "a3",
    date: "2024-03-20T09:00:00",
    customer: "Sarah Williams",
    customerId: "c2",
    vehicle: "Honda Civic 2020",
    vehicleId: "v2",
    status: "In Progress",
    services: ["Engine Diagnostic", "Transmission Service"],
    employee: "Robert Johnson",
    employeeId: "3",
    notes: "Customer waiting in lounge",
  },
];

export default function CustomerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [customer, setCustomer] = useState<any>(null);
  const [customerVehicles, setCustomerVehicles] = useState<any[]>([]);
  const [customerAppointments, setCustomerAppointments] = useState<any[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddVehicleDialogOpen, setIsAddVehicleDialogOpen] = useState(false);
  const id = use(params).id;

  useEffect(() => {
    // Fetch customer data
    const found = dummyCustomers.find((cust) => cust.id === id);

    if (found) {
      setCustomer(found);

      // Fetch customer's vehicles
      const vehicles = dummyVehicles.filter((vehicle) =>
        found.vehicles.includes(vehicle.id)
      );
      setCustomerVehicles(vehicles);

      // Fetch customer's appointments
      const appointments = dummyAppointments.filter(
        (appointment) => appointment.customerId === found.id
      );
      setCustomerAppointments(appointments);
    } else {
      // Customer not found, redirect to customers list
      router.push("/dashboard/customers");
    }
  }, [id, router]);

  const handleEditCustomer = (updatedCustomer: any) => {
    setCustomer(updatedCustomer);
    setIsEditDialogOpen(false);
  };

  const handleDeleteCustomer = () => {
    // In a real app, you'd make an API call here
    // Then redirect to customers list
    router.push("/dashboard/customers");
  };

  const handleAddVehicle = (newVehicle: any) => {
    // In a real app, you'd make an API call here
    const vehicleId = `v${dummyVehicles.length + 1}`;

    const vehicle = {
      ...newVehicle,
      id: vehicleId,
      customerId: customer.id,
    };

    setCustomerVehicles([...customerVehicles, vehicle]);

    // Update customer's vehicles array
    const updatedCustomer = {
      ...customer,
      vehicles: [...customer.vehicles, vehicleId],
    };

    setCustomer(updatedCustomer);
    setIsAddVehicleDialogOpen(false);
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
    return colors[parseInt(id.replace(/[^0-9]/g, "")) % colors.length];
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

  if (!customer) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-indigo-50 p-6 rounded-lg flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="text-indigo-600 font-medium">
            Loading customer data...
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
            onClick={() => router.push("/dashboard/customers")}
            className="rounded-full h-10 w-10 border-indigo-200 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Customer Profile</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsAddVehicleDialogOpen(true)}
            className="flex items-center gap-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
          >
            <Plus className="h-4 w-4" />
            Add Vehicle
          </Button>

          <Button
            variant="outline"
            onClick={() => setIsEditDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>

          <Button
            variant="outline"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="flex items-center gap-2 border-rose-200 text-rose-600 hover:bg-rose-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg overflow-hidden">
        <div className="relative py-8 px-10 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar
              className={`${getAvatarColor(
                customer.id
              )} h-20 w-20 border-4 border-white/30`}
            >
              <AvatarFallback className="text-white text-2xl">
                {getInitials(customer.name)}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{customer.name}</h2>
              <div className="flex items-center text-indigo-100">
                <Mail className="h-4 w-4 mr-2" />
                {customer.email}
              </div>
              <div className="flex items-center text-indigo-100">
                <Phone className="h-4 w-4 mr-2" />
                {customer.phone}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white px-6">
          <Tabs defaultValue="overview" className="w-full py-4">
            <TabsList className="bg-slate-100 p-1">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-white rounded-md text-sm px-4"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="vehicles"
                className="data-[state=active]:bg-white rounded-md text-sm px-4"
              >
                Vehicles
              </TabsTrigger>
              <TabsTrigger
                value="appointments"
                className="data-[state=active]:bg-white rounded-md text-sm px-4"
              >
                Appointments
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="pb-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1 shadow-md border-0 overflow-hidden">
                <CardHeader className="bg-slate-50 border-b">
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{customer.name}</p>
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
                      <p className="font-medium">{customer.email}</p>
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
                      <p className="font-medium">{customer.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 text-amber-600 p-3 rounded-full mt-1">
                      <Home className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{customer.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Customer Since
                      </p>
                      <p className="font-medium">
                        {new Date(customer.createdAt).toLocaleDateString(
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
                  <CardTitle className="text-lg">Customer Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                  <div className="bg-indigo-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full mb-3">
                      <Car className="h-6 w-6" />
                    </div>
                    <p className="text-3xl font-bold text-indigo-600">
                      {customerVehicles.length}
                    </p>
                    <p className="text-indigo-700">Registered Vehicles</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <div className="bg-green-100 text-green-600 p-3 rounded-full mb-3">
                      <Clock className="h-6 w-6" />
                    </div>
                    <p className="text-3xl font-bold text-green-600">
                      {customerAppointments.length}
                    </p>
                    <p className="text-green-700">Service Appointments</p>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <div className="bg-amber-100 text-amber-600 p-3 rounded-full mb-3">
                      <Wrench className="h-6 w-6" />
                    </div>
                    <p className="text-3xl font-bold text-amber-600">
                      {customerAppointments.reduce(
                        (count, appointment) =>
                          count + appointment.services.length,
                        0
                      )}
                    </p>
                    <p className="text-amber-700">Services Performed</p>
                  </div>

                  {customerAppointments.length > 0 && (
                    <div className="col-span-3 space-y-4">
                      <h3 className="font-medium">Recent Activity</h3>
                      <div className="space-y-2">
                        {customerAppointments
                          .slice(0, 3)
                          .sort(
                            (a, b) =>
                              new Date(b.date).getTime() -
                              new Date(a.date).getTime()
                          )
                          .map((appointment) => (
                            <div
                              key={appointment.id}
                              className="bg-slate-50 p-3 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                              onClick={() =>
                                router.push(
                                  `/dashboard/appointments/${appointment.id}`
                                )
                              }
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-indigo-600" />
                                  <span className="text-sm">
                                    {new Date(
                                      appointment.date
                                    ).toLocaleDateString()}{" "}
                                    at{" "}
                                    {new Date(
                                      appointment.date
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                </div>
                                <Badge
                                  className={getStatusBadgeColor(
                                    appointment.status
                                  )}
                                >
                                  {appointment.status}
                                </Badge>
                              </div>
                              <div className="mt-1 flex items-center gap-2">
                                <Car className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  {appointment.vehicle}
                                </span>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {appointment.services.map(
                                  (service: string, index: number) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="bg-slate-100 border-slate-200 text-xs"
                                    >
                                      {service}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vehicles">
            <Card className="shadow-md border-0 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Registered Vehicles</CardTitle>
                  <CardDescription>
                    {customerVehicles.length === 0
                      ? "No vehicles registered yet"
                      : customerVehicles.length === 1
                      ? "1 vehicle registered"
                      : `${customerVehicles.length} vehicles registered`}
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setIsAddVehicleDialogOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vehicle
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                {customerVehicles.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="bg-slate-100 p-4 rounded-full mb-3">
                      <Car className="h-10 w-10 text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-medium">
                      No vehicles registered
                    </p>
                    <p className="text-slate-500 text-sm mt-1 max-w-md">
                      Add vehicles to this customer's profile to schedule
                      service appointments.
                    </p>
                    <Button
                      onClick={() => setIsAddVehicleDialogOpen(true)}
                      className="mt-4 bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Vehicle
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {customerVehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow transition-shadow overflow-hidden cursor-pointer"
                        onClick={() =>
                          router.push(`/dashboard/vehicles/${vehicle.id}`)
                        }
                      >
                        <div className="bg-slate-100 p-4 border-b flex justify-between items-center">
                          <div className="font-medium flex items-center gap-2">
                            <Car className="h-4 w-4 text-indigo-600" />
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-slate-200 text-slate-700 border-none"
                          >
                            {vehicle.licensePlate}
                          </Badge>
                        </div>
                        <div className="p-4 space-y-3">
                          <div>
                            <p className="text-xs text-muted-foreground">VIN</p>
                            <p className="font-mono text-sm">{vehicle.vin}</p>
                          </div>
                          <div className="flex justify-between">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  `/dashboard/vehicles/${vehicle.id}`
                                );
                              }}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 px-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Open edit vehicle dialog
                                // Not implemented in this example
                              }}
                            >
                              Edit
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

          <TabsContent value="appointments">
            <Card className="shadow-md border-0 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Service History</CardTitle>
                  <CardDescription>
                    {customerAppointments.length === 0
                      ? "No appointments yet"
                      : customerAppointments.length === 1
                      ? "1 service appointment"
                      : `${customerAppointments.length} service appointments`}
                  </CardDescription>
                </div>
                <Button
                  onClick={() => router.push("/dashboard/appointments/add")}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Appointment
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                {customerAppointments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="bg-slate-100 p-4 rounded-full mb-3">
                      <Clock className="h-10 w-10 text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-medium">
                      No service history
                    </p>
                    <p className="text-slate-500 text-sm mt-1 max-w-md">
                      This customer doesn't have any service appointments yet.
                    </p>
                    <Button
                      onClick={() => router.push("/dashboard/appointments/add")}
                      className="mt-4 bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Schedule Appointment
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {customerAppointments
                      .sort(
                        (a, b) =>
                          new Date(b.date).getTime() -
                          new Date(a.date).getTime()
                      )
                      .map((appointment) => (
                        <div
                          key={appointment.id}
                          className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer"
                          onClick={() =>
                            router.push(
                              `/dashboard/appointments/${appointment.id}`
                            )
                          }
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-indigo-600" />
                                <span className="text-sm font-medium">
                                  {new Date(
                                    appointment.date
                                  ).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(
                                    appointment.date
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 mb-2">
                                <Car className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm">
                                  {appointment.vehicle}
                                </span>
                              </div>

                              <div className="flex flex-wrap gap-1 mt-3">
                                {appointment.services.map(
                                  (service: string, index: number) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="bg-slate-100 border-slate-200 text-xs"
                                    >
                                      {service}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Badge
                                className={getStatusBadgeColor(
                                  appointment.status
                                )}
                              >
                                {appointment.status}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-full h-8 w-8 p-0"
                              >
                                <ArrowRight className="h-4 w-4" />
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

      {/* Edit Customer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Customer</DialogTitle>
          </DialogHeader>
          {customer && (
            <EditCustomerForm
              customer={customer}
              onSubmit={handleEditCustomer}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Customer Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-rose-600">
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          {customer && (
            <DeleteConfirmation
              customerName={customer.name}
              onConfirm={handleDeleteCustomer}
              onCancel={() => setIsDeleteDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Add Vehicle Dialog */}
      <Dialog
        open={isAddVehicleDialogOpen}
        onOpenChange={setIsAddVehicleDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Add New Vehicle</DialogTitle>
          </DialogHeader>
          <AddVehicleForm
            customerId={customer.id}
            onSubmit={handleAddVehicle}
            onCancel={() => setIsAddVehicleDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
