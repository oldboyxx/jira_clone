const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: path.join(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { name: '[name]-[hash].[ext]', limit: 15000 },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name]-[hash].[ext]' },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['*', '.js', '.scss'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      favicon: path.join(__dirname, 'src/global/assets/favicon.png'),
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
