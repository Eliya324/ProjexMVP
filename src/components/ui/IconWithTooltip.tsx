import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function IconWithTooltip({
  icon: Icon,
  label,
  className = "",
}: {
  icon: React.ElementType;
  label: string;
  className?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-pointer">
            <Icon className={cn("default-icon-class", className)} />
          </span>
        </TooltipTrigger>
        <TooltipContent className="rounded-xl bg-zinc-700 text-white text-sm px-3 py-1 shadow-lg">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
