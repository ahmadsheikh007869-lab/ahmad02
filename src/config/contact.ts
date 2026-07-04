// Single source of truth for Rizwan Furniture contact details.
// Edit these values to update Call/WhatsApp/Email links across the app.

export const CONTACT = {
  /** Displayed phone number */
  phone: "+91 63942 49533",
  /** Number for tel: links (no spaces) */
  phoneTel: "+916394249533",
  /** WhatsApp number in international format, digits only */
  whatsapp: "916394249533",
  /** Support email */
  email: "hello@rizwanfurniture.com",
  /** Full brand address (for footer / contact) */
  address: "Rizwan Furniture Studio, MG Road, Bengaluru 560001",
  /** Business hours */
  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 8:00 PM" },
    { days: "Sunday", time: "11:00 AM – 6:00 PM" },
  ],
} as const;

export const whatsappUrl = (message = "Hi Rizwan Furniture, I'd like to know more."): string =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
