"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Car,
  Calendar,
  Wrench,
  User,
  Edit,
  Trash2,
  Eye,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import DeleteConfirmation from "@/components/ui/vehicle-delete-confirmation";
import AddVehicleForm from "@/components/ui/com-add-vehicle-form";

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
    lastService: "2024-04-15",
    serviceCount: 2,
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
    lastService: "2024-03-20",
    serviceCount: 1,
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
    lastService: null,
    serviceCount: 0,
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
    lastService: null,
    serviceCount: 0,
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
    lastService: null,
    serviceCount: 0,
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
    lastService: null,
    serviceCount: 0,
  },
];

// Dummy customers data
const dummyCustomers = [
  {
    id: "c1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1234567890",
  },
  {
    id: "c2",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1987654321",
  },
  {
    id: "c3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "+1122334455",
  },
  {
    id: "c4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1567890123",
  },
  {
    id: "c5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1456789012",
  },
  {
    id: "c6",
    name: "Alex Martinez",
    email: "alex.martinez@example.com",
    phone: "+1345678901",
  },
];

export default function VehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState(dummyVehicles);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter vehicles based on search term
  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      `${vehicle.make} ${vehicle.model}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.year.toString().includes(searchTerm)
  );

  const handleAddVehicle = (newVehicle: any) => {
    // In a real app, you'd make an API call here
    const id = `v${vehicles.length + 1}`;

    // Find the customer name
    const customer = dummyCustomers.find((c) => c.id === newVehicle.customerId);

    setVehicles([
      ...vehicles,
      {
        ...newVehicle,
        id,
        customerName: customer?.name || "Unknown Customer",
        lastService: null,
        serviceCount: 0,
      },
    ]);

    setIsAddDialogOpen(false);
  };

  const handleDeleteVehicle = () => {
    setVehicles(vehicles.filter((v) => v.id !== selectedVehicle.id));
    setIsDeleteDialogOpen(false);
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-600 to-teal-600 p-6 rounded-xl shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-white">Vehicles</h1>
          <p className="text-emerald-100">Manage your customer vehicles</p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-white text-emerald-600 hover:bg-emerald-50"
        >
          <Plus className="mr-2 h-4 w-4" />
          Register Vehicle
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex-1 flex items-center rounded-lg border bg-card shadow-sm p-4 w-full">
          <Search className="h-5 w-5 text-muted-foreground ml-2 mr-3" />
          <Input
            type="search"
            placeholder="Search by make, model, license plate, VIN..."
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={
              viewMode === "grid" ? "bg-emerald-600 hover:bg-emerald-700" : ""
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={
              viewMode === "list" ? "bg-emerald-600 hover:bg-emerald-700" : ""
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            List
          </Button>
        </div>
      </div>

      {filteredVehicles.length === 0 ? (
        <div className="bg-white rounded-lg border p-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
              <Car className="size-6" />
            </div>
            <p className="font-medium">No vehicles found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by registering your first vehicle"}
            </p>
            {!searchTerm && (
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Register Vehicle
              </Button>
            )}
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => {
            const vehicleType = getVehicleTypeBadge(vehicle.make);

            return (
              <Card
                key={vehicle.id}
                className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/dashboard/vehicles/${vehicle.id}`)}
              >
                <div className="h-2 bg-emerald-600" />
                <CardHeader className="pt-6 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline" className={vehicleType.color}>
                        {vehicleType.label}
                      </Badge>
                      <CardTitle className="text-lg mt-2">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/vehicles/${vehicle.id}`);
                      }}
                    >
                      <Eye className="size-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          License Plate
                        </p>
                        <p className="font-medium">{vehicle.licensePlate}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Owner</p>
                        <p className="font-medium">{vehicle.customerName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-amber-100 text-amber-600 p-2 rounded-full">
                        <Wrench className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Service History
                        </p>
                        <p className="font-medium">
                          {vehicle.serviceCount === 0
                            ? "No services yet"
                            : `${vehicle.serviceCount} service${
                                vehicle.serviceCount === 1 ? "" : "s"
                              }`}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/dashboard/appointments/add?vehicleId=${vehicle.id}`
                          );
                        }}
                      >
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        Service
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-rose-600 border-rose-200 hover:bg-rose-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVehicle(vehicle);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-0 shadow-md overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Vehicle Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>License</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Last Service</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => {
                  const vehicleType = getVehicleTypeBadge(vehicle.make);

                  return (
                    <TableRow
                      key={vehicle.id}
                      className="hover:bg-emerald-50/30 cursor-pointer"
                      onClick={() =>
                        router.push(`/dashboard/vehicles/${vehicle.id}`)
                      }
                    >
                      <TableCell className="py-4">
                        <div className="flex flex-col gap-1">
                          <div className="font-medium">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </div>
                          <Badge
                            variant="outline"
                            className={`${vehicleType.color} w-fit`}
                          >
                            {vehicleType.label}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {vehicle.licensePlate}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {vehicle.vin.substring(0, 8)}...
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {vehicle.customerName}
                        </div>
                      </TableCell>
                      <TableCell>
                        {vehicle.lastService ? (
                          <div className="font-medium">
                            {new Date(vehicle.lastService).toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            No services yet
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div
                          className="flex justify-end gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/dashboard/vehicles/${vehicle.id}`);
                            }}
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(
                                `/dashboard/appointments/add?vehicleId=${vehicle.id}`
                              );
                            }}
                          >
                            <Calendar className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedVehicle(vehicle);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Add Vehicle Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Register New Vehicle</DialogTitle>
          </DialogHeader>
          <AddVehicleForm
            customers={dummyCustomers}
            onSubmit={handleAddVehicle}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-rose-600">
              Confirm Removal
            </DialogTitle>
          </DialogHeader>
          {selectedVehicle && (
            <DeleteConfirmation
              vehicle={selectedVehicle}
              onConfirm={handleDeleteVehicle}
              onCancel={() => setIsDeleteDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
