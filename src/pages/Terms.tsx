import { Layout } from "@/components/Layout";

const sections = [
  {
    h: "Using this site",
    p: "Velmora Home is presented here as a portfolio demonstration. Product listings, prices and stock are sample data and no commercial transaction is completed.",
  },
  {
    h: "Orders & bookings",
    p: "Submitting an order request or booking starts a conversation — it is not a confirmed sale. Pricing is confirmed in writing before any custom build begins.",
  },
  {
    h: "Pricing & taxes",
    p: "All prices are shown in US dollars and are inclusive of applicable taxes. Made-to-order pieces may be quoted separately based on final measurements.",
  },
  {
    h: "Warranty & liability",
    p: "Structural warranty covers manufacturing defects for five years. Normal wear, accidental damage and unauthorised modification are not covered.",
  },
];

const Terms = () => (
  <Layout>
    <section className="py-20 md:py-28">
      <div className="container-narrow">
        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-4">Legal</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6">Terms of Service</h1>
        <p className="text-muted-foreground leading-[1.9] mb-12">
          Sample terms for a demo project. They illustrate the structure a live storefront would use.
        </p>
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-serif text-2xl mb-3">{s.h}</h2>
              <p className="text-muted-foreground leading-[1.9]">{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Terms;
