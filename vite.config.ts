import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import vinext from "vinext";
import { defineConfig } from "vite";

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
  "00000000-0000-4000-8000-000000000000";

const hostingMetadataPath = resolve(".site", "hosting.json");
const hostingConfig: { d1?: string | null; r2?: string | null } =
  existsSync(hostingMetadataPath)
    ? JSON.parse(readFileSync(hostingMetadataPath, "utf8"))
    : {};
const { d1, r2 } = hostingConfig;

const localBindingConfig = {
  main: "./worker/index.ts",
  compatibility_flags: ["nodejs_compat"],
  d1_databases: d1
    ? [
        {
          binding: d1,
          database_name: "site-creator-d1",
          database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
        },
      ]
    : [],
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: "site-creator-r2",
        },
      ]
    : [],
};

export default defineConfig(async () => {
  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  // Wrangler snapshots its log path while the Cloudflare plugin is imported.
  const { cloudflare } = await import("@cloudflare/vite-plugin");
  const sitesPlugin = existsSync(hostingMetadataPath)
    ? (await import("./build/sites-vite-plugin")).sites()
    : null;

  return {
    plugins: [
      vinext(),
      ...(sitesPlugin ? [sitesPlugin] : []),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: localBindingConfig,
      }),
    ],
  };
});
