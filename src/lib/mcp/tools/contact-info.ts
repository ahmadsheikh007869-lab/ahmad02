import { defineTool } from "@lovable.dev/mcp-js";
import { CONTACT, whatsappUrl } from "../../../config/contact.ts";

export default defineTool({
  name: "get_contact_info",
  title: "Get store contact info",
  description: "Return the Velmora Home store's phone, WhatsApp, and email contact details.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      phone: CONTACT.phone,
      phoneTel: CONTACT.phoneTel,
      whatsapp: CONTACT.whatsapp,
      whatsappUrl: whatsappUrl(),
      email: CONTACT.email,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
