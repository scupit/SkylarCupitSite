const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsConfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const fs = require("fs");
const path = require("path");
const Mustache = require("mustache");
const { merge } = require("webpack-merge")

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

module.exports = (_env, argv) => {
  const isDevMode = argv.mode !== "production";
  console.error(`MODE: ${argv.mode}`)
  return merge(
    commonConfig(isDevMode),
    isDevMode ? devOnlyConfig() : prodOnlyConfig()
  );
}

function commonConfig(isDevMode) {
  return {
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/i,
          use: [
            {
              loader: isDevMode ? "style-loader" : MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDevMode
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevMode
              }
            }
          ]
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                sourceMap: isDevMode
              }
            }
          }
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
              sources: true,
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
      filename: 'js/[name].js',
      chunkFilename: '[name].[chunkhash].js',
      publicPath: "/"
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/index.mustache",
        chunks: ["index"]
      }),
      new HtmlWebpackPlugin({
        filename: "to-learn/index.html",
        template: "src/pages/to-learn/to-learn.mustache",
        chunks: ["index"]
      }),
      new HtmlWebpackPlugin({
        filename: "portfolio/index.html",
        template: "src/pages/portfolio/portfolio.mustache",
        chunks: ["index"]
      }),
      new MiniCssExtractPlugin({
        filename: isDevMode ? 'css/[name].css' : 'css/[name].[chunkhash].css',
        chunkFilename: isDevMode ? '[id].css' : '[id].[chunkhash].css',
        ignoreOrder: false
      })
    ]
  } 
}

function devOnlyConfig() {
  return {
    mode: "development",
    devtool: "source-map",
    devServer: {
      static: './dist',
      compress: true,
      port: 3000,
      hot: true
    }
  }
}

function prodOnlyConfig() {
  return {
    mode: "production",
    plugins: [
      new CompressionWebpackPlugin({
        filename: "[path][base].gz"
      })
    ]
  };
}