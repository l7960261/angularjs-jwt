module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'angularjs-jwt.js',
    library: 'angularjs-jwt',
    libraryTarget: 'umd',
    libraryExport: 'default',
  }
};
