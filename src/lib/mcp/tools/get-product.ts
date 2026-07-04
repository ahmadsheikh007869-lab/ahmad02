import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { products } from "../../data/products";

export default defineTool({
  name: "get_product",
  title: "Get product details",
  description: "Fetch full details for one product by its slug or product code.",
  inputSchema: {
    slugOrCode: z.string().min(1).describe("The product slug (e.g. 'arc-pendant-light') or productCode."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slugOrCode }) => {
    const needle = slugOrCode.trim().toLowerCase();
    const p = products.find(
      (x) => x.slug.toLowerCase() === needle || x.productCode.toLowerCase() === needle,
    );
    if (!p) {
      return {
        content: [{ type: "text", text: `No product found for '${slugOrCode}'.` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(p, null, 2) }],
      structuredContent: { product: p },
    };
  },
});
