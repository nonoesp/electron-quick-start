const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');

const createElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin');
 
// Create one plugin for both renderer and main process
const ElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
    // Path to `package.json` file with main field set to main process file path, or just main process file path
    path: path.join(__dirname, './dist/main.js'),
    // or just `path: './'`,
    // Other 'electron-connect' options
    logLevel: 0
});

// Find ui sources from src folder
const guiEntries =
  fs.readdirSync('src')
    .filter(f => f.match(/.*\.tsx$/))
    .map(f => path.join('src', f))
    .reduce((memo, file) => {
      memo[path.basename(file, path.extname(file))] = path.resolve(file)
      return memo
    }, {});

const commonConfig = {
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'awesome-typescript-loader'
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
            three$: 'three/build/three.min.js',
            'three/.*$': 'three',
        },
    },
};

module.exports = function(env, argv) {
    const watch = /--watch/.test(JSON.stringify(process.argv));
    return [Object.assign(
        {
            target: 'electron-main',
            output: {
                path: path.resolve(__dirname, 'dist'),
                filename: '[name].js'
            },
            entry: { main: './src/main.ts' },
            plugins: [
                new Dotenv(),
                new webpack.ProvidePlugin({
                    THREE: 'three',
                }),
                new webpack.DefinePlugin({
                    "process.env.WATCH": watch
                }),
                new webpack.DefinePlugin({
                    "process.env.WEB": false
                }),
                new webpack.DefinePlugin({
                    "process.env.TEST": env && env.TEST ? JSON.stringify(env.TEST) : "false"
                }),
            ],
            devtool: argv['mode'] === "production" ? "none" : "inline-source-map",
        },
        commonConfig),
    Object.assign(
        {
            target: 'electron-renderer',
            output: {
                path: path.resolve(__dirname, 'dist'),
                filename: '[name].js'
            },
            entry: guiEntries,
            plugins: [
                new Dotenv(),
                new webpack.ProvidePlugin({
                    THREE: 'three',
                }),
                new CleanWebpackPlugin(['dist'], {
                    exclude: ['main.js']
                }),
                new webpack.DefinePlugin({
                    "process.env.WEB": false
                }),
                new webpack.DefinePlugin({
                    "process.env.TEST": env && env.TEST ? JSON.stringify(env.TEST) : "false"
                }),                
                ...Object.keys(guiEntries).map(k => new HtmlWebpackPlugin({
                    filename: `${k}.html`,
                    chunks: [k],
                    template: fs.existsSync(`src/${k}.ejs`) ? `src/${k}.ejs` : 'src/default.ejs'
                })),
                (argv['watch'] === true && ElectronReloadWebpackPlugin()),
            ].filter(function(plugin) {return plugin !== false}),
            devtool: argv['mode'] === "production" ? "none" : "inline-source-map"
        },
        commonConfig)]
};