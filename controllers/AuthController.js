const {Student}  = require('./../models/studentModel');
const {Admin} = require('./../models/adminModel');
const app = require('./../index');

let getLogin =  (req, res) => {
		if(typeof req.session.email !== "undefined"){
			if(app.locals.type === 'Student'){
				res.redirect('/profile');
			}
			else{
				res.redirect('/dashboard');
			}
		}
		
		else{
			res.render('login',{
				pageTitle:'Login'
			});
		}
	};
	
let postLogin = (req,res) => {		
		let email = req.body.email;
		let pass = req.body.pass;
		Student.find({email}).then((student) => {
			Student.checkValidPasswords(pass, student[0].password).then(() => {
				let Type = student[0].type;
				req.session.email = email;
				req.session.pass = pass;
				app.locals.session = req.session;
				app.locals.type = Type;
				res.redirect('/profile');
			}).catch((e) => {
				res.status(401).send();
			});
		}).catch((e) => {
			Admin.find({email}).then((admin) => {
				Admin.checkValidPasswords(pass, admin[0].password).then(() => {
					let Type = admin[0].type;
					req.session.email = email;
					req.session.pass = pass;
					app.locals.session = req.session;
					app.locals.type = Type;
					res.redirect('/dashboard');
				}).catch((e) => {
					res.status(401).send();
			});
		})
		.catch((e) => console.log('Error', e))
		
						
	});
	}
	
let logout = (req,res) => {
		if(typeof req.session.email === 'undefined'){	
			res.redirect('/login');
		}
		else{  
			req.session.destroy();
			res.redirect('/');
		}
	}
	
module.exports = {
	getLogin,
	postLogin,
	logout
}


