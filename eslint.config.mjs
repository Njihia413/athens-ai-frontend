import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
    rules: {
      // Allow unused expressions like IIFEs
      "no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true, "allowTaggedTemplates": true }],
      // Ensure IIFEs don't trigger parsing issues
      "no-sequences": "off",
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
