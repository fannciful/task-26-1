const path = require('path');

module.exports = {
  entry: './src/index.js', // точка входу
  output: {
    path: path.resolve(__dirname, 'build'), // директорія виходу
    filename: 'bundle.js', // ім'я бандлу
    publicPath: '/', // для коректної роботи з devServer
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
        test: /\.css$/, // для CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/, // для SCSS
        use: ['style-loader', 'css-loader', 'sass-loader'], // використовувати відповідні лоадери
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // директорія для статики
    },
    compress: true,
    port: 5005,
    open: true, // автоматично відкриває браузер
    historyApiFallback: true, // для підтримки маршрутизації
  },
};
