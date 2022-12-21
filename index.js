const fs = require('fs')
const express = require('express')
const https = require('https')

var privateKey = fs.readFileSync('./ssl/private.pem');
var certificate = fs.readFileSync('./ssl/public.crt');

const app = express()
const port = 443

app.all('/health', (req, res) => {
    res.end();
});

app.all('/*', (req, res) => {
    let msg = `${req.protocol}://${req.headers.host}${req.path}`;
    console.log(msg);
    res.end();
})

https.createServer({key: privateKey, cert: certificate}, app)
    .listen(port);


