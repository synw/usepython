import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import webWorkerLoader from '@qortal/rollup-plugin-web-worker-loader';

const isProduction = !process.env.ROLLUP_WATCH;

export default [
  {
    input: 'src/py.ts',
    output: [
      {
        file: 'dist/py.min.js',
        format: 'iife',
        name: '$py',
        plugins: [
          isProduction && terser({ format: { comments: false } })
        ]
      }],
    plugins: [
      webWorkerLoader(),
      typescript(),
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
    ],
  },
  {
    input: 'src/main.ts',
    output: [
      {
        file: 'dist/py.esm.js',
        format: 'es'
      }],
    plugins: [
      webWorkerLoader(),
      typescript(),
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
    ],
  },
];