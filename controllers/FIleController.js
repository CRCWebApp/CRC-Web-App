/**
 * Created by Tuhin Roy on 9th March,2019
 */
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const path = require('path');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

/**
 * Export File GET Handler
 * @param {*} req 
 * @param {*} res 
 */
let getExportFile = (req,res) => {
    if(!!req.session.email){
        let file = path.join(__dirname,'../studentsRecord.xls');
		res.download(file);	
	}
	else{
        res.redirect('/login');
    }
	
}

/**
 * Export File POST Handler
 * @param {*} req 
 * @param {*} res 
 */
let postExportFile = (req,res) => {
	var students = req.body.fetchedData
	var data='';
	for (var i = 0;i < students.length; i++) {
    	data=data+students[i][0]+'\t'+students[i][1]+'\t'
    		+students[i][2]+'\t'+students[i][3]+'\t'+students[i][4]+'\t'
    		+students[i][5]+'\t'+students[i][6]+'\t'+students[i][7]+'\t'+students[i][8]
    		+'\t'+students[i][9]+'\t'+students[i][10]+'\t'+students[i][11]+'\n';
 	}
	writeFile('studentsRecord.xls',data)
		.then(() => {
			res.send();
		})
		.catch(() => {
			console.log('Error');
		});
	
}
/**
 * Download CV Request Handler
 * @param {*} req 
 * @param {*} res 
 */
let downloadCV = (req,res) => {
	if(!!req.session.emai){	
        res.download(path.join(__dirname,`../docs/cv_${req.params.id}.doc`));
        setTimeout(()=> {
            res.redirect('/dashboard');
        },500)
	}
	else{
        res.redirect('/login');
    }
}

/**
 * Download JD Request Handler
 * @param {*} req 
 * @param {*} res 
 */
let downloadJD = (req,res) => {
    if(!!req.session.email){	
        res.download(path.join(__dirname,`../docs/jd/jd_${req.params.id}.doc`));
        setTimeout(()=> {
            res.redirect('/dashboard');
        },500)
	}
	else{
        res.redirect('/login');
    }
}

/**
 * Update Profile Picture Request Handler
 * @param {*} req 
 * @param {*} res 
 */
let updateDP = (req,res) => {
    let dp = req.files.dp;
	let myKey = `dp_${req.session.email}.jpg`;
	let myBucket = 'troy96';
	dp.mv(`public/images/dp/dp_${req.session.email}.jpg`, function(err) {
	if (err)
		return res.status(500).send(err);			
	fs.readFile(`public/images/dp/dp_${req.session.email}.jpg`, function (err, data) {
		if (err) return res.status(500).send(err);
		params = {Bucket: myBucket, Key: myKey, Body: data };
  		s3.putObject(params, function(err, data) {
			  if (err) {
				  console.log(err)
			} else {
				  console.log("Successfully uploaded data to myBucket/myKey");
		}
	});
});
res.redirect('/profile'); 
});

}

module.exports = {getExportFile, postExportFile, downloadCV, downloadJD, updateDP};