import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';

const dev = process.env.NODE_ENV === 'development';

export default {
  input: 'src/main.js',
  output: {
    file: 'docs/bundle.js',
    format: 'iife'
  },
  plugins: [
    !dev && terser(),
    dev && serve({ browser: true, contentBase: 'docs/' }), 
  ]
}