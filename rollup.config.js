import serve from 'rollup-plugin-serve';

const dev = process.env.NODE_ENV === 'development';

export default {
  input: 'src/main.js',
  output: {
    file: 'docs/bundle.js',
    format: 'iife'
  },
  plugins: [
    dev && serve({ browser: true, contentBase: 'docs/' }), 
  ]
}