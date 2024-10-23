import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: ["./index.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  importMap: 'deno.json',
  package: {
    name: "viewstats-api",
    version: Deno.args[0],
    description: "Unofficial viewstats API wrapper for Nodejs and Deno.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/Miguelo981/viewstats-api.git",
    },
    bugs: {
      url: "https://github.com/Miguelo981/viewstats-api/issues",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});