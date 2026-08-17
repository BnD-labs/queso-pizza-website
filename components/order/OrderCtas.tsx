"use client";

import { useState } from "react";
import { SITE } from "@/lib/site-config";
import { waOrderUrl } from "@/lib/order";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { useOrder } from "./OrderProvider";

// The paired order-handoff actions (skill spec §3–4): WhatsApp send and
// call-to-confirm together, equal visual weight. The call is framed as a
// normal part of completing the order — never as a fallback.
export function OrderCtas({ stacked = false }: { stacked?: boolean }) {
  const { lines } = useOrder();
  const [sent, setSent] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {sent ? (
        <p className="queso-enter text-center font-body text-sm font-bold text-queso-yellow">
          Order sent! Tap to call and confirm.
        </p>
      ) : null}
      {/* `stacked` means stacked on a phone only — from sm up the pair sits
          side by side so neither button spans the whole panel. */}
      <div
        className={`flex gap-2 ${stacked ? "flex-col sm:flex-row sm:items-center" : "items-center"}`}
      >
        {/* whatsapp-green: approved exception, WhatsApp action buttons ONLY */}
        <a
          href={waOrderUrl(SITE.phones.whatsappOrder, lines)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setSent(true)}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-control bg-whatsapp-green font-body text-sm font-bold tracking-wide text-white transition-[transform,filter] duration-[var(--dur-fast)] ease-[var(--ease-out-quart)] hover:brightness-110 active:scale-[0.98] active:brightness-95"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {lines.length > 0 ? "Send via WhatsApp" : "Order on WhatsApp"}
        </a>
        <a
          href={`tel:${SITE.phones.callToConfirm}`}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-control bg-queso-red font-body text-sm font-bold tracking-wide text-white transition-[transform,filter] duration-[var(--dur-fast)] ease-[var(--ease-out-quart)] hover:brightness-110 active:scale-[0.98] active:brightness-95"
        >
          <PhoneIcon className="h-4 w-4" />
          Call to Confirm
        </a>
      </div>
    </div>
  );
}
