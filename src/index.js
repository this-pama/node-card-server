import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

// middleware

app.use(bodyParser.json({
  limit : config.bodyLimit
}));
// Use middleware to set the default Content-Type
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});

//allow cross origin request
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
	next();
});

// api routes v1
app.use('/v1', routes);


//route response for default home
app.get('/', function(req, res){
	res.send("Welcome")
})

//hardcoded login route
app.post('/login', (req, res) => {
	if(req.body.email == "adedapopaul@yahoo.com" && req.body.password == 'password'){
		res.json({
			text: 'login successful'
		})
	}
	else{
		res.json({
			text: 'user does not exist'
		})
	}
})

app.server.listen(config.port);

console.log(`Started on port ${app.server.address().port}`);

export default app;
