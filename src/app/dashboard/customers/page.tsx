"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Car,
  User,
  Phone,
  Mail,
  Edit,
  Trash2,
  Eye,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DeleteConfirmation from "@/components/ui/customer-delete-confirmation";
import AddCustomerForm from "@/components/ui/add-customer-form";
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
  { id: "v1", name: "Toyota Camry 2018", customerId: "c1" },
  { id: "v2", name: "Honda Civic 2020", customerId: "c2" },
  { id: "v3", name: "Ford F-150 2019", customerId: "c3" },
  { id: "v4", name: "Chevrolet Malibu 2017", customerId: "c4" },
  { id: "v5", name: "Nissan Altima 2021", customerId: "c5" },
  { id: "v6", name: "Tesla Model 3 2022", customerId: "c6" },
];

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState(dummyCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = (newCustomer: any) => {
    // In a real app, you'd make an API call here
    const id = `c${customers.length + 1}`;

    setCustomers([
      ...customers,
      {
        ...newCustomer,
        id,
        vehicles: [],
        createdAt: new Date().toISOString().split("T")[0],
      },
    ]);

    setIsAddDialogOpen(false);
  };

  const handleEditCustomer = (updatedCustomer: any) => {
    setCustomers(
      customers.map((cust) =>
        cust.id === updatedCustomer.id ? updatedCustomer : cust
      )
    );
    setIsEditDialogOpen(false);
  };

  const handleDeleteCustomer = () => {
    setCustomers(customers.filter((cust) => cust.id !== selectedCustomer.id));
    setIsDeleteDialogOpen(false);
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-xl shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-white">Customers</h1>
          <p className="text-indigo-100">Manage your customer database</p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-white text-indigo-600 hover:bg-indigo-50"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex-1 flex items-center rounded-lg border bg-card shadow-sm p-4 w-full">
          <Search className="h-5 w-5 text-muted-foreground ml-2 mr-3" />
          <Input
            type="search"
            placeholder="Search customers by name, email, phone..."
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
              viewMode === "grid" ? "bg-indigo-600 hover:bg-indigo-700" : ""
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
              viewMode === "list" ? "bg-indigo-600 hover:bg-indigo-700" : ""
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

      {filteredCustomers.length === 0 ? (
        <div className="bg-white rounded-lg border p-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
              <User className="size-6" />
            </div>
            <p className="font-medium">No customers found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by adding your first customer"}
            </p>
            {!searchTerm && (
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Customer
              </Button>
            )}
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => {
            const customerVehicles = dummyVehicles.filter((v) =>
              customer.vehicles.includes(v.id)
            );

            return (
              <Card
                key={customer.id}
                className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() =>
                  router.push(`/dashboard/customers/${customer.id}`)
                }
              >
                <div className="h-2 bg-indigo-600" />
                <CardHeader className="pt-6 pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className={`${getAvatarColor(customer.id)}`}>
                        <AvatarFallback className="text-white">
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {customer.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/customers/${customer.id}`);
                      }}
                    >
                      <Eye className="size-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div className="text-sm">{customer.phone}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
                        <Car className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Vehicles
                        </p>
                        {customerVehicles.length === 0 ? (
                          <p className="text-sm">No vehicles</p>
                        ) : (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {customerVehicles.map((vehicle) => (
                              <Badge
                                key={vehicle.id}
                                variant="outline"
                                className="bg-emerald-50 border-emerald-200 text-emerald-700 text-xs"
                              >
                                {vehicle.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCustomer(customer);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-rose-600 border-rose-200 hover:bg-rose-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCustomer(customer);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Delete
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
            <CardTitle>Customer List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => {
                  const customerVehicles = dummyVehicles.filter((v) =>
                    customer.vehicles.includes(v.id)
                  );

                  return (
                    <TableRow
                      key={customer.id}
                      className="hover:bg-indigo-50/30 cursor-pointer"
                      onClick={() =>
                        router.push(`/dashboard/customers/${customer.id}`)
                      }
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className={`${getAvatarColor(customer.id)}`}>
                            <AvatarFallback className="text-white">
                              {getInitials(customer.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {customer.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{customer.phone}</div>
                      </TableCell>
                      <TableCell>
                        {customerVehicles.length === 0 ? (
                          <span className="text-muted-foreground text-sm">
                            No vehicles
                          </span>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {customerVehicles.map((vehicle) => (
                              <Badge
                                key={vehicle.id}
                                variant="outline"
                                className="bg-emerald-50 border-emerald-200 text-emerald-700 text-xs"
                              >
                                {vehicle.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div
                          className="text-sm max-w-[200px] truncate"
                          title={customer.address}
                        >
                          {customer.address}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div
                          className="flex justify-end gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(
                                `/dashboard/customers/${customer.id}`
                              );
                            }}
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCustomer(customer);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCustomer(customer);
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

      {/* Add Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Add New Customer</DialogTitle>
          </DialogHeader>
          <AddCustomerForm
            onSubmit={handleAddCustomer}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Customer</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <EditCustomerForm
              customer={selectedCustomer}
              onSubmit={handleEditCustomer}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-rose-600">
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <DeleteConfirmation
              customerName={selectedCustomer.name}
              onConfirm={handleDeleteCustomer}
              onCancel={() => setIsDeleteDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
