/**
 * Updated by Tuhin Roy on 9th March, 2019
 */

const app = require('./../index');
const authController = require('./../controllers/AuthController');
const homeController = require('./../controllers/HomeController');
const dashboardController  = require('./../controllers/DashboardController');
const jobController = require('./../controllers/JobController');
const profileController = require('./../controllers/ProfileController');
const noticeController = require('./../controllers/NoticeController');
const registrationController = require('./../controllers/RegistrationController');

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

//GET :/postJob
app.get('/postJob', jobController.getNewJob);

//POST: /postJob
app.post('/postJob', jobController.postNewJob);

//GET :/getJobs
app.get('/getJobs', jobController.getAll);


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

module.exports = app;

