"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  Clock,
  Car,
  User,
  Wrench,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  date: z.date({
    required_error: "Appointment date is required",
  }),
  time: z.string({
    required_error: "Appointment time is required",
  }),
  customerId: z.string({
    required_error: "Customer is required",
  }),
  customerName: z.string(),
  vehicleId: z.string({
    required_error: "Vehicle is required",
  }),
  vehicleName: z.string(),
  employeeId: z.string({
    required_error: "Employee is required",
  }),
  employeeName: z.string(),
  services: z.array(z.string()).min(1, {
    message: "Select at least one service",
  }),
  notes: z.string().optional(),
  status: z.string(),
});

// Dummy data for the form
const dummyCustomers = [
  { id: "c1", name: "John Smith" },
  { id: "c2", name: "Sarah Williams" },
  { id: "c3", name: "Michael Johnson" },
  { id: "c4", name: "Emily Davis" },
  { id: "c5", name: "David Wilson" },
  { id: "c6", name: "Alex Martinez" },
];

const dummyVehicles = [
  { id: "v1", name: "Toyota Camry 2018", customerId: "c1" },
  { id: "v2", name: "Honda Civic 2020", customerId: "c2" },
  { id: "v3", name: "Ford F-150 2019", customerId: "c3" },
  { id: "v4", name: "Chevrolet Malibu 2017", customerId: "c4" },
  { id: "v5", name: "Nissan Altima 2021", customerId: "c5" },
  { id: "v6", name: "Tesla Model 3 2022", customerId: "c6" },
];

const dummyEmployees = [
  { id: "1", name: "John Smith", role: "manager" },
  { id: "2", name: "Jane Doe", role: "employee" },
  { id: "3", name: "Robert Johnson", role: "admin" },
  { id: "4", name: "Lisa Chen", role: "employee" },
  { id: "5", name: "Michael Brown", role: "employee" },
];

const dummyServices = [
  { id: "s1", name: "Oil Change", price: 45 },
  { id: "s2", name: "Tire Rotation", price: 35 },
  { id: "s3", name: "Brake Inspection", price: 65 },
  { id: "s4", name: "Air Filter Replacement", price: 25 },
  { id: "s5", name: "Engine Diagnostic", price: 95 },
  { id: "s6", name: "Transmission Service", price: 150 },
  { id: "s7", name: "Wheel Alignment", price: 85 },
  { id: "s8", name: "Battery Replacement", price: 120 },
  { id: "s9", name: "AC Service", price: 110 },
  { id: "s10", name: "Coolant Flush", price: 75 },
  { id: "s11", name: "Electric System Diagnostic", price: 125 },
  { id: "s12", name: "Tire Inspection", price: 15 },
];

type EditAppointmentFormProps = {
  appointment: any;
  onSubmit: (values: any) => void;
  onCancel: () => void;
};

export default function EditAppointmentForm({
  appointment,
  onSubmit,
  onCancel,
}: EditAppointmentFormProps) {
  const [availableVehicles, setAvailableVehicles] = useState<any[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Find customer, vehicle, and employee details
  const customer = dummyCustomers.find((c) => c.name === appointment.customer);
  const vehicle = dummyVehicles.find((v) => v.name === appointment.vehicle);
  const employee = dummyEmployees.find((e) => e.name === appointment.employee);

  // Find service IDs from service names
  const serviceIds = appointment.services
    .map(
      (serviceName: string) =>
        dummyServices.find((s) => s.name === serviceName)?.id || ""
    )
    .filter(Boolean);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(appointment.date),
      time: new Date(appointment.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      customerId: customer?.id || "",
      customerName: appointment.customer,
      vehicleId: vehicle?.id || "",
      vehicleName: appointment.vehicle,
      employeeId: employee?.id || "",
      employeeName: appointment.employee,
      services: serviceIds,
      notes: appointment.notes || "",
      status: appointment.status,
    },
  });

  useEffect(() => {
    // Set selected services
    setSelectedServices(form.getValues("services"));

    // Set available vehicles based on the selected customer
    const customerId = form.getValues("customerId");
    if (customerId) {
      const customerVehicles = dummyVehicles.filter(
        (vehicle) => vehicle.customerId === customerId
      );
      setAvailableVehicles(customerVehicles);
    }
  }, [form]);

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    // Format the date and time
    const dateTime = new Date(values.date);
    const [hours, minutes] = values.time.split(":").map(Number);
    dateTime.setHours(hours, minutes);

    // Get service names
    const serviceNames = values.services.map(
      (serviceId) => dummyServices.find((s) => s.id === serviceId)?.name || ""
    );

    // Prepare the appointment data for submission
    const appointmentData = {
      ...appointment,
      date: dateTime.toISOString(),
      customer: values.customerName,
      vehicle: values.vehicleName,
      vehicleId: values.vehicleId,
      status: values.status,
      services: serviceNames,
      employee: values.employeeName,
      employeeId: values.employeeId,
      notes: values.notes || "",
    };

    onSubmit(appointmentData);
  };

  // Handle customer selection to filter vehicles
  const handleCustomerChange = (customerId: string) => {
    const customer = dummyCustomers.find((c) => c.id === customerId);

    form.setValue("customerId", customerId);
    form.setValue("customerName", customer?.name || "");
    form.setValue("vehicleId", ""); // Reset vehicle when customer changes
    form.setValue("vehicleName", "");

    // Filter vehicles for the selected customer
    const customerVehicles = dummyVehicles.filter(
      (vehicle) => vehicle.customerId === customerId
    );
    setAvailableVehicles(customerVehicles);
  };

  // Handle vehicle selection
  const handleVehicleChange = (vehicleId: string) => {
    const vehicle = dummyVehicles.find((v) => v.id === vehicleId);

    form.setValue("vehicleId", vehicleId);
    form.setValue("vehicleName", vehicle?.name || "");
  };

  // Handle employee selection
  const handleEmployeeChange = (employeeId: string) => {
    const employee = dummyEmployees.find((e) => e.id === employeeId);

    form.setValue("employeeId", employeeId);
    form.setValue("employeeName", employee?.name || "");
  };

  // Handle service selection
  const handleServiceToggle = (serviceId: string) => {
    const currentServices = form.getValues("services");
    let updatedServices;

    if (currentServices.includes(serviceId)) {
      updatedServices = currentServices.filter((id) => id !== serviceId);
    } else {
      updatedServices = [...currentServices, serviceId];
    }

    form.setValue("services", updatedServices);
    setSelectedServices(updatedServices);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Field */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-base">Appointment Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal flex justify-between items-center h-12 bg-slate-50",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Time Field */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Appointment Time</FormLabel>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <FormControl>
                    <Input
                      type="time"
                      className="pl-10 h-12 bg-slate-50"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Customer Field */}
          <FormField
            control={form.control}
            name="customerId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-base">Customer</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between flex items-center h-12 bg-slate-50",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                          {field.value
                            ? dummyCustomers.find(
                                (customer) => customer.id === field.value
                              )?.name
                            : "Select customer"}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[300px]">
                    <Command>
                      <CommandInput placeholder="Search customer..." />
                      <CommandEmpty>No customer found.</CommandEmpty>
                      <CommandGroup>
                        {dummyCustomers.map((customer) => (
                          <CommandItem
                            key={customer.id}
                            value={customer.name}
                            onSelect={() => handleCustomerChange(customer.id)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                customer.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {customer.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Vehicle Field */}
          <FormField
            control={form.control}
            name="vehicleId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-base">Vehicle</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between flex items-center h-12 bg-slate-50",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={availableVehicles.length === 0}
                      >
                        <div className="flex items-center gap-2">
                          <Car className="h-5 w-5 text-muted-foreground" />
                          {field.value
                            ? dummyVehicles.find(
                                (vehicle) => vehicle.id === field.value
                              )?.name
                            : availableVehicles.length === 0
                            ? "Select customer first"
                            : "Select vehicle"}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[300px]">
                    <Command>
                      <CommandInput placeholder="Search vehicle..." />
                      <CommandEmpty>No vehicle found.</CommandEmpty>
                      <CommandGroup>
                        {availableVehicles.map((vehicle) => (
                          <CommandItem
                            key={vehicle.id}
                            value={vehicle.name}
                            onSelect={() => handleVehicleChange(vehicle.id)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                vehicle.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {vehicle.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Employee Field */}
          <FormField
            control={form.control}
            name="employeeId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-base">Assigned Employee</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between flex items-center h-12 bg-slate-50",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-5 w-5 text-muted-foreground" />
                          {field.value
                            ? dummyEmployees.find(
                                (employee) => employee.id === field.value
                              )?.name
                            : "Assign employee"}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[300px]">
                    <Command>
                      <CommandInput placeholder="Search employee..." />
                      <CommandEmpty>No employee found.</CommandEmpty>
                      <CommandGroup>
                        {dummyEmployees.map((employee) => (
                          <CommandItem
                            key={employee.id}
                            value={employee.name}
                            onSelect={() => handleEmployeeChange(employee.id)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                employee.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {employee.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status Field */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 bg-slate-50">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Services Field */}
        <FormField
          control={form.control}
          name="services"
          render={() => (
            <FormItem>
              <FormLabel className="text-base">Services</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-1">
                {dummyServices.map((service) => (
                  <div
                    key={service.id}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors",
                      selectedServices.includes(service.id)
                        ? "bg-blue-50 border-blue-200"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    )}
                    onClick={() => handleServiceToggle(service.id)}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center border",
                        selectedServices.includes(service.id)
                          ? "bg-blue-600 border-blue-600"
                          : "bg-white border-slate-300"
                      )}
                    >
                      {selectedServices.includes(service.id) && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{service.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ${service.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes Field */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes about this appointment..."
                  className="min-h-[100px] bg-slate-50"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" onClick={onCancel} className="px-6">
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 px-6"
          >
            Update Appointment
          </Button>
        </div>
      </form>
    </Form>
  );
}
