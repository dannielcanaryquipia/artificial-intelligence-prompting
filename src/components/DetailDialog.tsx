import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface DetailSection {
  heading: string;
  body: ReactNode;
}

interface DetailDialogProps {
  title: string;
  description?: string;
  sections: DetailSection[];
  children: ReactNode;
}

export function DetailDialog({
  title,
  description,
  sections,
  children,
}: DetailDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="pr-8">{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.heading}>
              <h4 className="font-sans text-sm font-semibold text-accent mb-1">
                {section.heading}
              </h4>
              <p className="font-sans text-sm text-content-secondary leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}