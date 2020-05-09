var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var TerserPlugin = require('terser-webpack-plugin')
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

var browserTargets = [
  '> 1%',
  'iOS >= 8.0',
  'Android >= 4.4',
  'Chrome >= 30',
  'Safari >= 9',
  'Firefox ESR',
  'Opera 12.1'
]

var babelOptions = {
  babelrc: true,
  presets: [
    ['env', {
      browsers: browserTargets
    }]
  ],
  plugins: ['transform-runtime']
}

module.exports = {
  watch: process.env.WEBPACK_WATCH === 'true',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './www'),
    publicPath: '',
    filename: 'build.js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          js: {
            loader: 'babel-loader',
            options: babelOptions
          }
        }
        // other vue-loader options go here
      }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: babelOptions
    },
    {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('postcss-smart-import')(),
              require('postcss-url')(),
              require('postcss-base64')({
                extensions: ['.svg'],
                root: 'src'
              }),
              require('postcss-cssnext')({
                browsers: browserTargets
              })
            ]
          }
        }
        ]
      })
    },
    {
      test: /\.scss$/,
      loader: 'vue-style-loader!scss-loader!scss-loader'
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CopyWebpackPlugin([{
      from: 'static/'
    }]),
    new CopyWebpackPlugin([{
      from: 'src/assets/'
    }])
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
      /// / For development:
      // 'vue-onsenui/esm': path.join(__dirname, '..', 'OnsenUI', 'bindings', 'vue', 'esm'),
      // 'vue-onsenui$': path.join(__dirname, '..', 'OnsenUI', 'bindings', 'vue', 'dist', 'vue-onsenui'),
      // 'onsenui$': path.join(__dirname, '..', 'OnsenUI', 'build', 'js', 'onsenui'),
      // 'onsenui': path.join(__dirname, '..', 'OnsenUI', 'build'),
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
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
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      optimization: {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              parse: {
                // we want terser to parse ecma 8 code. However, we don't want it
                // to apply any minfication steps that turns valid ecma 5 code
                // into invalid ecma 5 code. This is why the 'compress' and 'output'
                // sections only apply transformations that are ecma 5 safe
                // https://github.com/facebook/create-react-app/pull/4234
                ecma: 8
              },
              compress: {
                ecma: 5,
                warnings: false,
                // Disabled because of an issue with Uglify breaking seemingly valid code:
                // https://github.com/facebook/create-react-app/issues/2376
                // Pending further investigation:
                // https://github.com/mishoo/UglifyJS2/issues/2011
                comparisons: false,
                // Disabled because of an issue with Terser breaking valid code:
                // https://github.com/facebook/create-react-app/issues/5250
                // Pending futher investigation:
                // https://github.com/terser-js/terser/issues/120
                inline: 2
              },
              mangle: {
                safari10: true
              },
              output: {
                ecma: 5,
                comments: false,
                // Turned on because emoji and regex is not minified properly using default
                // https://github.com/facebook/create-react-app/issues/2488
                ascii_only: true
              }
            },
            cache: true,
            parallel: true,
            sourceMap: true // Must be set to true if using source-maps in production
          }),
          new OptimizeCSSAssetsPlugin()
        ]
      }
    })
  ])
}
