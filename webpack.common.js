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
    index: './src/index.ts',
    to_learn: "./src/to-learn/to-learn.ts"
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      filename: "to-learn/index.html",
      template: "src/to-learn/index.html",
      // The "chunk name" must be the entry name for a js/ts file specified in "entry".
      // I don't think CSS files can go here, because those are processed as part of entry files.
      chunks: ["to_learn"]
    }),
    new MiniCssExtractPlugin({
      filename: isDevMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevMode ? '[id].css' : '[id].[hash].css',
      ignoreOrder: false
    }),
  ]
}