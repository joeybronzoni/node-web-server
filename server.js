const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');



const PORT = 3000;



// MiddleWare
hbs.registerPartials(__dirname + '/views/partials'); // Support partials
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {/*!*! requires a 3rd argument which is a callback function. Without it you will get a deprecated warning */
	if (err){console.log('Unable  to append to server.log');};
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintainence.hbs', {
// 	pageTitle: 'Maintence Page',
// 	welcomeMessage: 'Be right Back!',
// 	copyleft: `Copyleft`
//   });
// });

app.use(express.static(__dirname +'/public'));

// ap4
// ap5


// helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


// Routes
app.get('/', (req,res ) => {
  // res.send('Hello Express!');
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
	pageTitle: 'Home Page',
	welcomeMessage: 'Welcome to joeyBeeBee\'s House of Handlebars!',
	copyleft: `Copyleft`
  });
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
	pageTitle: 'About Page',
  });
});

app.get('/bad', (req,res ) => {
  res.send({
	errorMessage: 'Bad Route Yo, Unable to handle your request?'
  });
});




// This is a binding the application to a port on the machine
// app.listen(3000);
// app.listen(); takes an optional second argument which is a function

// // This grabs a random port number
// const server = app.listen(app.get('port'), () => {
//   console.log(`Express running → PORT ${server.address().port}`);
// });

const server = app.listen(PORT, () => {
  console.log(`Express running → PORT ${PORT}`);
});


// Lecture notes:
/*
-DEPRECATED WARNINGS?UPDATES:
  - fs.appendFile now requires a 3rd argument which is a callback function. Without it you will get a deprecated warning

- DEV-TOOLS NETWORK TAB:
  -localhost response, General gives us the url, request method(GET/POST/etc), remote addressm and the status code
  -Response Headers gives us the Content-Type: tells the client what type of data came back. It could be an html website, JSON data, text, and teh client can be any other computer with network abilities

- MIDDLEWARE:
  - lets us configure how our express app works, think of it like a 3rd-party add-on
  - express.static()
  - if express doesn't have something that you have you can create some middleware and teach it(express) how to do that thing.
  - app.use is how to register middleware
  -middleware can do anything from run some code, return some text, respond to a request, etc
  -  // next() is what we run to let express know that our middleware is done.
  If we don't run next() the following handlers won't ever fire. The app will be stuck on a loading screen.
  if you try it you will see. Run an app.use() without running next(); at the end of it.
  - The order in which you define your middleware an routes matters. if you want to keep all rendered pages private if
  say a help.html is defined before our maintainence middleware then it will still be rendered, we don't typically want that

- TEMPLATING ENGINE
  - handlebars, reusable markup. (Handlebars view engine for express). We are install H-V-E for
  express which is a module, a wrapper around handlebars
  - support partials with hbs
  - *!*!*! if nodemon doesn't recognize the .hbs extension we can run nodemon with this command:
     - nodemon server -e <extensions-comma separated>  : nodemon server -e js,hbs
	 - partials are handlebars helpers which are ways for us to register functions to run,
	 to dynamically creat some output

*/
