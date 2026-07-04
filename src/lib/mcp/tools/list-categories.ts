import { defineTool } from "@lovable.dev/mcp-js";
import { collections, products } from "@/data/products";

export default defineTool({
  name: "list_categories",
  title: "List categories",
  description: "List all furniture categories in the Rizwan Furniture catalog with product counts.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const rows = collections.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      productCount: products.filter((p) => p.collection === c.id).length,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { categories: rows },
    };
  },
});
