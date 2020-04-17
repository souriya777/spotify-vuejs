const express = require('express')

const createApp = require('./app')

const server = express()

server.get('*', (req, res) => {
  const context = { url: req.url }
  const app = createApp(context)

  const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./public/index.html', 'utf-8')
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      // FIXME handle error...
      res.end('error')
    }
    res.end(html)
  })
})

const PORT = process.env.SERVER_PORT | 3000
console.log(`Server listen on port ${PORT}`)
server.listen(PORT)
