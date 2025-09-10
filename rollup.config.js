import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import dsv from '@rollup/plugin-dsv';


export default [{
  input: "src/routes/graphs/_make_files/first_horizon.js",
  output: {
    format: "iife",
    file: "src/routes/graphs/_outfiles/first-horizon.js",
    sourcemap: false,
  },
  plugins: [
    dsv(),
    svelte({ emitCss: false }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs({
        include: /node_modules/,
        requireReturnsDefault: 'auto', // <---- this solves default issue,
      })
  ],
},
{
  input: "src/routes/graphs/_make_files/memphis_based_banks.js",
  output: {
    format: "iife",
    file: "src/routes/graphs/_outfiles/memphis-based-banks.js",
    sourcemap: false,
  },
  plugins: [
    dsv(),
    svelte({ emitCss: false }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs({
        include: /node_modules/,
        requireReturnsDefault: 'auto', // <---- this solves default issue,
      })
  ],
},
{
  input: "src/routes/graphs/_make_files/totals.js",
  output: {
    format: "iife",
    file: "src/routes/graphs/_outfiles/totals.js",
    sourcemap: false,
  },
  plugins: [
    dsv(),
    svelte({ emitCss: false }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs({
        include: /node_modules/,
        requireReturnsDefault: 'auto', // <---- this solves default issue,
      })
  ],
},
];
