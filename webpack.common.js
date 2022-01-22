const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsConfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const fs = require("fs");
const path = require("path");
const Mustache = require("mustache");

const isDevMode = process.env.NODE_ENV !== 'production';

// Gets content of the html or mustache 'partial' file as a string.
function resolvePartial(relativeFileName) {
  const srcPathWithoutExtension = path.resolve("src", relativeFileName);

  for (const ext of ["html", "mustache"]) {
    const filePath = `${srcPathWithoutExtension}.${ext}`;

    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath).toString();
    }
  }
  throw ReferenceError(`Could not find partial at path ${srcPathWithoutExtension}.`);
}

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
        test: /\.(mustache|html)$/,
        exclude: /node_modules/,
        use: {
          loader: "html-loader",
          // Important note: Files in partials/ are NOT watched by Webpack. While developing, any changes
          // made to a HTML or Mustache file located in partials/ will only be reflected by modifying and
          // saving the ENTRY HTML/Mustache file it's directly or indirectly included into. And even then,
          // the changes will only be reflected in the entry file which was edited. To have the changes
          // be globally reflected, restart Webpack's dev server. The idea is that partials are global
          // components, and shouldn't be modified too much if possible.
          options: {
            sources: false,
            preprocessor: (content, loaderContext) => {
              try {
                return Mustache.render(content, { }, resolvePartial);
              }
              catch (err) {
                loaderContext.emitError(err);
                return content;
              }
            }
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
    other_page: "./src/other-page/some.ts"
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: '[name].[id].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.mustache",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      filename: "other-page/index.html",
      template: "src/other-page/another.mustache",
      // The "chunk name" must be the entry name for a js/ts file specified in "entry".
      // I don't think CSS files can go here, because those are processed as part of entry files.
      chunks: ["other_page"]
    }),
    new MiniCssExtractPlugin({
      filename: isDevMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: isDevMode ? '[id].css' : '[id].[hash].css',
      ignoreOrder: false
    })
  ]
}
