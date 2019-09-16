module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/lib',
    filename: 'index.js',
    library: 'node-package-open-source-starter',
    libraryTarget: 'umd',
  }
};
