const plugin = require("tailwindcss/plugin");

module.exports = plugin.withOptions(() => ({ addComponents }) => {
  addComponents({
    ".main-container": {
      "@apply relative max-w-full": {},
    },
    ".app": {
      "@apply grid grid-rows-[10vh_auto_10vh] grid-cols-1": {},
      ".content": {
        "@apply my-0 mx-10 h-[80vh]": {},
      },
    },

    ".tableHead": {
      "@apply bg-teal-500 font-bold text-neutral-50": {},
    },
    ".button": {
      "@apply flex gap-2 bg-teal-700 hover:bg-teal-500": {},
    },
  });
});
