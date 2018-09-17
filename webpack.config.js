const path = require('path');
module.exports = {
  entry: ['./src/index.js'],
  mode : 'development',
  output: {
   path: path.resolve(__dirname, 'dist/'),
   publicPath: '/dist/',
   filename: 'bundle.js',
 },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};
