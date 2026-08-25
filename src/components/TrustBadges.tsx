import { ShieldCheck, Truck, RotateCcw, BadgeCheck } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Secure Payment", note: "UPI, cards & net banking" },
  { icon: Truck, label: "Free Delivery", note: "On orders above $999" },
  { icon: RotateCcw, label: "Easy Returns", note: "7-day no-questions window" },
  { icon: BadgeCheck, label: "5-Year Warranty", note: "On every structural build" },
];

export const TrustBadges = () => (
  <section className="border-y border-border bg-linen/60" aria-label="Store guarantees">
    <div className="container-full">
      <ul className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border/70">
        {badges.map(({ icon: Icon, label, note }) => (
          <li key={label} className="flex items-center gap-3 px-4 py-6 md:py-7">
            <Icon className="w-5 h-5 text-primary shrink-0" strokeWidth={1.5} />
            <span className="flex flex-col leading-tight">
              <span className="text-[11px] md:text-xs font-semibold tracking-[0.16em] uppercase text-foreground">
                {label}
              </span>
              <span className="text-[11px] text-muted-foreground mt-1 hidden sm:block">{note}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
