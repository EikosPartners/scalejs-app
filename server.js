// Imports:
const http = require('http');
const pjsonLoader = require('pjson-loader');
const express = require('express');
const bundler = require('./server/bundler.js');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
app.use(express.static('public'));
app.use(bodyParser.json());

// pjson setup.
pjsonLoader.load(app, {
    jsonTransform: (req, res, data) => {
        // Transform data before return:
        return data;
    }
}, (err) => {
    if (err) {
        console.log(err);
    }
});

bundler(app);

/* GET home page. */
app.get('/', (req, res, next) => {
    res.sendFile('index.html', { root: 'public' });
});

/* GET Colors */
app.get('/colors', (req, res, next) => {
    res.send({
        data: [
            {
                value: 0,
                text: 'Red'
            },
            {
                value: 1,
                text: 'Orange'
            },
            {
                value: 2,
                text: 'Yellow'
            },
            {
                value: 3,
                text: 'Green'
            },
            {
                value: 4,
                text: 'Blue'
            },
            {
                value: 5,
                text: 'Purple'
            }
        ]
    })
});

server.listen(process.env.PORT || 3000, () => {
    console.log('Listening on %j...', server.address());
});

module.exports = app;
