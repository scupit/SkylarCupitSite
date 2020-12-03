const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsConfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');

const isDevMode = process.env.NODE_ENV !== 'production';

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
    plugins: [
      new TsConfigPathsWebpackPlugin({ configFile: './tsconfig.json' })
    ]
  },
  entry: {
    index: './src/index.ts'
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[id].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: isDevMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevMode ? '[id].css' : '[id].[hash].css',
      ignoreOrder: false
    }),
  ]
}