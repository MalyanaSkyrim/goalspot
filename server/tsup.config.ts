import glob from "tiny-glob";
import { defineConfig } from "tsup";

export default defineConfig(async function () {
  const pluginsEntries = await glob("src/plugins/*.ts");
  const modulesEntries = await glob("src/modules/**/*.router.ts");

  return {
    entry: ["src/app.ts", ...pluginsEntries, ...modulesEntries],
    outDir: "build",
    bundle: true,
    splitting: false,
    sourcemap: false,
    clean: true,
    minify: process.env.NODE_ENV === "production",
    skipNodeModulesBundle: true,
    target: "node18",
  };
});
