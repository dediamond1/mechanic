import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

interface AuthLinksProps {
  page: "login" | "register" | "forgot-password";
  className?: string;
}

export function AuthLinks({ page, className }: AuthLinksProps) {
  return (
    <div className={cn("flex flex-col gap-2 mt-4 text-center", className)}>
      {page === "login" && (
        <>
          <Link
            href="/auth/forgot-password"
            className={buttonVariants({ variant: "link" })}
          >
            Forgot password?
          </Link>
          <Link
            href="/auth/register"
            className={buttonVariants({ variant: "link" })}
          >
            Don't have an account? Register
          </Link>
        </>
      )}
      {page === "register" && (
        <Link
          href="/auth/login"
          className={buttonVariants({ variant: "link" })}
        >
          Already have an account? Login
        </Link>
      )}
      {page === "forgot-password" && (
        <Link
          href="/auth/login"
          className={buttonVariants({ variant: "link" })}
        >
          Back to login
        </Link>
      )}
    </div>
  );
}
