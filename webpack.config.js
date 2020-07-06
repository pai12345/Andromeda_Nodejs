const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const minify = require("html-minifier").minify;

const path_dist = path.resolve(__dirname, "dist");
const path_src = path.resolve(__dirname, "src");
const path_Templates_index = path.resolve(
  __dirname,
  "src/templates/static/index.html"
);
const path_Templates_NotFound = path.resolve(
  __dirname,
  "src/templates/static/404NotFound.html"
);

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  target: "node",
  externals: [nodeExternals()],
  output: {
    filename: "bundle.js",
    path: path_dist,
    publicPath: "dist",
  },
  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path_src,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CaseSensitivePathsPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path_Templates_index,
          to: path_dist,
          transform: (content, absoluteFrom) => {
            return minify(content.toString(), {
              collapseBooleanAttributes: true,
              collapseInlineTagWhitespace: true,
              collapseWhitespace: true,
              decodeEntities: true,
              minifyCSS: true,
              minifyJS: true,
              minifyURLs: true,
              removeAttributeQuotes: true,
              removeComments: true,
              removeEmptyAttributes: true,
              removeEmptyElements: true,
              removeEmptyElements: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              removeTagWhitespace: true,
              trimCustomFragments: true,
              useShortDoctype: true,
            });
          },
        },
        {
          from: path_Templates_NotFound,
          to: path_dist,
          transform: (content, absoluteFrom) => {
            return minify(content.toString(), {
              collapseBooleanAttributes: true,
              collapseInlineTagWhitespace: true,
              collapseWhitespace: true,
              decodeEntities: true,
              minifyCSS: true,
              minifyJS: true,
              minifyURLs: true,
              removeAttributeQuotes: true,
              removeComments: true,
              removeEmptyAttributes: true,
              removeEmptyElements: true,
              removeEmptyElements: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              removeTagWhitespace: true,
              trimCustomFragments: true,
              useShortDoctype: true,
            });
          },
        },
      ],
    }),
  ],
};
