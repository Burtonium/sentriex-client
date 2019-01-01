module.exports = {
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
    port: process.env.PORT || 8080,
    host: process.env.HOST || '0.0.0.0',
    https: true,
    hot: true,
    disableHostCheck: true,
  },
};
