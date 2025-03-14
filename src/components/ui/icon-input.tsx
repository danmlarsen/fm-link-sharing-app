import { cn } from "@/lib/utils";
import { FormMessage } from "./form";

export default function IconInput({
  className,
  icon,
  ...props
}: React.ComponentProps<"input"> & { icon: React.ReactNode }) {
  const Icon = () => icon;

  return (
    <div className="has-[aria-invalid]:border-destructive has-[aria-invalid]:ring-destructive/20 grid grid-cols-[1fr_200px] rounded-md border bg-white p-3">
      <div className="flex items-center gap-3">
        <Icon />
        <input
          className={cn("w-full outline-none", className)}
          {...props}
          aria-invalid={true}
        />
      </div>
      <div className="flex items-center justify-end">
        <FormMessage />
      </div>
    </div>
  );
}
