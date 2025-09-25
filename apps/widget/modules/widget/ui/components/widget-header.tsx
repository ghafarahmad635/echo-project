import { cn } from "@workspace/ui/lib/utils";

export const WidgetHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <header
        className={cn(
            "bg-gradient-to-b from-primary to-primary/90 text-primary-foreground p-4",
            className
        )}
        >

      {children}
    </header>
  );
};
