import { cn } from "@/lib/utils";

export default function IconInput({
  className,
  icon,
  ...props
}: React.ComponentProps<"input"> & { icon: React.ReactNode }) {
  const Icon = () => icon;

  return (
    <div className="flex items-center gap-3 rounded-md border bg-white p-3">
      <Icon />
      <input className={cn("w-full outline-none", className)} {...props} />
    </div>
  );
}
