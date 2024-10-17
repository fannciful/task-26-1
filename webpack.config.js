const path = require('path');

module.exports = {
  entry: './src/index.js', 
  output: {
    path: path.resolve(__dirname, 'build'), 
    filename: 'bundle.js', 
    publicPath: '/task-25-1/',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/, 
        use: ['style-loader', 'css-loader', 'sass-loader'], 
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), 
    },
    compress: true,
    port: 5005,
    open: true, 
    historyApiFallback: true, 
  },
};
