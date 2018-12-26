const Dotenv = require('dotenv-webpack');
console.log('ENV VARIABLE', process.env.API_URL);
module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: true,
      analyzerPort: 8082,
      analyzerHost: '0.0.0.0'
    },
    'style-resources-loader': {
      patterns: [
        './src/assets/scss/*.scss',
        './src/assets/scss/animations/*.scss'
      ],
      preProcessor: 'scss'
    }
  },
  configureWebpack: {
    plugins: [
      new Dotenv({
        path: './.env',
        safe: true,
        systemvars: true,
        silent: false,
      }),
    ],
  },
  devServer: {
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
  }
};
