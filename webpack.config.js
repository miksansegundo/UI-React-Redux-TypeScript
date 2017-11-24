
const getConfig = require('hjs-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ChildCompilerLoaderListPlugin = require('child-compiler-loader-list-webpack-plugin')
const fs = require('fs')

const config = getConfig({

  in: 'src/app.ts',
  out: 'public',
  clearBeforeBuild: '!(images|favicon.ico)',
  hostname: '192.168.1.13',
  devtool: 'source-map',
  devServer: {
    proxy: {
      context: '/api',
      options: {
        target: 'http://localhost:3002',
        pathRewrite: {
        }
      }
    }
  },
  replace: {
    config: isDev('src/config.dev.json', 'config.pro.json')
  },
  uglify: {
    compress: {
      warnings: false,
      screw_ie8: true,
      drop_console: true,
      drop_debugger: true,
      dead_code: true
    },
    output: { comments: false },
    sourceMap: false
  },
  html: false
})

const loaders = config.module.loaders
  .filter(function(item) {
    return item.test.source !== '\\.css$';
  })
  .concat({
    test: /\.css/,
    loader: 'css-loader!postcss-loader',
  })

const htmlOptions = {
  cache: false,
  hash: false,
  filename: 'index.html',
  inject: false,
  title: 'Hotelbeds',
  inlinedCSS: true,
  baseHref: '/',
  scripts: {
  },
  metaTags: {
    'description': 'Hotelbeds app'
  },
  head: `
  `,
  loadCSS: true,
  minify: {
    collapseWhitespace: true
  },
  template: './src/index.html.js'
}

config.plugins.push(
  new ChildCompilerLoaderListPlugin({
    test: /html-webpack-plugin/,
    loaders: loaders,
  }),
  new HtmlWebpackPlugin(Object.assign({}, htmlOptions, {
    filename: 'other.html',
    page: isDev('', 'Other')
  })),
  new HtmlWebpackPlugin(Object.assign({}, htmlOptions, {
    filename: 'index.html',
    page: isDev('', 'Home')
  }))
)

// TypeScript Loader

const tsLoaderConfig = config.module.loaders.find(loaderConfig => {
    return loaderConfig.loaders && loaderConfig.loaders[ 0 ] === 'awesome-typescript-loader'
  }
)

tsLoaderConfig.loaders = [
  'awesome-typescript-loader'
]

// Hot reloaded

if (process.env.NODE_ENV === 'development') {
  tsLoaderConfig.loaders.unshift('react-hot-loader/webpack')
  config.entry.unshift('react-hot-loader/patch')
}

config.resolve.extensions = config.resolve.extensions.concat(['.ts', '.tsx'])
// Post CSS
config.postcss = function (webpack) {
  return [
    require('postcss-smart-import')({ addDependencyTo: webpack }),
    require('postcss-url')({
      url: 'inline' // or "rebase" or "copy"
    }),
    require('postcss-cssnext')({
      warnForDuplicates: false,
      features: {
        autoprefixer: {
          browsers: [ '> 5%' ]
        },
        rem: {
          rootValue: 10,
          html: false
        },
        colorGray: false,
        colorHwb: false,
        colorHexAlpha: false,
        colorRebeccapurple: false,
        initial: false
      }
    }),
    require('postcss-browser-reporter')(),
    require('cssnano')({}),
    require('postcss-reporter')({clearMessages: true})
  ]
}

function isDev (ruleForDev, ruleForPro) {
  return process.env.NODE_ENV === 'development' ? ruleForDev : ruleForPro
}

module.exports = config
