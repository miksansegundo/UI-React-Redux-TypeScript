
// Fix for rxjs/util/root.js
// in line: typeof global == 'object' && global.global === global && global)
global.global = global

// HTML template
module.exports = function (context) {
  const data = Object.assign({
    charset: 'utf-8',
    metaViewport: {
      userScalable: false
    },
    lang: 'en',
    publicPath: '/'
  }, context.htmlWebpackPlugin.options)

  let result = '<!doctype html>'
  const add = function (next) {
    result += next
  }

  if (data.lang) {
    add('<html lang="' + data.lang + '">')
  }
  add('<head>')
  add('<meta charset="' + data.charset + '"/>')
  if (data.baseHref) {
    add(`<base href="${data.baseHref}">`)
  }
  if (data.metaViewport !== false) {
    const scalable = data.metaViewport.userScalable ? 'yes' : 'no'
    add('<meta name="viewport" content="width=device-width, ' +
      'initial-scale=1, ' +
      'user-scalable=' + scalable + '"/>')
  }
  if (data.metaTags) {
    for (let key in data.metaTags) {
      add('<meta name="' + key + '" content="' + data.metaTags[key] + '"/>')
    }
  }
  if (data.title) {
    add('<title>' + data.title + '</title>')
  }
  if (data.inlinedCSS) {
    add('<style>')
    add(require('./css/critical.css'))
    add('</style>')
  }
  if (data.loadCSS) {
    add('<script>')
    add(require('!raw!./vendors/loadCSS.js'))
    add('</script>')
    for (let key in context.htmlWebpackPlugin.files.css) {
      add('<link rel="preload" href="' + context.htmlWebpackPlugin.files.css[key] + '" as="style" onload="this.rel=\'stylesheet\'" />')
    }
  } else {
    for (let key in context.htmlWebpackPlugin.files.css) {
      add('<link rel="stylesheet" href="' + context.htmlWebpackPlugin.files.css[key] + '" />')
    }
  }
  if (data.head) {
    add(data.head)
  }
  add('</head>')
  add('<body>')
  add('<div id="root" class="page_wrapper sticky__scroll-container js-page-wrapper">')
  if (data.page) {
    add(require('./app.server')(data.page))
  }
  add('</div>')
  for (let key in context.htmlWebpackPlugin.files.chunks) {
    add(`<script src="${context.htmlWebpackPlugin.files.chunks[key].entry}" type="text/javascript"></script>`)
  }
  for (let key in data.scripts) {
    add(`<script async defer src="${data.scripts[key]}" type="text/javascript"></script>`)
  }
  if (data.googleAnalytics) {
    add(`<script type="text/javascript">
    window.GoogleAnalyticsObject='ga';window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
      ga('create',${data.googleAnalytics.trackingId},'auto');
      ga('send','pageview')
    </script>
    <script async defer src="https://www.google-analytics.com/analytics.js" type="text/javascript"></script>`)
  }
  add('</body>')
  if (data.lang) {
    add('</html>')
  }
  return result
}
