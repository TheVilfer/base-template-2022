// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
const fs = require('fs');
const cert = fs.readFileSync('./localhost.cert');
const key = fs.readFileSync('./localhost.key');
module.exports = {
  mount: {
    "dist": "/",
    "src/js": "/js",
    "src/css": "/css",
    "src/media": "/media"
  },
  plugins: [
    '@snowpack/plugin-typescript',
    [
      'snowpack-plugin-hash',
      // Entirely optional object. Showing default values
      {
        // Name of custom tsconfig to use for compiler options passed to TypeScript compiler
        // Configured length of your hashes
        hashLength: 8,
        // Name of file for asset manifest JSON
        assetManifest: "optimize-manifest.json"
      }
    ],
    [
      '@snowpack/plugin-run-script', {
        cmd: 'eleventy',
        watch: '$1 --watch',
      },
    ],
    ['@snowpack/plugin-postcss'],
    [
      "@snowpack/plugin-babel",
      {
        "input": ['.js', '.mjs', '.jsx', '.ts', '.tsx'], // (optional) specify files for Babel to transform
      }
    ],
    ["@snowpack/plugin-optimize", {
      preloadModules: true,
      preloadCSS: true
    }]
  ],
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },
  devOptions: {
    out: 'build',
    port: 3000,
    hmr: true,
    bundle: true,
    secure: {
      cert,
      key
    },

  },
  buildOptions: {
    sourcemap: true
  },
};