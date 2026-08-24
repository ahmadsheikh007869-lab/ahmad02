import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listCategoriesTool from "./tools/list-categories";
import searchProductsTool from "./tools/search-products";
import getProductTool from "./tools/get-product";
import contactInfoTool from "./tools/contact-info";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const MCP_RESOURCE = `${SUPABASE_URL}/functions/v1/mcp`;

export default defineMcp({
  name: "rizwan-furniture-mcp",
  title: "Nordhaven MCP",
  version: "0.1.0",
  instructions:
    "Tools for the Nordhaven catalog. Use `list_categories` to see all product categories, `search_products` to find items by keyword/category/price, `get_product` for full details on one product, and `get_contact_info` for store phone/WhatsApp/email.",
  // Require an OAuth access token issued by this project's auth server, so the
  // MCP endpoint is not callable anonymously once published.
  auth: auth.oauth.issuer({
    issuer: `${SUPABASE_URL}/auth/v1`,
    resource: MCP_RESOURCE,
    acceptedAudiences: ["authenticated"],
    resourceName: "Nordhaven MCP",
  }),
  tools: [listCategoriesTool, searchProductsTool, getProductTool, contactInfoTool],
});
