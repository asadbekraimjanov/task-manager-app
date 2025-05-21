const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
      })
    ],
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
    devServer: {
      proxy: {
        '/api': {
          target: 'http://16.170.249.186:8080',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  },
};
