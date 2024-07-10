import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';


export default [{
  input: "src/routes/scrollygraph/_make_files/netmigchart.js",
  output: {
    format: "iife",
    file: "src/routes/scrollygraph/_outfiles/netmigchart.js",
    sourcemap: false,
  },
  plugins: [
    svelte({ emitCss: false }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs({
        include: /node_modules/,
        requireReturnsDefault: 'auto', // <---- this solves default issue,
      })
  ],
},{
  input: "src/routes/scrollygraph/_make_files/popracechart.js",
  output: {
    format: "iife",
    file: "src/routes/scrollygraph/_outfiles/popracechart.js",
    sourcemap: false,
  },
  plugins: [
    svelte({ emitCss: false }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs({
        include: /node_modules/,
        requireReturnsDefault: 'auto', // <---- this solves default issue,
      })
  ],
},
{
  input: "src/routes/scrollygraph/_make_files/popchart.js",
  output: {
    format: "iife",
    file: "src/routes/scrollygraph/_outfiles/popchart.js",
    sourcemap: false,
  },
  plugins: [
    svelte({ emitCss: false }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs({
        include: /node_modules/,
        requireReturnsDefault: 'auto', // <---- this solves default issue,
      })
  ],
},
{
  input: "src/routes/scrollygraph/_make_files/scrollymap.js",
  output: {
    format: "iife",
    file: "src/routes/scrollygraph/_outfiles/scrollymap.js",
    sourcemap: false,
  },
  plugins: [
    svelte({ emitCss: false }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs({
        include: /node_modules/,
        requireReturnsDefault: 'auto', // <---- this solves default issue,
      })
  ],
},
{
  input: "src/routes/scrollygraph/_make_files/popchart.js",
  output: {
    format: "iife",
    file: "src/routes/scrollygraph/_outfiles/popchart.js",
    sourcemap: false,
  },
  plugins: [
    svelte({ emitCss: false }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs({
        include: /node_modules/,
        requireReturnsDefault: 'auto', // <---- this solves default issue,
      })
  ],
}
];