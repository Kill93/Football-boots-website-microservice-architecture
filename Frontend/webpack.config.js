var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.woff$/,
        use: 'file-loader?name=[name].[ext]&outputPath=../fonts/&publicPath=/bld/fonts/&mimetype=application/font-woff'
      }
      ,
      {
        test: /\.woff2$/,
        use: 'file-loader?name=[name].[ext]&outputPath=../fonts/&publicPath=/bld/fonts/&mimetype=application/font-woff2'

      }
      ,
      {
        test: /\.ttf$/,
        use: 'file-loader?name=[name].[ext]&outputPath=../fonts/&publicPath=/bld/fonts/&mimetype=application/font-sfn'
      }
      ,
      {
        test: /\.eot$/,
        use: 'file-loader?name=[name].[ext]&outputPath=../fonts/&publicPath=/bld/fonts/'
      }
      ,
      {
        test: /\.svg$/,
        use: 'file-loader?name=[name].[ext]&outputPath=../fonts/&publicPath=/bld/fonts/&mimetype=image/svg+xml'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {test: /\.scss?$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.css?$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
