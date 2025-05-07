"use client";

import React from "react";
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
import { Car, Calendar, Fingerprint, CreditCard } from "lucide-react";

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
});

type AddVehicleFormProps = {
  customerId: string;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
};

export default function AddVehicleForm({
  customerId,
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
                    className="pl-10 py-6 bg-slate-50 font-mono"
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
            className="bg-indigo-600 hover:bg-indigo-700 px-6"
          >
            Add Vehicle
          </Button>
        </div>
      </form>
    </Form>
  );
}
