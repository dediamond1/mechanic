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

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const { email, password } = data;
      const { error } = await authClient.signIn.email({ email, password });

      if (error) {
        console.log(error);
        // Handle specific error codes
        switch (error.code) {
          case "INVALID_EMAIL_OR_PASSWORD":
            setError("email", {
              type: "manual",
              message: "Invalid email or password",
            });
            setError("password", {
              type: "manual",
              message: "Invalid email or password",
            });
            break;
          case "EMAIL_NOT_VERIFIED":
            setError("email", {
              type: "manual",
              message: "Please verify your email address",
            });
            break;
          default:
            setError("email", {
              type: "manual",
              message: error.message || "An unexpected error occurred",
            });
            break;
        }
        return;
      }

      // Successful login
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("email", {
        type: "manual",
        message: "An unexpected error occurred. Please try again.",
      });
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
          <h1 className="text-3xl font-bold text-gray-800">Login</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              placeholder="Enter your password"
              {...register("password")}
              className={`${
                errors.password ? "border-red-500" : "border-gray-300"
              } bg-gray-50 p-5`}
            />
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

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <a
              href="/auth/forgot-password"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Need an account?{" "}
          <a
            href="/auth/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register here
          </a>
        </p>
      </motion.div>
    </div>
  );
}
