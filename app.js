const express = require('express')
const app = express()

app.use(express.static('static'));

app.get('/\*', (req, res) => {
    res.sendFile(__dirname+'/web/index.html');
})
app.get('/calc', (req, res) => {
    res.sendFile(__dirname+'/web/calc.html');
})

app.listen(80, () => console.log('listening on port 80!'))
