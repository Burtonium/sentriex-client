module.exports = {
  chainWebpack: config => {
    config.module
      .rule('html')
      .test( /\.(html)$/)
      .use('html-loader')
      .loader('html-loader')
      .end();
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
      analyzerPort: 8082,
      analyzerHost: '0.0.0.0',
    },
    'style-resources-loader': {
      patterns: [
        './src/assets/scss/*.scss',
        './src/assets/scss/animations/*.scss',
      ],
      preProcessor: 'scss',
    },
  },
  devServer: {
    https: true,
    port: process.env.PORT || 8080,
    host: process.env.HOST || '0.0.0.0',
    hot: true,
    disableHostCheck: true,
  },
};
