const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports= {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'assets','scripts'),
        publicPath: '/dist/'
    },
    devServer: {
        static: {
          directory: path.join(__dirname),
        },
        devMiddleware: {
          publicPath: '/dist/',
          writeToDisk: true,
       },  
        historyApiFallback: true,
        port: 9000,
      },
      devtool: 'eval-cheap-module-source-map',
      plugins: [
        new CleanPlugin.CleanWebpackPlugin()
      ]
};