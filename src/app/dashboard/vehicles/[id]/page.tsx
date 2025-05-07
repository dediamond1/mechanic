"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Car,
  Calendar,
  User,
  CreditCard,
  Fingerprint,
  Clock,
  Plus,
  Edit,
  Trash2,
  Wrench,
  CheckSquare,
  AlertTriangle,
  FileText,
  Mail,
  Phone,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeleteConfirmation from "@/components/ui/vehicle-delete-confirmation";
import EditVehicleForm from "@/components/ui/edit-vehicle-form";

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
    customerName: "John Smith",
    customerEmail: "john.smith@example.com",
    customerPhone: "+1234567890",
    lastService: "2024-04-15",
    serviceCount: 2,
    mileage: 45000,
    notes: "Regular maintenance customer. Prefers synthetic oil.",
  },
  {
    id: "v2",
    make: "Honda",
    model: "Civic",
    year: 2020,
    licensePlate: "DEF456",
    vin: "2HGFG12567H789012",
    customerId: "c2",
    customerName: "Sarah Williams",
    customerEmail: "sarah.williams@example.com",
    customerPhone: "+1987654321",
    lastService: "2024-03-20",
    serviceCount: 1,
    mileage: 20000,
    notes: "New customer. Vehicle in excellent condition.",
  },
  {
    id: "v3",
    make: "Ford",
    model: "F-150",
    year: 2019,
    licensePlate: "GHI789",
    vin: "1FTFW1ET5DFA34567",
    customerId: "c3",
    customerName: "Michael Johnson",
    customerEmail: "michael.johnson@example.com",
    customerPhone: "+1122334455",
    lastService: null,
    serviceCount: 0,
    mileage: 30000,
    notes: "First registration. No service history yet.",
  },
  {
    id: "v4",
    make: "Chevrolet",
    model: "Malibu",
    year: 2017,
    licensePlate: "JKL012",
    vin: "1G1ZD5ST1JF890123",
    customerId: "c4",
    customerName: "Emily Davis",
    customerEmail: "emily.davis@example.com",
    customerPhone: "+1567890123",
    lastService: null,
    serviceCount: 0,
    mileage: 60000,
    notes: "",
  },
  {
    id: "v5",
    make: "Nissan",
    model: "Altima",
    year: 2021,
    licensePlate: "MNO345",
    vin: "1N4AL3AP7JC456789",
    customerId: "c5",
    customerName: "David Wilson",
    customerEmail: "david.wilson@example.com",
    customerPhone: "+1456789012",
    lastService: null,
    serviceCount: 0,
    mileage: 15000,
    notes: "",
  },
  {
    id: "v6",
    make: "Tesla",
    model: "Model 3",
    year: 2022,
    licensePlate: "PQR678",
    vin: "5YJ3E1EA1JF012345",
    customerId: "c6",
    customerName: "Alex Martinez",
    customerEmail: "alex.martinez@example.com",
    customerPhone: "+1345678901",
    lastService: null,
    serviceCount: 0,
    mileage: 10000,
    notes: "Electric vehicle. First Tesla in our service records.",
  },
];

// Dummy service history data
const dummyServiceHistory = [
  {
    id: "s1",
    vehicleId: "v1",
    date: "2024-04-15",
    mileage: 45000,
    services: ["Oil Change", "Tire Rotation", "Air Filter Replacement"],
    technician: "Robert Johnson",
    notes:
      "Vehicle in good condition. Recommended brake service in next 5,000 miles.",
    cost: 150,
    status: "Completed",
  },
  {
    id: "s2",
    vehicleId: "v1",
    date: "2023-10-20",
    mileage: 38000,
    services: ["Oil Change", "Brake Inspection"],
    technician: "Jane Doe",
    notes:
      "Brake pads at 60%, still good. Next oil change due at 45,000 miles.",
    cost: 110,
    status: "Completed",
  },
  {
    id: "s3",
    vehicleId: "v2",
    date: "2024-03-20",
    mileage: 20000,
    services: ["Engine Diagnostic", "Transmission Service"],
    technician: "Robert Johnson",
    notes:
      "Minor transmission fluid leak detected. Customer opted to monitor for now.",
    cost: 220,
    status: "Completed",
  },
];

export default function VehicleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [vehicle, setVehicle] = useState<any>(null);
  const [serviceHistory, setServiceHistory] = useState<any[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const id = use(params).id;

  useEffect(() => {
    // Fetch vehicle data
    const found = dummyVehicles.find((v) => v.id === id);

    if (found) {
      setVehicle(found);

      // Fetch vehicle's service history
      const history = dummyServiceHistory.filter(
        (service) => service.vehicleId === found.id
      );
      setServiceHistory(history);
    } else {
      // Vehicle not found, redirect to vehicles list
      router.push("/dashboard/vehicles");
    }
  }, [id, router]);

  const handleEditVehicle = (updatedVehicle: any) => {
    setVehicle({
      ...vehicle,
      ...updatedVehicle,
    });
    setIsEditDialogOpen(false);
  };

  const handleDeleteVehicle = () => {
    // In a real app, you'd make an API call here
    // Then redirect to vehicles list
    router.push("/dashboard/vehicles");
  };

  const getVehicleTypeBadge = (make: string) => {
    // This is just for visual variety in the UI
    // In a real app, you'd have more meaningful categorization
    const carTypes: Record<string, { color: string; label: string }> = {
      Toyota: {
        color: "bg-green-100 text-green-800 border-green-200",
        label: "Sedan",
      },
      Honda: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        label: "Sedan",
      },
      Ford: {
        color: "bg-amber-100 text-amber-800 border-amber-200",
        label: "Truck",
      },
      Chevrolet: {
        color: "bg-red-100 text-red-800 border-red-200",
        label: "Sedan",
      },
      Nissan: {
        color: "bg-purple-100 text-purple-800 border-purple-200",
        label: "Sedan",
      },
      Tesla: {
        color: "bg-teal-100 text-teal-800 border-teal-200",
        label: "Electric",
      },
    };

    return (
      carTypes[make] || {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        label: "Vehicle",
      }
    );
  };

  const getMileageStatus = (mileage: number) => {
    if (mileage < 20000) {
      return {
        status: "Low",
        color: "bg-green-100 text-green-800 border-green-200",
      };
    } else if (mileage < 50000) {
      return {
        status: "Medium",
        color: "bg-amber-100 text-amber-800 border-amber-200",
      };
    } else {
      return {
        status: "High",
        color: "bg-blue-100 text-blue-800 border-blue-200",
      };
    }
  };

  if (!vehicle) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-emerald-50 p-6 rounded-lg flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600"></div>
          <p className="text-emerald-600 font-medium">
            Loading vehicle data...
          </p>
        </div>
      </div>
    );
  }

  const vehicleType = getVehicleTypeBadge(vehicle.make);
  const mileageStatus = getMileageStatus(vehicle.mileage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/dashboard/vehicles")}
            className="rounded-full h-10 w-10 border-emerald-200 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Vehicle Details</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() =>
              router.push(`/dashboard/appointments/add?vehicleId=${vehicle.id}`)
            }
            className="flex items-center gap-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50"
          >
            <Plus className="h-4 w-4" />
            Schedule Service
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
            Remove
          </Button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-lg overflow-hidden">
        <div className="relative py-8 px-10 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="bg-white/10 p-6 rounded-lg border border-white/20">
              <Car className="h-12 w-12 text-white" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h2 className="text-2xl font-bold">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h2>
                <Badge className="bg-white/20 text-white border-none md:ml-2">
                  {vehicle.licensePlate}
                </Badge>
              </div>
              <div className="flex items-center text-emerald-100">
                <User className="h-4 w-4 mr-2" />
                Owner: {vehicle.customerName}
              </div>
            </div>

            <div className="md:ml-auto flex gap-2">
              <Badge
                variant="outline"
                className={`${vehicleType.color} border-none`}
              >
                {vehicleType.label}
              </Badge>
              {vehicle.mileage && (
                <Badge
                  variant="outline"
                  className={`${mileageStatus.color} border-none`}
                >
                  {vehicle.mileage.toLocaleString()} miles
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white px-6">
          <Tabs defaultValue="details" className="w-full py-4">
            <TabsList className="bg-slate-100 p-1">
              <TabsTrigger
                value="details"
                className="data-[state=active]:bg-white rounded-md text-sm px-4"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="service-history"
                className="data-[state=active]:bg-white rounded-md text-sm px-4"
              >
                Service History
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="data-[state=active]:bg-white rounded-md text-sm px-4"
              >
                Notes
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="pb-12">
        <Tabs defaultValue="details" className="w-full">
          <TabsContent value="details">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1 shadow-md border-0 overflow-hidden">
                <CardHeader className="bg-slate-50 border-b">
                  <CardTitle className="text-lg">Vehicle Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
                      <Car className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Make & Model
                      </p>
                      <p className="font-medium">
                        {vehicle.make} {vehicle.model}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Year</p>
                      <p className="font-medium">{vehicle.year}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        License Plate
                      </p>
                      <p className="font-medium">{vehicle.licensePlate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-amber-100 text-amber-600 p-3 rounded-full">
                      <Fingerprint className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">VIN</p>
                      <p className="font-mono">{vehicle.vin}</p>
                    </div>
                  </div>

                  {vehicle.mileage && (
                    <div className="flex items-center gap-4">
                      <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Current Mileage
                        </p>
                        <p className="font-medium">
                          {vehicle.mileage.toLocaleString()} miles
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="col-span-1 md:col-span-2 shadow-md border-0 overflow-hidden">
                <CardHeader className="bg-slate-50 border-b">
                  <CardTitle className="text-lg">Owner Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Owner Name
                          </p>
                          <div className="font-medium flex items-center gap-2">
                            {vehicle.customerName}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                              onClick={() =>
                                router.push(
                                  `/dashboard/customers/${vehicle.customerId}`
                                )
                              }
                            >
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{vehicle.customerEmail}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-amber-100 text-amber-600 p-3 rounded-full">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{vehicle.customerPhone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-5 flex flex-col h-full">
                      <h3 className="font-medium text-sm mb-2">
                        Service Summary
                      </h3>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Last Service
                          </p>
                          <p className="font-medium">
                            {vehicle.lastService
                              ? new Date(
                                  vehicle.lastService
                                ).toLocaleDateString()
                              : "No service yet"}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">
                            Services Count
                          </p>
                          <p className="font-medium">{vehicle.serviceCount}</p>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <Button
                          className="w-full bg-emerald-600 hover:bg-emerald-700"
                          onClick={() =>
                            router.push(
                              `/dashboard/appointments/add?vehicleId=${vehicle.id}`
                            )
                          }
                        >
                          Schedule New Service
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="service-history">
            <Card className="shadow-md border-0 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Service History</CardTitle>
                  <CardDescription>
                    {serviceHistory.length === 0
                      ? "No service history yet"
                      : serviceHistory.length === 1
                      ? "1 service on record"
                      : `${serviceHistory.length} services on record`}
                  </CardDescription>
                </div>
                <Button
                  onClick={() =>
                    router.push(
                      `/dashboard/appointments/add?vehicleId=${vehicle.id}`
                    )
                  }
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Service
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                {serviceHistory.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="bg-slate-100 p-4 rounded-full mb-3">
                      <Wrench className="h-10 w-10 text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-medium">
                      No service history yet
                    </p>
                    <p className="text-slate-500 text-sm mt-1 max-w-md">
                      This vehicle hasn't been serviced at your shop yet.
                    </p>
                    <Button
                      onClick={() =>
                        router.push(
                          `/dashboard/appointments/add?vehicleId=${vehicle.id}`
                        )
                      }
                      className="mt-4 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Schedule First Service
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {serviceHistory
                      .sort(
                        (a, b) =>
                          new Date(b.date).getTime() -
                          new Date(a.date).getTime()
                      )
                      .map((service) => (
                        <div
                          key={service.id}
                          className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-4"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-emerald-600" />
                                <span className="font-medium">
                                  {new Date(service.date).toLocaleDateString()}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={
                                    service.status === "Completed"
                                      ? "bg-green-100 text-green-800 border-green-200"
                                      : "bg-amber-100 text-amber-800 border-amber-200"
                                  }
                                >
                                  {service.status}
                                </Badge>
                              </div>

                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="h-4 w-4 text-blue-600" />
                                <span className="text-sm">
                                  Mileage: {service.mileage.toLocaleString()}{" "}
                                  miles
                                </span>
                              </div>

                              <div className="flex flex-wrap gap-1 mt-3">
                                {service.services.map(
                                  (s: string, i: number) => (
                                    <Badge
                                      key={i}
                                      variant="outline"
                                      className="bg-slate-100 border-slate-200 text-xs"
                                    >
                                      {s}
                                    </Badge>
                                  )
                                )}
                              </div>

                              {service.notes && (
                                <div className="mt-3 text-sm text-muted-foreground border-t pt-2">
                                  <div className="flex items-start gap-1">
                                    <FileText className="h-4 w-4 mt-0.5" />
                                    <span>{service.notes}</span>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col items-end">
                              <div className="text-lg font-bold text-emerald-700">
                                ${service.cost.toFixed(2)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Technician: {service.technician}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card className="shadow-md border-0 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-lg">Vehicle Notes</CardTitle>
                <CardDescription>
                  Important information about this vehicle
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {vehicle.notes ? (
                  <div className="bg-slate-50 p-5 rounded-lg">
                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div className="whitespace-pre-line">{vehicle.notes}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="bg-slate-100 p-4 rounded-full mb-3">
                      <FileText className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-medium">No notes yet</p>
                    <p className="text-slate-500 text-sm mt-1 max-w-md">
                      Click "Edit" to add notes about this vehicle.
                    </p>
                  </div>
                )}

                <div className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-amber-800">
                            Maintenance Reminders
                          </h3>
                          <p className="text-sm text-amber-700 mt-1">
                            {vehicle.mileage > 30000
                              ? "Vehicle is due for a comprehensive service check."
                              : "No immediate maintenance needed based on mileage."}
                          </p>
                          <div className="mt-2">
                            {vehicle.lastService ? (
                              <p className="text-xs text-amber-600">
                                Last serviced:{" "}
                                {new Date(
                                  vehicle.lastService
                                ).toLocaleDateString()}
                              </p>
                            ) : (
                              <p className="text-xs text-amber-600">
                                No service history recorded yet.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-start gap-2">
                        <CheckSquare className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-green-800">
                            Vehicle Status
                          </h3>
                          <p className="text-sm text-green-700 mt-1">
                            {vehicle.serviceCount > 0
                              ? "Regular maintenance customer with good service record."
                              : "New vehicle in the system, no service records yet."}
                          </p>
                          <div className="mt-2">
                            <Badge
                              variant="outline"
                              className={mileageStatus.color}
                            >
                              {mileageStatus.status} Mileage:{" "}
                              {vehicle.mileage.toLocaleString()} miles
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Vehicle Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Vehicle</DialogTitle>
          </DialogHeader>
          {vehicle && (
            <EditVehicleForm
              vehicle={vehicle}
              onSubmit={handleEditVehicle}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Vehicle Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-rose-600">
              Confirm Removal
            </DialogTitle>
          </DialogHeader>
          {vehicle && (
            <DeleteConfirmation
              vehicle={vehicle}
              onConfirm={handleDeleteVehicle}
              onCancel={() => setIsDeleteDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
