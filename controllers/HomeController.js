const app = require('./../index');

let getHome = (req,res) => {

	if(!!req.session.email){
        (app.locals.type === 'Student') 
            ?
                res.redirect('/profile') 
            :
                res.redirect('/dashboard');
    }
    else{
	    res.render('index',{
		    pageTitle:'Welcome to CRC, Invertis University'
	    });
    }
}
module.exports = {getHome}; 