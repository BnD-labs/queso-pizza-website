import { SITE, formatPhone } from "@/lib/site-config";

/*
 * What happens after you send.
 *
 * Domino's Tracker's actual contribution was never the tracking — it was
 * closing the "did that work?" gap between paying and eating. Queso has no
 * backend to track anything, but the same anxiety exists and it costs orders:
 * the flow ends by throwing the customer into a different app, and the phone
 * call that actually confirms the order looks optional unless you say otherwise.
 *
 * This is explanatory copy only. It must never grow a send or call button —
 * duplicated CTAs on the order surface invite "did I just send two orders?"
 * (CLAUDE.md), which is the opposite of what this is for.
 */

const STEPS = [
  {
    title: "Send on WhatsApp",
    body: "Your order opens in WhatsApp already itemized — just hit send.",
  },
  {
    title: "We confirm by phone",
    body: `Tap Call to Confirm and speak to the shop on ${formatPhone(
      SITE.phones.callToConfirm,
    )}. The call is what locks the order in.`,
  },
  {
    title: "We start cooking",
    body: "We'll agree collection or delivery with you on that call.",
  },
];

export function OrderNextSteps() {
  return (
    <div className="border-t border-queso-cream/15 pt-5">
      <p className="pb-4 font-body text-xs font-bold uppercase tracking-[0.12em] text-queso-cream/65">
        What happens next
      </p>
      <ol className="grid gap-4 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-1.5">
            <span
              aria-hidden
              className="flex h-7 w-7 items-center justify-center rounded-full bg-queso-red font-body text-xs font-bold text-queso-cream"
            >
              {i + 1}
            </span>
            <h3 className="font-body text-sm font-bold text-queso-cream">
              {step.title}
            </h3>
            <p className="font-body text-xs leading-relaxed text-queso-cream/65">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
