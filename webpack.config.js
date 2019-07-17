const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
        {
            test: [/.js$|.ts$/],
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                    ]
                }
            }
        },

        {
            // Exposes jQuery for use outside Webpack build
            test: require.resolve('jquery'),
            use: [{
              loader: 'expose-loader',
              options: 'jQuery'
            },{
              loader: 'expose-loader',
              options: '$'
            }]
          },

      {
        test: [/.css$|.scss$/],
        use: [{
            loader: 'style-loader', // inject CSS to page
          }, {
            loader: 'css-loader', // translates CSS into CommonJS modules
          }, {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function () { // post css plugins, can be exported to postcss.config.js
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }, {
            loader: 'sass-loader' // compiles Sass to CSS
        }],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/images/'
                }
            }
        ]
    }
    ]
  },

  plugins: [
    // Provides jQuery for other JS bundled with Webpack
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Popper: ['popper.js', 'default']
    })
    ],

  resolve: {
    alias: {
        '@scss': path.resolve(__dirname, '../src/styles/scss'),
        '@img': path.resolve(__dirname, '../src/assets/images'),
        '@': path.resolve(__dirname, '../src')
    },
    modules: [
        'node_modules',
        path.resolve(__dirname, 'src')
    ],
    extensions: ['.js', '.ts']
},
};