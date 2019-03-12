const ImageminPlugin = require('imagemin-webpack');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminMozJpeg = require('imagemin-mozjpeg');
const imageminPngQuant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');

module.exports = {
  configureWebpack: {
    plugins: [
      new ImageminPlugin({
        bail: false,
        cache: false,
        imageminOptions: {
          filter: source => {
            if (source.byteLength >= 8192) {
              return true;
            }
    
            return false;
          },
          // Lossy optimizations
          plugins: [
            imageminGifsicle({
              interlaced: true,
            }),
            imageminMozJpeg({
              quality: 25,
            }),
            imageminPngQuant({
              strip: true,
            }),
            imageminSvgo({
              removeViewBox: true
            })
          ]
        }
      })
    ]
  },
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
    'file-loader': {
      options: {
        emitFile: true,
        name: '[path][name].[ext]'
      },
      test: /\.(jpe?g|png|gif|svg)$/i,
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
