const express = require('express')
const app = express()

app.use('/static',express.static('static'));
app.use('/static',express.static('mltd_frontend/dist/static'));

app.get('/\*', (req, res) => {
    res.sendFile(__dirname+'/mltd_frontend/dist/index.html');
})

app.listen(80, () => console.log('listening on port 80!'))
