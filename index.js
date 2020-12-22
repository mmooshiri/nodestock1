// Stock Market APP
const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const request = require('request');
const bodyparser = require('body-parser');

const port = process.env.port || 5000;


// use bodyparser middleware
app.use(bodyparser.urlencoded({ extended: false }));


// API Key pk_31b223a54a57442d99b773a1c453a0b3


// create call_API function

function call_api(finishedAPI, ticker) {

    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_31b223a54a57442d99b773a1c453a0b3', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        if (res.statusCode == 200) {

            finishedAPI(body);
        };
    });
};
// set handlebar middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
const otherstuff = "helo there, this is other stuff..";
// set handlebar index get routes
app.get('/', function(req, res) {
    call_api(function(doneAPI) {
        res.render('home', {
            stock: doneAPI
        });

    }, "fb");
});
// Set Handlebar Post route
app.post('/', function(req, res) {
    call_api(function(doneAPI) {
        // var posted_stuff = req.body.stock_ticker
        res.render('home', {
            stock: doneAPI,
        });
    }, req.body.stock_ticker);
});
// Create about page route
app.get('/about.html', function(req, res) {
    res.render('about');
});

// create static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log('Server listening on port ' + port));