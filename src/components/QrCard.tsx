import { QrCode } from "@phosphor-icons/react";
import { qrCaption, qrImageUrl } from "@/data/site";

export function QrCard() {
  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div className="rounded-xl border border-surface-border bg-surface p-3.5">
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
      <p className="font-sans text-xs text-content-muted">{qrCaption}</p>
    </div>
  );
}