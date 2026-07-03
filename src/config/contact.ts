// Single source of truth for Rizwan Furniture contact details.
// Edit these values to update Call/WhatsApp/Email links across the app.

export const CONTACT = {
  /** Displayed phone number */
  phone: "+91 98765 43210",
  /** Number for tel: links (no spaces) */
  phoneTel: "+919876543210",
  /** WhatsApp number in international format, digits only */
  whatsapp: "919876543210",
  /** Support email */
  email: "hello@rizwanfurniture.com",
  /** Full brand address (for footer / contact) */
  address: "Rizwan Furniture Studio, MG Road, Bengaluru 560001",
} as const;

export const whatsappUrl = (message = "Hi Rizwan Furniture, I'd like to know more."): string =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
