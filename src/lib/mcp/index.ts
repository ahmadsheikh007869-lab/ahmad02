import { defineMcp } from "@lovable.dev/mcp-js";
import listCategoriesTool from "./tools/list-categories";
import searchProductsTool from "./tools/search-products";
import getProductTool from "./tools/get-product";
import contactInfoTool from "./tools/contact-info";

export default defineMcp({
  name: "rizwan-furniture-mcp",
  title: "Nordhaven MCP",
  version: "0.1.0",
  instructions:
    "Tools for the Nordhaven catalog. Use `list_categories` to see all product categories, `search_products` to find items by keyword/category/price, `get_product` for full details on one product, and `get_contact_info` for store phone/WhatsApp/email.",
  tools: [listCategoriesTool, searchProductsTool, getProductTool, contactInfoTool],
});
