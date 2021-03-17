
const path = require( 'path' );
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

    // bundling mode
    mode: 'production',

    // entry files
    entry: './src/index.ts',

    target: 'node',

    devtool: "source-map",

    plugins: [
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
            line: path.resolve(__dirname, 'src/line/'),
            models: path.resolve(__dirname, 'src/common/models/'),
            helpers: path.resolve(__dirname, 'src/common/helpers/'),
            enums: path.resolve(__dirname, 'src/common/enums/'),
            request: path.resolve(__dirname, 'src/web/request/'),
            notice: path.resolve(__dirname, 'src/web/notice/'),
            middleware: path.resolve(__dirname, 'src/middleware/'),
            config: path.resolve(__dirname, 'src/config/'),

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
