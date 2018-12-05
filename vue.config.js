const Dotenv = require('dotenv-webpack');

module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: true,
      analyzerPort: 8082,
      analyzerHost: '0.0.0.0',
    },
  },
  configureWebpack: {
    plugins: [
      new Dotenv({
        path: './.env'
      }),
    ],
  },
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
  }
};