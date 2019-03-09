const {Job} = require('./../models/jobModel');
const path  = require('path');

let getNewJob = (req,res) => {
    if(typeof req.session.email === 'undefined'){	
		res.redirect('/login');
	}
	else{
		res.render('job', {pageTitle:'Post Job'});
    }
}

let postNewJob = (req,res) => {
  let comp_name = req.body.comp_name;
	let placement_type = req.body.placement_type;
	let location = req.body.location;
	let venue = req.body.venue;
	let date = req.body.date;
	let time = req.body.time;
	let eligibility = req.body.eligibility;
	let jd = req.files.jd;

	let comp_key = comp_name.split(' ');
	comp_key = comp_key[0];

	jd.mv(path.join(__dirname,`../docs/jd/jd_${comp_key}.doc`), err=> {
    if (err) return res.status(500).send(err);
      	console.log('JD uploaded!');
      });
    const job = new Job({
			comp_name, placement_type, location, venue, date, time, eligibility, comp_key
	});


	return job.save()
		.then(job => {
			res.redirect('/dashboard');
		})
		.catch(e => {
			console.log('Error'+e);
	});

}

module.exports = {
    getNewJob,
    postNewJob
}
