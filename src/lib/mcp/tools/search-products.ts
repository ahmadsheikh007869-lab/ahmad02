import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { products } from "../../../data/products.ts";

export default defineTool({
  name: "search_products",
  title: "Search products",
  description:
    "Search the Velmora Home catalog by keyword, category, price range, or flags (new, bestSeller, trending). Returns matching products with name, category, price, and product code.",
  inputSchema: {
    query: z.string().optional().describe("Free-text query matched against name, description, material, finish, color, style, and product code."),
    category: z.string().optional().describe("Category id or slug (e.g. 'beds', 'wardrobes')."),
    minPrice: z.number().optional().describe("Minimum price in USD."),
    maxPrice: z.number().optional().describe("Maximum price in USD."),
    onlyNew: z.boolean().optional(),
    onlyBestSeller: z.boolean().optional(),
    onlyTrending: z.boolean().optional(),
    limit: z.number().int().min(1).max(50).optional().describe("Max results to return (default 10)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, category, minPrice, maxPrice, onlyNew, onlyBestSeller, onlyTrending, limit }) => {
    const q = query?.trim().toLowerCase();
    const cat = category?.trim().toLowerCase();
    const results = products
      .filter((p) => {
        if (cat && p.collection.toLowerCase() !== cat) return false;
        if (minPrice != null && p.price < minPrice) return false;
        if (maxPrice != null && p.price > maxPrice) return false;
        if (onlyNew && !p.new) return false;
        if (onlyBestSeller && !p.bestSeller) return false;
        if (onlyTrending && !p.trending) return false;
        if (q) {
          const hay = [
            p.name, p.description, p.materials, p.material, p.finish,
            p.color, p.style, p.productCode, p.collection,
          ].join(" ").toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .slice(0, limit ?? 10)
      .map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.collection,
        productCode: p.productCode,
        price: p.price,
        mrp: p.mrp,
        rating: p.rating,
        reviewCount: p.reviewCount,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify({ count: results.length, results }, null, 2) }],
      structuredContent: { count: results.length, results },
    };
  },
});
