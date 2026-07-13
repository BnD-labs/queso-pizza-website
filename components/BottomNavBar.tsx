import { SITE } from "@/lib/site-config";
import { PhoneIcon, WhatsAppIcon } from "./icons";

// Dual CTA per the order-handoff pattern: WhatsApp send + call-to-confirm are
// presented together at equal weight (see .claude/skills/whatsapp-order-builder).
// Phase 2: plain links. Phase 3 wires the compiled order text into wa.me.
export function BottomNavBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-queso-cream/10 bg-surface-footer p-4">
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        {/* whatsapp-green: approved exception, WhatsApp action buttons ONLY */}
        <a
          href={`https://wa.me/${SITE.phones.whatsappOrder.replace("+", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-1 items-center justify-center gap-2 bg-whatsapp-green font-body text-sm font-bold tracking-wide text-white"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Order on WhatsApp
        </a>
        <a
          href={`tel:${SITE.phones.callToConfirm}`}
          className="flex h-12 flex-1 items-center justify-center gap-2 bg-queso-red font-body text-sm font-bold tracking-wide text-white"
        >
          <PhoneIcon className="h-4 w-4" />
          Call to Confirm
        </a>
      </div>
    </div>
  );
}
