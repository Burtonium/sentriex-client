module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: true,
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
  configureWebpack: {
    plugins: [
    ],
  },
  devServer: {
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
  },
};
