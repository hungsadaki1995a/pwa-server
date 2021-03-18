
const path = require( 'path' );
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {

    // bundling mode
    mode: 'production',

    // entry files
    entry: './src/index.ts',

    target: 'node',

    devtool: "source-map",

    plugins: [
        new webpack.IgnorePlugin(/^pg-native$/),
        new CleanWebpackPlugin(),
    ],

    // output bundles (location)
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'server.js',
    },

    // file resolutions
    resolve: {
        extensions: [ '.ts', '.js' ],
        alias: {
            router: path.resolve(__dirname, 'src/router/')
        },
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.ts?/,
                use: {
                    loader: 'ts-loader',
                },
                exclude: /node_modules/,
            }
        ]
    },

};
