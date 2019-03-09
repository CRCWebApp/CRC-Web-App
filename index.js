const express = require('express');
const expressValidator = require('express-validator'); 
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = module.exports = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const {mongoose} = require('./db/mongoose');
const hbs = require('express-handlebars');
const util = require('util');
const fileUpload = require('express-fileupload');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();


require('dotenv').config();

app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
	secret:'A Secret',
	resave: true,
    saveUninitialized: true
	}));
app.engine( 'hbs', hbs( { 
  extname: 'hbs', 
  defaultLayout: __dirname + '/views/layouts/layout.hbs', 
  helpers: require('./config/handlebars-helpers'), 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir:[ __dirname + '/views/partials1/',  __dirname + '/views/partials2/']
} ) );

app.set( 'view engine', 'hbs' );
app.use(fileUpload());


app.use((req, res, next) => {				//Middleware to pass the session object to the front-end
    app.locals.session = req.session;
    next();
  });

  

app.use(function(req, res, next) {
	res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	next();
});






app.post('/addNotice',  /*(req,res,next) => {	
	var studentsEmails = [];
	Student.find({}).then((students) => {
			students.forEach((student) => studentsEmails.push(student.email));
			var transporter = nodemailer.createTransport({
  				service: 'gmail',
  				auth: {
    			user: 'troy0870@gmail.com',
    			pass: process.env.Jello
  				}
			});

			var mailOptions = {
  				from: 'troy@gmail.com',
  				to: studentsEmails,
  				subject: req.title,
  				text: req.description
			};

			transporter.sendMail(mailOptions, function(error, info){
  			if (error) {
    			console.log(error);
  			} 
			});
		}).catch((e) => {
			console.log(e);
		});

		
}*/);


app.get('/addStudent',);


app.post('/registration',  /*(req,res,next) => {
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
	  	user: 'troy0870@gmail.com',
	  	pass: process.env.Jello
		}
  	});

  	var mailOptions = {
		from: 'troy0870@gmail.com',
		to: req.email,
		cc: ['troy0870@gmail.com','sweetkumar26.95@gmail.com','nutan110125@gmail.com','17.sarthakagarwal@gmail.com','prerawat005@gmail.com','anil.p@invertis.org','varun.s@invertis.org'],
		subject: 'Thank you for registering with the CRC Department, Invertis University',
		text: `Hey ${req.email}!

			   				Kindly note that your account was successfully created/updated at our end.

			   				PS - This is an auto-generated email. 

			   				Thanks,
			   				Tuhin`
 	 };

  	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
	  		console.log(error);
		}
		res.redirect('/dashboard');		
	});*/
);  

app.post('/exportFile', );

/*app.get('/modal', (req,resume) => {
	res.render('modal');
});*/

app.get('/exportFile', );



app.get('/downloadCV/:id', );

app.get('/downloadJD/:id', );

app.post('/updateDP', );

require('./routes/routes');

app.listen(PORT, () => {
	console.log(`Server listening at ${PORT}...`);
});