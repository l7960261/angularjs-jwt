module.exports = {
  entry: {
    'dist/angularjs-jwt': './src/index.js',
    'lib/index': './src/index.js'
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    library: 'angularjs-jwt',
    libraryTarget: 'umd',
    libraryExport: 'default',
  }
};
