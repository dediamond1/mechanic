import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { cn } from "@/lib/utils";
import { Wrench } from "lucide-react";

interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export default function AuthCard({
  title,
  description,
  className,
  children,
  ...props
}: AuthCardProps) {
  return (
    <Card className={cn("w-[400px] mx-auto mt-12", className)} {...props}>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center gap-2">
          <Wrench className="h-8 w-8 text-primary" />
          <CardTitle className="text-2xl">{title}</CardTitle>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground text-center">
            {description}
          </p>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
