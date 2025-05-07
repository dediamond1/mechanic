"use client";

import React from "react";
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
  Car,
  Calendar,
  Fingerprint,
  CreditCard,
  FileText,
  Clock,
} from "lucide-react";

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
  mileage: z.coerce
    .number()
    .int()
    .min(0, { message: "Mileage must be positive." }),
  notes: z.string().optional(),
});

type EditVehicleFormProps = {
  vehicle: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    vin: string;
    mileage: number;
    notes?: string;
  };
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
};

export default function EditVehicleForm({
  vehicle,
  onSubmit,
  onCancel,
}: EditVehicleFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      licensePlate: vehicle.licensePlate,
      vin: vehicle.vin,
      mileage: vehicle.mileage,
      notes: vehicle.notes || "",
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
                    <Input className="pl-10 py-6 bg-slate-50" {...field} />
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
                    <Input className="pl-10 py-6 bg-slate-50" {...field} />
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
                    <Input className="pl-10 py-6 bg-slate-50" {...field} />
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
            name="mileage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Current Mileage</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="number"
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
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Notes</FormLabel>
              <FormControl>
                <div className="relative">
                  <FileText className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Textarea
                    className="pl-10 pt-6 min-h-[150px] bg-slate-50"
                    placeholder="Enter any important notes about this vehicle..."
                    {...field}
                  />
                </div>
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
            Update Vehicle
          </Button>
        </div>
      </form>
    </Form>
  );
}
