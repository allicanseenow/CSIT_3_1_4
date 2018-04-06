var path = require('path');
var webpack = require('webpack');
require('dotenv').load();

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, 'Client'),
  entry: {
    javascript: './app.js',
    html: './index.html'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2'],
          // stage-2 has already include class-properties
          // plugins: [
          //   'transform-class-properties'
          // ]
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[name].[ext]',
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1000,
            }
          }
        ]
      },
      {
        test: /\.jpg$/,
        use: [
          { loader: "file-loader" }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })

  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    compress: true,
    port: process.env.PORT || 9000,
    /*
      Enable this 'proxy' if we want to bypass CSRF blocking
      EG: If this port is 9000, when we access a link from 'localhost:9000/api'
        http://localhost:9000/api/v2/disciplines
      It will actually redirect user to 'target/api'
       'https://1scope.com'
     */
    proxy: {
      "/api": {
        target: 'http://localhost:8080',
        pathRewrite: {"^/api" : ""},
        changeOrigin: true,
        secure: true,
        // bypass: function(req, res, proxyOptions) {
        //   if (req.headers.accept.indexOf("html") !== -1) {
        //     console.log("Skipping proxy for browser request.");
        //     return "/index.html";
        //   }
        // }
      }
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    },
  }
};