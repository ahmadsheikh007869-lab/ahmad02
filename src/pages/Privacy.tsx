import { Layout } from "@/components/Layout";

const sections = [
  {
    h: "What we collect",
    p: "When you request a consultation, place an order or contact support, we collect your name, phone number, email address and delivery address. Nothing else is gathered.",
  },
  {
    h: "How we use it",
    p: "Your details are used only to respond to enquiries, process orders and arrange delivery or installation. We never sell or rent customer data to third parties.",
  },
  {
    h: "Cookies & local storage",
    p: "Your cart, wishlist and recently viewed items are stored locally in your browser so they survive a page refresh. Clearing site data removes them completely.",
  },
  {
    h: "Your choices",
    p: "You can ask us to update or delete your details at any time by writing to our support email. We will action the request within 30 days.",
  },
];

const Privacy = () => (
  <Layout>
    <section className="py-20 md:py-28">
      <div className="container-narrow">
        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-4">Legal</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground leading-[1.9] mb-12">
          This is a demo storefront, so the policy below is illustrative sample copy rather than a
          binding legal document.
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

export default Privacy;
