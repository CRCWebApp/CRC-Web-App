const app = require('./../index');
const {} = require('./../models/noticeModel');

let getAll = (req,res) => {
	if(!!req.session.email){	
        return Notice.find()
            .then(notices=> {
			    res.render('notices',{
				    pageTitle:'Noties',
				    title:'Notices',
				    notices
			    });
            })
            .catch(e=> {
                throw new Error(e);
            });
    } 
    else { 
        res.redirect('/login');    
    }
};

let getNotice = (req,res) => {
	if(!!req.session.email){	
        res.render('add_notice', {pageTitle:'Add Notice'});
    }
	else{
        res.redirect('/login');
	}
}

let postNotice = (req,res) => {
	let title = req.body.title;
	let description = req.body.desc;
	req.title = title;
	req.description = description;

	var notice = new Notice({
		sender:'CRC',
		title,
		description
	});

	notice.save().then((notice) =>{
		res.redirect('dashboard');
	}).catch((e) => {
		console.log(e);
	});

}


module.exports = {getAll, getNotice, postNotice};