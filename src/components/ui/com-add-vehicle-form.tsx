"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import {
  Car,
  Calendar,
  Fingerprint,
  CreditCard,
  User,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const currentYear = new Date().getFullYear();

const formSchema = z.object({
  make: z.string().min(1, {
    message: "Make is required.",
  }),
  model: z.string().min(1, {
    message: "Model is required.",
  }),
  year: z.coerce
    .number()
    .int()
    .min(1886, { message: "Year must be 1886 or later." })
    .max(currentYear + 1, {
      message: `Year cannot be after ${currentYear + 1}.`,
    }),
  licensePlate: z.string().min(1, {
    message: "License plate is required.",
  }),
  vin: z
    .string()
    .min(17, { message: "VIN must be 17 characters." })
    .max(17, { message: "VIN must be 17 characters." })
    .regex(/^[A-HJ-NPR-Z0-9]{17}$/, { message: "Enter a valid VIN format." }),
  customerId: z.string({
    required_error: "Owner is required",
  }),
});

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type AddVehicleFormProps = {
  customers: Customer[];
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
};

export default function AddVehicleForm({
  customers,
  onSubmit,
  onCancel,
}: AddVehicleFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: "",
      model: "",
      year: currentYear,
      licensePlate: "",
      vin: "",
      customerId: "",
    },
  });

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Make</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Car className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Toyota"
                      className="pl-10 py-6 bg-slate-50"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Model</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Car className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Camry"
                      className="pl-10 py-6 bg-slate-50"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Year</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder={currentYear.toString()}
                      className="pl-10 py-6 bg-slate-50"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.valueAsNumber);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="licensePlate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">License Plate</FormLabel>
                <FormControl>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="ABC123"
                      className="pl-10 py-6 bg-slate-50"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="vin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">
                Vehicle Identification Number (VIN)
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Fingerprint className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="1HGCM82633A123456"
                    className="pl-10 py-6 bg-slate-50 font-mono uppercase"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customerId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-base">Owner</FormLabel>
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
                          ? customers.find(
                              (customer) => customer.id === field.value
                            )?.name
                          : "Select owner"}
                      </div>
                      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[300px]">
                  <Command>
                    <CommandInput placeholder="Search owner..." />
                    <CommandEmpty>No owner found.</CommandEmpty>
                    <CommandGroup>
                      {customers.map((customer) => (
                        <CommandItem
                          key={customer.id}
                          value={customer.name}
                          onSelect={() => {
                            form.setValue("customerId", customer.id);
                          }}
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

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" onClick={onCancel} className="px-6">
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 px-6"
          >
            Register Vehicle
          </Button>
        </div>
      </form>
    </Form>
  );
}
