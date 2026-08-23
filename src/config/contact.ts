// Single source of truth for Nordhaven contact details.
// Edit these values to update Call/WhatsApp/Email links across the app.

export const CONTACT = {
  /** Displayed phone number */
  phone: "+91 98765 43210",
  /** Number for tel: links (no spaces) */
  phoneTel: "+919876543210",
  /** WhatsApp number in international format, digits only */
  whatsapp: "919876543210",
  /** Support email */
  email: "hello@nordhaven.com",
  /** Full brand address (for footer / contact) */
  address: "Nordhaven Studio, MG Road, Bengaluru 560001",
  /** Business hours */
  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 8:00 PM" },
    { days: "Sunday", time: "11:00 AM – 6:00 PM" },
  ],
} as const;

export const whatsappUrl = (message = "Hi Nordhaven, I'd like to know more."): string =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
