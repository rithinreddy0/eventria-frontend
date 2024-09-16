const path = require('path');

module.exports = {
  entry: './src/index.js', // Your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // Other Webpack configuration
  externals: {
    'source-map-js': 'commonjs source-map-js', // Exclude 'source-map-js' from client-side bundle
  },
  // Loaders and Plugins configurations
};
