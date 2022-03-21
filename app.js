var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');
    path = require("path")

var yerlerRoutes = require('./routes/yerler')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname+"/public/assets/"));
app.use(express.static(__dirname+"/public/scripts/"));
app.use(express.static(__dirname+"/public/stylesheets/"));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/main/index.html'))
});

app.use('/api/yerler', yerlerRoutes);

app.listen(port, () => {
    console.log('App is running on port' + port);
});