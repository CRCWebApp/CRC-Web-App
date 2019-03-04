/**
 * Created by Tuhin Roy on 4th March, 2019
 */

const app = require('./../index');
const authController = require('./../controllers/AuthController');
const homeController = require('./../controllers/HomeController');
const dashboardController  = require('./../controllers/DashboardController');
const jobController = require('./../controllers/JobController');

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
 * Job Routes
 */

//GET :/postJob
app.get('postJob', jobController.getNewJob);

//POST: /postJob
app.post('/postJob', jobController.postNewJob);

module.exports = app;

