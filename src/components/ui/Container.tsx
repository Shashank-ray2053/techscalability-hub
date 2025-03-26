
import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  className,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function SectionContainer({
  children,
  className,
  as = "section",
  ...props
}: ContainerProps) {
  return (
    <Container
      as={as}
      className={cn("py-16 md:py-24", className)}
      {...props}
    >
      {children}
    </Container>
  );
}
