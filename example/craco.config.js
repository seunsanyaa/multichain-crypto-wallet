const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add support for TypeScript type exports
      webpackConfig.module.rules.push({
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-typescript', '@babel/preset-react'],
            },
          },
        ],
      });

      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert/"),
        "buffer": require.resolve("buffer/"),
        "process": require.resolve("process/browser.js"),
        "url": require.resolve("url/"),
        "http": false,
        "https": false,
        "zlib": false,
        "path": false,
        "fs": false
      };
      
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          process: 'process/browser.js',
          Buffer: ['buffer', 'Buffer'],
          URLSearchParams: ['url', 'URLSearchParams']
        }),
      ];
      
      return webpackConfig;
    },
  },
}; 