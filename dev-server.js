const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config.js');
const path = require('path');

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  hot: true,
  // contentBase: path.join(__dirname, 'public'),
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});

server.listen(8080, () => console.log('Webpack Dev Server running on 8080'));