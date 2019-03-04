/**
 * Created by Tuhin Roy on 4th March, 2019
 */

const app = require('./../index');
const authController = require('./../controllers/AuthController');
const homeController = require('./../controllers/HomeController');

/**
 * Root Route
 */

app.get('/', homeController.getHome); 

/**
 * Authentication Routes
 */
app.get('/login', authController.getLogin);
app.post('/login', authController.postLogin);
app.get('/logout', authController.logout);


module.exports = app;

