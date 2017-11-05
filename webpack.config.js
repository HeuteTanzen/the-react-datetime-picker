const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

module.exports = {
  entry: {
    index: path.join(__dirname, '/index.js'),
    example: path.join(__dirname, '/example.js')
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
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
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }
        ]
      }
    ]
  },
  plugins: [
    // new FlowBabelWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/example/template.html'
    })
  ]
}
