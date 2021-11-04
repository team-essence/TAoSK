const path = require("path");

module.exports = {
  "frontend/**/*.{ts,tsx}": (files) => {
    const cwd = process.cwd();
    const relativePaths = files
      .map((file) => path.relative(cwd, file))
      .filter((relativePaths) => !relativePaths.includes(".gen.ts"));

    return `"yarn lint:front" ${relativePaths.join(" ")}`;
  },
};
