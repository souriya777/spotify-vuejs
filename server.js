const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const server = express()

// here we are configuring dist to serve app files
server.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
server.get(/.*/, (_, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

server.get('/api', (_, res) => {
  res.send('TODO api')
})

const SERVER_PORT = process.env.SERVER_PORT
console.log(`Server listen on port ${SERVER_PORT}`)
server.listen(SERVER_PORT)
