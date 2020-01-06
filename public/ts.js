var app = require('express')();
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./private.pem', 'utf8');
var certificate = fs.readFileSync('./file.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = 18080;
var SSLPORT = 18081;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {

    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

// Welcome
app.post('/configurationjs', function(req, res) {
    if(req.protocol === 'https') {
        console.log(req)
      //  res.status(200).send('Welcome to Safety Land!');
        let response={"versionPlatform":"unknown","editorParameters":{},"imageFormat":"svg","CASEnabled":false,"parseModes":["latex"],"editorToolbar":"","editorAttributes":"width=570, height=450, scroll=no, resizable=yes","base64savemode":"default","modalWindow":true,"version":"7.14.0.1421","enableAccessibility":true,"saveMode":"xml","saveHandTraces":false,"editorUrl":"https://www.wiris.net/demo/editor/editor","editorEnabled":true,"chemEnabled":true,"CASMathmlAttribute":"alt","CASAttributes":"width=640, height=480, scroll=no, resizable=yes","modalWindowFullScreen":false,"imageMathmlAttribute":"data-mathml","hostPlatform":"unknown","wirisPluginPerformance":true}
        res.json(response);
    }
    else {
        res.status(200).send('Welcome!');
    }
});