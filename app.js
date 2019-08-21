const express = require('express');
const expresshbs  = require('express-handlebars');
const path = require('path');

/*  Web Server  */
const app = express();
const port = 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));

/*  Konfigurasi Express  */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));;

/*  Konfigurasi CORS Server  */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*  Konfigurasi View Engine Dengan Handlebars  */ 
app.engine('hbs', expresshbs({ extname: 'hbs', defaultView: 'home', defaultLayout: 'home' }));
app.set('view engine', 'hbs');

/*  Konfigurasi DBS MySQL  */
var connection = require('./config/db.js');

/*  Routes Management  */
const homeRoutes = require('./routes/homeRoutes');
app.use('/', homeRoutes);

/*  Log Middleware  */
const LoggerMiddleware = (req,res,next) => {
    console.log(`${req.url}  [${req.method}] - ${new Date()}`)
    next();
}
app.use(LoggerMiddleware);