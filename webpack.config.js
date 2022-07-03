const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

let mode = "development";
let target = "web";
if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

const entry = {
  project1: "./src/project1/demo1.jsx",
  project2: "./src/project2/demo2.tsx",
};

const plugins = [];

for (let key in entry) {
  plugins.push(
    new HtmlWebpackPlugin({
      template: "./src/" + key + "/index.ejs",
      favicon: "./src/" + key + "/favicon.ico",
      filename: `[name]/[name].html`,
      inject: true,
      chunks: [key],
      templateParameters: {
        assets: {
          js: [`[name]/[name].js`]
        }
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    })
  );
}

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode,
  target,
  plugins,
  devtool: "source-map",
  entry,
  devServer: {
    static: "./dist",
    hot: true,
    proxy: {
     "/api": {
        target: "https://localhost:3001",
        secure: false,
      },
    }
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./[name]/[name].[hash:8].js",
    assetModuleFilename: "[fragment]/assets/[hash][ext][query]",
    chunkFilename: '[id].[hash:8].js',
    clean: true,
  },

  module: {
    rules: [
      { test: /\.(html)$/, use: ["html-loader"] },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === "production" ? "asset" : "asset/resource",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
