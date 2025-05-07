"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

type DeleteConfirmationProps = {
  employeeName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteConfirmation({
  employeeName,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  return (
    <div className="space-y-6">
      <div className="bg-rose-50 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="h-6 w-6 text-rose-600 mt-0.5" />
        <div>
          <p className="font-medium text-rose-800">
            You are about to delete{" "}
            <span className="font-bold">{employeeName}</span>
          </p>
          <p className="text-rose-700 mt-1">
            This action will permanently remove this employee from your system.
            All associated appointments will need to be reassigned.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" onClick={onCancel} className="px-6">
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          className="px-6 bg-rose-600 hover:bg-rose-700"
        >
          Delete Employee
        </Button>
      </div>
    </div>
  );
}
