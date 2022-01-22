const { merge } = require("webpack-merge")
const common = require("./webpack.common")
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new CompressionWebpackPlugin({
      filename: "[path][base].gz"
    })
  ]
})