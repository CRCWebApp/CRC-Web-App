/**
 * Updated by Tuhin Roy on 9th March, 2019
 */


const authController = require('./../controllers/AuthController');
const homeController = require('./../controllers/HomeController');
const dashboardController = require('./../controllers/DashboardController');
const jobController = require('./../controllers/JobController');
const profileController = require('./../controllers/ProfileController');
const noticeController = require('./../controllers/NoticeController');
const registrationController = require('./../controllers/RegistrationController');
const fileController = require('./../controllers/FIleController');
const { checkSession } = require('./../middlewares/session');

module.exports = app => {
    /**
     * Root Route
     */

    //GET: / 
    app.get('/', homeController.getHome);

    /**
     * Authentication Routes
     */

    //GET: /login
    app.get('/login', authController.getLogin);

    //POST: /login
    app.post('/login', authController.postLogin);

    //GET: /logout
    app.get('/logout', authController.logout);

    /**
     * Admin Dashboard Routes
     */

    //GET: /dashboard
    app.get('/dashboard', dashboardController.getDashBoard);

    //POST: /dashboard
    app.post('/dashboard', dashboardController.postDashboard, dashboardController.storeFilteredStudents);

    /**
     * Student Registration Routes
     */

    //GET: /addStudent
    app.get('/addStudent', registrationController.getStudent);

    //POST: /registration
    app.post('/registration', registrationController.registerStudent);

    /**
     * Job Routes
     */

    //GET :/job
    app.get('/job', checkSession, jobController.getNewJob);

    //GET: /job/:id
    app.get('/job/:id', checkSession, jobController.getJobById);

    //GET: /jobs
    app.get('/jobs', checkSession, jobController.getAll);

    //GET: /job/:id/applicants
    app.get('/job/:id/applicants', checkSession, jobController.getAllJobApplicants);

    //POST: /job
    app.post('/job', checkSession, jobController.postNewJob);

    //PUT: /job/:id/apply
    app.post('/job/:id/apply', checkSession, jobController.applyToJob);

    //PUT: /job/:id/changeStatus
    app.put('/job/:id/changeStatus', checkSession, jobController.changeJobStatus);

    //DELETE:  /job/:id
    app.delete('/job/:id', checkSession, jobController.findJobByIdAndDelete);

    /**
     * Student Profile Routes
     */

    //GET: /profile
    app.get('/profile', profileController.getProfile);

    /**
     * Notice Routes
     */
    //GET :/notices
    app.get('/notices', noticeController.getAll);

    //GET: /addNotice
    app.get('/addNotice', noticeController.getNotice);

    //POST: /postNotice
    app.post('/postNotice', noticeController.postNotice);


    /**
     * File Handling Routes
     */
    //GET: /exportFile

    app.get('/exportFile', fileController.getExportFile);

    //POST: /exportFile
    app.post('/exportFile', fileController.postExportFile);

    //GET: /downloadCV/:id
    app.get('/downloadCV/:id', fileController.downloadCV);

    //GET: /downloadJD/:id
    app.get('/downloadJD/:id', fileController.downloadJD);

    //POST: /updateDP
    app.post('updateDP', fileController.updateDP);

}




