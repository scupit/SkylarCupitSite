const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsConfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const path = require("path");
const { merge } = require("webpack-merge")

module.exports = (_env, argv) => {
  const isDevMode = argv.mode !== "production";
  const options = { isDevMode };

  console.error(`MODE: ${argv.mode}`)
  return merge(commonConfig(options), specificConfig(options));
}

function specificConfig(options) {
  return options.isDevMode
    ? devOnlyConfig(options)
    : prodOnlyConfig(options)
}

function commonConfig(options) {
  const { isDevMode } = options;

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
          test: /\.(hbs|handlebars)$/,
          exclude: /node_modules/,
          loader: "handlebars-loader",
          options: {
            partialDirs: [
              // Allows you to globally use any partials defined in this directory.
              // src/partials/my-partial.hbs can be imported with {{> my-partial}}
              path.join(__dirname, "src", "partials")
            ],
            // Causes the loader to emit requires(...) statements for asset file paths.
            // This essentially makes Webpack aware of used assets, so they are automatically
            // wired through the rest of the build process.
            inlineRequires: /assets\//
          }
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          loader: "html-loader"
        },
        {
          test: /\.(webp|webm|png|jpg|svg|ico)$/,
          type: "asset/resource"
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
      filename: isDevMode ? 'js/[name].js' : 'js/[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      publicPath: "/",
      assetModuleFilename: "assets/[hash][ext][query]"
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "robots.txt", to: "robots.txt" },
          { from: "assets/favicon.svg", to: "favicon.svg" },
          { from: "assets/favicon.ico", to: "favicon.ico" },
          { from: "assets/apple-touch-icon.png", to: "apple-touch-icon.png" },
        ]
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/index.hbs",
        chunks: ["index"]
      }),
      new HtmlWebpackPlugin({
        filename: "to-learn/index.html",
        template: "src/pages/to-learn/to-learn.hbs",
        chunks: ["index"]
      }),
      new HtmlWebpackPlugin({
        filename: "portfolio/index.html",
        template: "src/pages/portfolio/portfolio.hbs",
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

function devOnlyConfig(_options) {
  return {
    mode: "development",
    devtool: "source-map",
    devServer: {
      static: './dist',
      compress: true,
      port: 3000,
      hot: true,
      allowedHosts: [
        // Allow other devices on LAN to access the dev server using local hostnames.
        // For example, a dev server instance hosted on a Raspberry Pi with hostname
        // RaspberryPi could be accessed using the URL http://raspberrypi.local:3000/
        // on other devices on the same network.
        ".local"
      ],
      watchFiles: [
        "src/**/*",
        "assets/**/*"
      ]
    }
  }
}

function prodOnlyConfig(_options) {
  return {
    mode: "production",
    plugins: [
      new CompressionWebpackPlugin({
        filename: "[path][base].gz"
      })
    ]
  };
}