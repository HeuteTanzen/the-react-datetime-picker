const HtmlWebpackPlugin = require('html-webpack-plugin');
// const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

module.exports = {
  entry: __dirname + '/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'example_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "postcss-loader" }
        ]
      }
    ]
  },
  plugins: [
    // new FlowBabelWebpackPlugin(),
    new HtmlWebpackPlugin()
  ]
}
