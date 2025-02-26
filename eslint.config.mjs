import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next"],
    settings: {
      next: {
        rootDir: "packages/my-app/",
      },
    },
  }),
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript"),
  ...compat.extends("plugin:@tanstack/eslint-plugin-query/recommended"),
  ...compat.extends("prettier"),
  ...compat.plugins("@tanstack/query"),
];

export default eslintConfig;
