'use strict';

const path = require('path');
const webpack = require('webpack');

const config = {
  resolve: {
    modules: [
      path.resolve(__dirname, 'client', 'scripts'),
      path.resolve(__dirname, 'client', 'styles'),
      path.resolve(__dirname, 'client', 'fonts'),
      path.resolve(__dirname, 'client', 'media'),
    ],
    extensions: ['', '.js', '.jsx', '.json', 'scss'],
    modulesDirectories: ['node_modules'],
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.(css|scss|woff|woff2|svg|png|jpg|jpeg|gif|m4a|mp4|webp|webm)$/,
        loader: 'null',
      },
    ],
  },

  output: {
    libraryTarget: 'commonjs2',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('test'),
      },
    }),
  ],
};

module.exports = config;
