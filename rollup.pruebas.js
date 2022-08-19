// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/índice.ts',
  output: {
    file:'temp/garabato.js', 
    format: 'iife',
    name: 'Garabato'
  },
  plugins: [typescript({target: 'es2016' })]
};