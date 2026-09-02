// Single source of truth for Velmora Home contact details.
// Edit these values to update Call/WhatsApp/Email links across the app.

export const CONTACT = {
  /** Displayed phone number */
  phone: "+91 80****12",
  /** Number for tel: links (no spaces) — kept non-functional in the demo UI */
  phoneTel: "+910000000000",
  /** WhatsApp number in international format, digits only — kept non-functional in the demo UI */
  whatsapp: "910000000000",
  /** Shown next to the number to make the demo nature clear */
  label: "Demo Contact",

  /** Support email */
  email: "hello@velmorahome.com",
  /** Full brand address (for footer / contact) */
  address: "Velmora Home Studio, MG Road, Bengaluru 560001",
  /** Business hours */
  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 8:00 PM" },
    { days: "Sunday", time: "11:00 AM – 6:00 PM" },
  ],
} as const;

export const whatsappUrl = (message = "Hi Velmora Home, I'd like to know more."): string =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
