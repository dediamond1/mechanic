"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
    terms: z.literal<boolean>(true, {
      errorMap: () => ({ message: "You must accept the terms" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  const password = watch("password");

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const { name, email, password } = data;
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (error) {
        setError("root", { message: error.message });
        return;
      }

      router.push("/verify-email");
    } catch (err) {
      setError("root", { message: "An unexpected error occurred" });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 bg-[url('/public/wrench-pattern.svg')] bg-cover bg-opacity-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-lg border border-gray-200"
      >
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="John Smith"
              {...register("name")}
              className={`${
                errors.name ? "border-red-500" : "border-gray-300"
              } bg-gray-50 p-5`}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500"
              >
                {errors.name.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="mechanic@example.com"
              {...register("email")}
              className={`${
                errors.email ? "border-red-500" : "border-gray-300"
              } bg-gray-50 p-5`}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              {...register("password")}
              className={`${
                errors.password ? "border-red-500" : "border-gray-300"
              } bg-gray-50 p-5`}
            />
            <div className="h-1 w-full bg-gray-200 rounded-full mt-1">
              <div
                className={`h-full rounded-full ${
                  password?.length > 11
                    ? "bg-green-500"
                    : password?.length > 7
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{
                  width: `${Math.min(100, (password?.length || 0) * 8)}%`,
                }}
              />
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500"
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-gray-700 font-medium"
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className={`${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } bg-gray-50 p-5`}
            />
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500"
              >
                {errors.confirmPassword.message}
              </motion.p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              {...register("terms", { required: "You must accept the terms" })}
            />
            <Label htmlFor="terms">
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms
              </a>
            </Label>
          </div>
          {errors.terms && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500"
            >
              {errors.terms.message}
            </motion.p>
          )}

          {errors.root && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500"
            >
              {errors.root.message}
            </motion.p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login here
          </a>
        </p>
      </motion.div>
    </div>
  );
}
