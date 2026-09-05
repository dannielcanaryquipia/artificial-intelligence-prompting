import type { ReactNode } from "react";
import { cn } from "cn";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface GlossaryDefinition {
  term: string;
  definition: ReactNode;
}

interface GlossaryTermProps {
  term: string;
  definition?: ReactNode;
  definitions?: GlossaryDefinition[];
  children?: ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
}

export function GlossaryTerm({
  term,
  definition,
  definitions = [],
  children,
  className,
  open,
  onOpenChange,
  hideTrigger = false,
}: GlossaryTermProps) {
  const list: GlossaryDefinition[] =
    definitions.length > 0
      ? definitions
      : definition !== undefined
        ? [{ term, definition }]
        : [];

  const trigger = children ?? term;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!hideTrigger && (
        <DialogTrigger asChild>
          <button
            type="button"
            aria-haspopup="dialog"
            className={cn(
              "inline cursor-pointer rounded-[2px] underline decoration-dotted decoration-accent-deep/60 underline-offset-4",
              "text-accent-deep transition-colors duration-150 hover:text-accent",
              "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
              className
            )}
          >
            {trigger}
          </button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogTitle className="pr-8">
          {list.length === 1
            ? list[0].term
            : list.map((item) => item.term).join(" + ")}
        </DialogTitle>
        <div className="space-y-4">
          {list.map((item) => (
            <div key={item.term}>
              {list.length > 1 && (
                <h4 className="font-sans text-sm font-semibold text-accent mb-1">
                  {item.term}
                </h4>
              )}
              <p className="font-sans text-sm text-content-secondary leading-relaxed">
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}