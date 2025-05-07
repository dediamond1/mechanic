"use client";

import React, { useState } from "react";
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import AddEmployeeForm from "@/components/ui/add-employee-form";
import EditEmployeeForm from "@/components/ui/edit-employee-form";
import DeleteConfirmation from "@/components/ui/delete-confirmation";

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

export default function EmployeesPage() {
  const router = useRouter();
  const [employees, setEmployees] = useState(dummyEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm)
  );

  const handleAddEmployee = (newEmployee: any) => {
    const id = (employees.length + 1).toString();
    setEmployees([
      ...employees,
      {
        ...newEmployee,
        id,
        appointments: [],
        createdAt: new Date().toISOString().split("T")[0],
      },
    ]);
    setIsAddDialogOpen(false);
  };

  const handleEditEmployee = (updatedEmployee: any) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    setIsEditDialogOpen(false);
  };

  const handleDeleteEmployee = () => {
    setEmployees(employees.filter((emp) => emp.id !== selectedEmployee.id));
    setIsDeleteDialogOpen(false);
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-xl shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-white">Employees</h1>
          <p className="text-blue-100">Manage your workshop team members</p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-white text-blue-600 hover:bg-blue-50"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <div className="flex items-center rounded-lg border bg-card shadow-sm p-4">
        <Search className="h-5 w-5 text-muted-foreground ml-2 mr-3" />
        <Input
          type="search"
          placeholder="Search employees by name, email, or phone..."
          className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card className="border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[300px]">Employee</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Appointments</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow
                  key={employee.id}
                  className="hover:bg-blue-50/30 cursor-pointer"
                  onClick={() =>
                    router.push(`/dashboard/employees/${employee.id}`)
                  }
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className={`${getAvatarColor(employee.id)}`}>
                        <AvatarFallback className="text-white">
                          {getInitials(employee.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {employee.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getRoleBadgeColor(
                        employee.role
                      )} text-white capitalize px-3 py-1`}
                    >
                      {employee.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{employee.phone}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <div
                        className={`size-6 rounded-full flex items-center justify-center ${
                          employee.appointments.length > 0
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {employee.appointments.length}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {employee.appointments.length === 1
                          ? "appointment"
                          : "appointments"}
                      </span>
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
                        className="rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/dashboard/employees/${employee.id}`);
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
                          setSelectedEmployee(employee);
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
                          setSelectedEmployee(employee);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredEmployees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                        <Search className="size-6" />
                      </div>
                      <p className="font-medium">No employees found</p>
                      <p className="text-sm text-muted-foreground">
                        Try a different search term
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Employee Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Add New Employee</DialogTitle>
          </DialogHeader>
          <AddEmployeeForm
            onSubmit={handleAddEmployee}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Employee</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <EditEmployeeForm
              employee={selectedEmployee}
              onSubmit={handleEditEmployee}
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
          {selectedEmployee && (
            <DeleteConfirmation
              employeeName={selectedEmployee.name}
              onConfirm={handleDeleteEmployee}
              onCancel={() => setIsDeleteDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
