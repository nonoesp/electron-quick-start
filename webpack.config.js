const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');

// Find ui sources from src folder
const guiEntries =
  fs.readdirSync('src')
    .filter(f => f.match(/.*\.tsx$/))
    .map(f => path.join('src', f))
    .reduce((memo, file) => {
      memo[path.basename(file, path.extname(file))] = path.resolve(file)
      return memo
    }, {});

console.log(guiEntries);

const commonConfig = {
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'awesome-typescript-loader',
            },
            {
            test: /\.s?css$/,
            use: [{
                loader: "style-loader"
                }, {
                loader: "css-loader"
                }, {
                loader: "sass-loader"
                }]
            },
            {
                test: /\.glsl$/, use: 'webpack-glsl-loader'
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
        ],
    },
    node: {
        __dirname: false
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
        alias: {
            // three$: 'three/build/three.min.js',
            // 'three/.*$': 'three',
        },
    }
};

module.exports = function(env, argv)  {
    return Object.assign(
        {
            target: 'web', // Default target, not required
            output: {
                path: path.resolve(__dirname, 'dist-web'),
                filename: '[name].js'
            },
            entry: guiEntries,
            plugins: [
                new Dotenv(),
                new webpack.ProvidePlugin({
                    THREE: 'three',
                }),
                new CleanWebpackPlugin(['dist-web'], {
                    exclude: ['main.js']
                }),
                ...Object.keys(guiEntries).map(k => new HtmlWebpackPlugin({
                    filename: `${k}.html`,
                    chunks: [k],
                    template: fs.existsSync(`src/${k}.ejs`) ? `src/${k}.ejs` : 'src/default.ejs'
                }))
            ],
            devtool: argv['mode'] === "production" ? "none" : "inline-source-map"
        },
        commonConfig)
    };