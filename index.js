'use strict';

const fs = require('fs'),
  path = require('path'),
  http = require('http2'),
  espreso = require('./lib/espreso');

let cachedFile = fs.readFileSync(`${path.join(__dirname, './index.js')}`),
  cachedUrl = '/index.js';

function onRequest(request, response) {
  let filename = path.join(__dirname, request.url);

  if ((filename.indexOf(__dirname) === 0) && fs.existsSync(filename) && fs.statSync(filename).isFile()) {
    response.writeHead(200);
    let fileStream = fs.createReadStream(filename);
    fileStream.pipe(response);
    fileStream.on('finish', response.end);
  } else {
    response.writeHead(404);
    response.end();
  }
}

let server = http.createServer({
  key: fs.readFileSync(`${__dirname}/cert/key.pem`),
  cert: fs.readFileSync(`${__dirname}/cert/cert.pem`)
}, onRequest);

server.listen(8080);
