const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =
{
    entry: './app/index.tsx',
    plugins:
    [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ],
    output:
    {
        path: __dirname + '/../../build',
        filename: 'public/[name].[contenthash].js'
    },
    resolve:
    {
        extensions: [
            '.ts',
            '.tsx',
            '.js'
        ]
    },
    module:
    {
        rules:
        [
            {
                test: /\.tsx?$/, loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use:
                [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use:
                [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options:
                        {
                            implementation: require('sass'),
                        },
                    },
                ],
            },
        ]
    }
}
