import { QrCode } from "@phosphor-icons/react";
import { qrCaption, qrImageUrl } from "@/data/site";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function QrCard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group inline-flex flex-col items-center gap-2 cursor-pointer text-left"
          aria-label={`${qrCaption} — click to enlarge`}
        >
          <div className="rounded-xl border border-surface-border bg-surface p-3.5 transition-all duration-200 group-hover:border-accent/40 group-hover:shadow-md">
            {qrImageUrl ? (
              <img
                src={qrImageUrl}
                alt={qrCaption}
                className="h-36 w-36 rounded-md object-contain md:h-44 md:w-44"
              />
            ) : (
              <div
                title="Set qrImageUrl in src/data/site.ts"
                className="flex h-36 w-36 items-center justify-center rounded-md border-2 border-dashed border-surface-border text-content-muted md:h-44 md:w-44"
              >
                <QrCode size={56} weight="duotone" aria-hidden="true" />
              </div>
            )}
          </div>
          <p className="font-sans text-xs text-content-muted transition-colors duration-150 group-hover:text-content-secondary">
            {qrCaption}
          </p>
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="sr-only">{qrCaption}</DialogTitle>
        <div className="flex justify-center">
          {qrImageUrl ? (
            <img
              src={qrImageUrl}
              alt={qrCaption}
              className="h-auto w-full max-w-[280px] max-h-[70dvh] rounded-md object-contain"
            />
          ) : (
            <div className="flex h-[240px] w-[240px] items-center justify-center rounded-md border-2 border-dashed border-surface-border text-content-muted">
              <QrCode size={96} weight="duotone" aria-hidden="true" />
            </div>
          )}
        </div>
        <p className="text-center font-sans text-sm text-content-secondary">
          {qrCaption}
        </p>
      </DialogContent>
    </Dialog>
  );
}