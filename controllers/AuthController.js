const {Student}  = require('./../models/studentModel');
const {Admin} = require('./../models/adminModel');
const app = require('./../index');

let getLogin =  (req, res) => {
	if(!!req.session.email){
		(app.locals.type === 'Student') 
			?
				res.redirect('/profile') 
			:
				res.redirect('/dashboard')
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
		return Student.find({email}).then(student => {
			return Student.checkValidPasswords(pass, student[0].password).then(() => {
				let Type = student[0].type;
				req.session.email = email;
				req.session.pass = pass;
				app.locals.session = req.session;
				app.locals.utype  = 'Student';
				res.redirect('/profile');
			}).catch(e => {
				res.status(401).send();
			});
		})
		.catch(() => {
			Admin.find({email}).then((admin) => {
				Admin.checkValidPasswords(pass, admin[0].password).then(() => {
					let Type = admin[0].type;
					req.session.email = email;
					req.session.pass = pass;
					app.locals.session = req.session;																																																					
					app.locals.utype = Type;																																																																																																																																																																																																			
					res.redirect('/dashboard');
				}).catch((e) => {
					res.status(401).send();
			});																																																																																																																																					
		})
		.catch(e => console.log('Error', e))

						
	});
	}
	
let logout = (req,res) => {
	(!!req.session.email) 
		?	
			res.redirect('/login') 
		:
			req.session.destroy();
			res.redirect('/');
}
	
module.exports = {
	getLogin,
	postLogin,
	logout
}


