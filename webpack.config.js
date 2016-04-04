var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    plugins: [commonsPlugin],
    entry: "./react/js/react.demo.js",
    output: {
        path: './react/dist/',
        filename: "react.demo.js"
    },
    module: {
        loaders: [
            { test: /\.demo\.js$/, loader: "jsx-loader?harmony" }
        ]
    }
};