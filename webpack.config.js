const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD = process.env.NODE_ENV === 'production';

const entry = BUILD
? './index.js'
: [
    './index.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080/'
  ];

const output = {
  path: path.join(__dirname, 'public'),
  publicPath: BUILD ? '/' : '/public/',
  filename: 'bundle.js'
}

const plugins = BUILD
? [new webpack.optimize.UglifyJsPlugin()]
: [new webpack.HotModuleReplacementPlugin()];

plugins.push(new ExtractTextPlugin('style.css'));

const cssLoader = BUILD
? ExtractTextPlugin.extract({
    use: [
      { loader: 'css-loader', options: { minimize: true, localIdentName: `[hash:base64:10]` } },
      { loader: 'postcss-loader' },
      { loader: 'sass-loader' }
    ]
})
: [
  { loader: 'style-loader' },
  { loader: 'css-loader', options: { minimize: true, localIdentName: `[path][name]---[local]` } },
  { loader: 'postcss-loader' },
  { loader: 'sass-loader' }
];

module.exports = { entry, output, plugins,
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: cssLoader
      },
      {
        test: /.(jpg|png|gif)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'url-loader', options: { limit: 10000, name: 'images/[hash:12][name].[ext]' } }
        ]
      },
      {
        test: /.(eot|svg|otf|ttf|woff|woff2)/,
        exclude: /node_modules/,
        use: [
          { loader: 'file-loader'}
        ]
      }
    ]
  }
}