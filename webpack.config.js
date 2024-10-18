const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', 
  output: {
    path: path.resolve(__dirname, 'build'), 
    filename: 'bundle.js', 
    publicPath: '/',  // Це важливо для коректного деплою на GitHub Pages
  },
  mode: 'production', // Використовуйте production для деплою
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Використовує ваш шаблон для створення HTML
    }),
  ],
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
