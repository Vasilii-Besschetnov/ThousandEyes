const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const deployPath = "deploy";

const paths = {
    src: path.resolve(__dirname, 'src'),
    components: path.resolve(__dirname, 'src/components')
};

module.exports = {
    entry: {
        main: "./src/index.js"
    },
    devtool: 'source-map',
    module: {
        rules: [{ // Process JS with Babel.
            test: /\.(js|jsx|mjs)$/,
            include : paths.src,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            }
        },
        { // styles
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader", // creates style nodes from JS strings
                use: [{
                    loader: "css-loader", // translates CSS into CommonJS
                    options: {
                        sourceMap: true,
                        modules: true,
                        localIdentName: "[name]__[local]__[hash:base64:5]"
                    }
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            })
        }, { // fonts
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]"
                }
            }
        }, { // images
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "images/[name].[ext]"
                }
            }
        }]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
    ],
    resolve: {
        alias: {
            $src: paths.src,
            $components: paths.components
        }
    },
    output: {
        filename: "js/[name].bundle.js",
        path: path.resolve(__dirname, deployPath)
    }
}