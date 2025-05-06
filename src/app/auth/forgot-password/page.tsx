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
});

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const { error } = await authClient.forgetPassword({ email: data.email });

      if (error) {
        setError("root", { message: error.message });
        return;
      }
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
          <h1 className="text-3xl font-bold text-gray-800">Reset Password</h1>
          <p className="text-gray-600 mt-2 text-center">
            Enter your email to receive a password reset link
          </p>
        </div>

        {isSubmitSuccessful ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="text-green-600 font-medium">
              Password reset email sent!
            </div>
            <p className="text-gray-600">
              Check your email for instructions to reset your password.
            </p>
            <Button
              onClick={() => router.push("/auth/login")}
              className="w-full mt-4"
            >
              Back to Login
            </Button>
          </motion.div>
        ) : (
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
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          Remember your password?{" "}
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
