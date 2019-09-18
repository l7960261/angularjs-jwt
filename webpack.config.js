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
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
