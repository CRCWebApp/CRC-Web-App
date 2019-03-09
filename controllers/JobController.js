/**
 * Created by Tuhin Roy on 9th March, 2019
 */

const {Job} = require('./../models/jobModel');
const path  = require('path');

/**
 * New Job GET Request Handler
 * @param {*} req 
 * @param {*} res 
 */

let getNewJob = (req,res) => {
    if(!!req.session.email){	
			res.render('job', {pageTitle:'Post Job'});
	}
	else{
		res.redirect('/login');
	}
}

/**
 * New Job POST Request Handler
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * Get All Jobs Request Handler
 * @param {*} req
 * @param {*} res
 */
let getAll = (req,res) => {

	if(typeof req.session.email === 'undefined'){	
		res.redirect('/login');
	}
	else{
		Job.find({}).then((jobs) => {
			res.render('viewJobs', {pageTitle:'Get Jobs',jobs});
		}).catch((e) => {
			console.log(e);
		});
	}
}

module.exports = {
    getNewJob,
		postNewJob,
		getAll
}
