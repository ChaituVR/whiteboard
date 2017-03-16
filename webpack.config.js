var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '/client');
var APP_DIR = path.resolve(__dirname, '/common');

var config = {
    entry: './common/index.jsx',
    output: {
        path: './client',
        filename: 'bundle.js'
    },
    resolve: {
     extensions: ['.js', '.jsx']
   },
   module: {
     loaders: [
       {
         test: /\.jsx?$/,
         loader: 'babel-loader',
         exclude: /node_modules/,
         query: {
           cacheDirectory: true,
           presets: ['react', 'es2015']
         }
       }
     ]
   }
};

module.exports = config;
