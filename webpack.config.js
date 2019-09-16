module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/lib',
    filename: 'index.js',
    library: 'angularjs-jwt',
    libraryTarget: 'umd',
    libraryExport: 'default',
  }
};
