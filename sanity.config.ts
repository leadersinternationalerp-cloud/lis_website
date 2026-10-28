import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

/**
 * Sanity Studio configuration.
 * Reads the same env vars as the site, so one .env wires up both.
 */
export default defineConfig({
  name: "lis-website",
  title: process.env.SANITY_STUDIO_TITLE ?? "LIS — School content",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "x9pcz7mh",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
  project: { name: "Leaders International School" },
  tools: (prev) => prev.filter((tool) => tool.name !== "presentation"),
});
