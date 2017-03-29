const CopyWebpackPlugin = require('copy-webpack-plugin');

const {
  root,
  join
} = require('./helpers');

module.exports = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: root('dist')
  },
  module: {
    rules: [{
      test: /\.ts$/,
      enforce: 'pre',
      loader: 'tslint-loader',
      options: {}
    }, {
      test: /\.ts$/,
      loader: '@ngtools/webpack'
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ['raw-loader', 'sass-loader']
    }, {
      test: /\.css$/,
      loader: 'raw-loader'
    }, {
      test: /\.html$/,
      loader: 'raw-loader'
    }]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: join(__dirname, '..', 'node_modules', 'font-awesome', 'fonts'),
      to: join('assets', 'fonts')
    }, {
      from: join(__dirname, '..', 'resources', 'images'),
      to: join('assets', 'images')
    }, {
      from: join(__dirname, '..', 'resources', 'data'),
      to: join('assets', 'data')
    }, {
      from: join(__dirname, '..', 'resources', 'i18n'),
      to: join('assets', 'i18n')
    }])
  ]

};
