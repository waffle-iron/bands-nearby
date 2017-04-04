require('babel-register')

const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const ReactRouter = require('react-router')
const ServerRouter = ReactRouter.ServerRouter
const _ = require('lodash')
const fs = require('fs')
const PORT = 5050
const baseTemplate = fs.readFileSync('./public/index.html')
const template = _.template(baseTemplate)
const App = require('./src/App').default
var jsdom = require('jsdom').jsdom;
global.document = jsdom('');
global.window = document.defaultView;
global.window.matchMedia = function() {
  return true
}

const server = express()

server.use('/public', express.static('./public'))

server.use((req, res) => {
  if (req.url === '/') {
    const context = ReactRouter.createServerRenderContext()
    var body = ReactDOMServer.renderToString(
      React.createElement(ServerRouter, {location: req.url, context: context},
        React.createElement(App)
      )
    )
  }


  res.write(template({body: body}))
  res.end()
})

// console.log('listening on port', PORT)
server.listen(PORT)
