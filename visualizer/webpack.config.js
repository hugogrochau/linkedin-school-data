const webpack = require('webpack')
const path = require('path')

const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production'
const sourcePath = path.join(__dirname, './src')
const outPath = path.join(__dirname, './dist')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: sourcePath,
  entry: './index.tsx',
  output: {
    path: outPath,
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js'
  },
  target: 'web',

  // Enable sourcemaps for debugging webpack's output.
  devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',

  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
      rules: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
          { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

          { test: /\.html$/, loader: 'html-loader' },

          { test: /\.(a?png|svg)$/, loader: 'url-loader?limit=10000' },
          { test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/, loader: 'file-loader' },

          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'assets/index.html'
    })
  ],

  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal',
    clientLogLevel: 'warning'
  }
}