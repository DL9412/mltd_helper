const express = require('express')
const app = express()
const request = require('request')

app.use('/static',express.static('static'));
app.use('/static',express.static('mltd_frontend/dist/static'));

app.use('/api', function(req, res) {
    var url = 'https://api.matsurihi.me' + req.url;
    req.pipe(request(url)).pipe(res);
});

app.get('/\*', (req, res) => {
    res.sendFile(__dirname+'/mltd_frontend/dist/index.html');
})

app.listen(80, () => console.log('listening on port 80!'))
