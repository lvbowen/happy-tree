// import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/tree.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'esm'
    },
    {
        file: 'dist/index.cjs.js',
        format: 'cjs'
    },
  ],
  plugins: [
      nodeResolve(), 
    //   typescript()
 ]
};