const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
require('dotenv').config({ path: './.env' });

module.exports = {
    entry: "./src/index.js",
    stats: {
        assets: false,
        chunks: false,
        chunkGroups: false,
        chunkModules: false,
        chunkOrigins: false,
        entrypoints: false,
        modules: false,
        moduleTrace: false,
        providedExports: false,
        usedExports: false,
        optimizationBailout: false,
        performance: false,
        publicPath: false,
        reasons: false,
        source: false,
        timings: false,
        version: false,
        warnings: true,
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    output: {
        path: resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(scss|sass)$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    "file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]",
                    "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
                ],
            },
            {
                test: /\.(woff|woff2|ttf)$/,
                use: {
                    loader: "url-loader",
                },
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env'],
                            ['@babel/preset-react']
                        ]
                    }
                }
            }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "node_modules/onnxruntime-web/dist/*.wasm",
                    to: "[name][ext]",
                },
                {
                    from: "model",
                    to: "model",
                },
                {
                    from: "public",
                    to: "public",
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new FriendlyErrorsWebpackPlugin(),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ],
};