// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/índice.ts',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [typescript({target: 'es2016' })]
};