
const path = require( 'path' );
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {

    // bundling mode
    mode: 'development',

    devtool: "source-map",

    watch: true,

    // entry files
    entry: ["webpack/hot/poll?100", "./src/index.ts"],

    externals: [
        nodeExternals({
            whitelist: ["webpack/hot/poll?100"]
        })
    ],

    target: 'node',

    // file resolutions
    resolve: {
        extensions: [ '.ts', '.js' ],
        alias: {
            line: path.resolve(__dirname, 'src/line/'),
            models: path.resolve(__dirname, 'src/common/models/'),
            helpers: path.resolve(__dirname, 'src/common/helpers/'),
            enums: path.resolve(__dirname, 'src/common/enums/'),
            request: path.resolve(__dirname, 'src/web/request/'),
            notice: path.resolve(__dirname, 'src/web/notice'),
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

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.PORT': JSON.stringify('3600'),
            'process.env.WHITELISTED_DOMAINS': JSON.stringify('http://localhost:4200,https://wabackendtempinxs01jems.azurewebsites.net,https://wabackenddraftdevinxs01jems.azurewebsites.net'),
            'process.env.CHANNEL_ACCESS_TOKEN': JSON.stringify('uZ9Bt64lmwguKPKIe6poY1zDDHQ4kIB8WBACa6HATdAdYOpBtRIcmbsWyrWGeJ6OWiyHtfMkv5SgWW1atmsYA34S5+5LPflz55ynuteioU38SIaC7gxGnlVrXA255cUwklrrnQH4DiBu9MIB/wEjBAdB04t89/1O/w1cDnyilFU=z'),
            'process.env.CHANNEL_SECRET': JSON.stringify('6bca779cc8a65d083cb0f070dd0b575a')
        })
    ],

    // output bundles (location)
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'server.js',
    },
};
