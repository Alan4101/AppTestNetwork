const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./public/js/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "index.bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader',

                        }
                    ]
                })
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            outputPath: 'static/img',
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]

};