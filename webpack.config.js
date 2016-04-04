var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    plugins: [commonsPlugin],
    entry: {
        react: "./react/js/react.demo.js"
    },
    output: {
        path: './react/dist/',
        filename: "[name].demo.js"
    },
    module: {
        loaders: [
            { test: /\.demo\.js$/, loader: "jsx-loader?harmony" }
        ]
    }
};