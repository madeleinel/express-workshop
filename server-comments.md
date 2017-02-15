// Us fs (file-system) -- a built-in node module -- to save the data (of blog posts coming through to the server) on the computer's hard drive
// Built-in core node modules are similar to built-in Express middleware functions -- however, the Express functions require Express to be installed, whereas Node modules come automatically with Node
var fs = require('fs');

//// var newPost = document.querySelectorAll("blogpost");

// Use 'fs.readFile' method to read the data that's in the target file ('posts.json')
// The method takes 2 arguments >> 'path/to/file' == the location of the file you want to read from | function == the callback function
// the 'fs.readFile' callback function takes 2 arguments >> the second argument ('file') is the file that's being read
fs.readFile(__dirname + '/data/posts.json', function (error, file) {
  // console.log(file.toString());
  var parsedFile = JSON.parse(file);  // As the 'file' is in JSON format >> need to use 'JSON.parse' to parse it back to a JavaScript object | Creates new variable 'parsedFile', which is a JavaScript object, which you can access the data inside of

  fs.writeFile(__dirname + '/data/posts.json', parsedFile, function (error) {
    var file = JSON.stringify(parsedFile);
  });
});

// '__dirname' is a node global object that gives a path to the current working directory; this way, you can avoid having to write out the whole path

// Use 'fs.writeFile' method to write the data to the hard drive
// Set it up as 'fs.writeFile('path/to/file', yourData, function (error)' >> The method takes 3 arguments: 'path/to/file' == path to/location of the file you want to write to | yourData == the data you want to write | function == the callback function
// If the file to write to doesn't exist, 'fs.writeFile' can create one for you (not sure how that works)
// fs.writeFile(__dirname + '/data/posts.json', yourData, function (error) {
//   var unParsedFile = JSON.stringify(yourData);
// });

// Use 'require' command to access the functionality of the express library (from another file); ie import Express
// 'Require is used in Node.js to import functionality from another file or an external module'
var express = require('express');

// Calling the 'express' function to initialise the server; this creates and an Express application to work with
var app = express();

          // // Create a handler function >> takes two parameters; the endpoint at which to trigger an action, and a handler function (telling it what to do when it reaches the endpoint)
          // // handler functions receives and handles requests | the endpoint is the part of the URL that comes after '/' >> eg '/chocolate' is the 'chocolate' endpoint
          // // Use the 'app.get' method to define a handler function in Express
          // // The handler function always takes a request and response object, and sends the response (along with some information) back to the client
          // app.get("/", function(req, res) {
          //   res.send("Woop woop!"); // Use the 'res.send' to send back a message to the client (in this case, will display "Woop woop!" on the localhost:3000 site)
          // })

          //// Use the 'app.get' method to set up routing in the server; create new endpoints, and set different responses for different endpoints
          // app.get("/hello", function(req, res) {
          //   res.send("Hello World!");
          // })
          // app.get("/goodbye", function(req, res) {
          //   res.send("Goodbye World!");
          // })

// Instead of the 'app.get' method >> Use 'app.use' to tell the server to serve static assets back to the browser
// Use 'express.static()' -- 'a special, built-in middleware function that comes with Express' -- to be able to send any file from the server
// Call "public" to serve the static assets within the "public" folder within the same directory
// Static assets == HTML files, images, etc
app.use(express.static("public")); // In this case, this will display the pre-made html, css & js files that are stored within the "public" folder

// Use require to enable using express-formidable in the code (see full reasoning below 'app.post('/create-post')')
var formidable = require('express-formidable');
app.use(formidable());

// Set up an endpoint for creating new blog posts; define a route to deal with requests that come through this endpoint
// Use app.post to send data to the server; 'post'ing it to the server
app.post('/create-post', function(req, res) {
  console.log(req.fields); // Will display the object '{ blogpost: '[content]' }' in the terminal | object format >> '{ key: 'value' }'
});
// The data has been POSTed to the server as FormData >> Another middleware function ('express-formidable') is needed to extract the contents from the FormData object
// Use 'require' to import 'express-formidable' functionality | ha been set as a 'dependency' in 'package.json'
// >> See 'var formidable' line

// Set up port for the server to listen to; any requests coming to the server will come through this port; Setting a port allows us to find where the server is running
// Use the 'app.listen' method to set up the port >> the method takes to arguments; the port ('3000') and a callback function, which tells it what to do once the server is running
// Set the callback function to be a console.log
app.listen(3000, function() {
  console.log('Server is listening on port 3000. Ready to accept requests!')
});

        // Switch on the server (need to set up a port using 'app.listen' first); Use the 'node' keyword in the command line to run the server file
        // >> In the terminal >> node server.js
        // >> the terminal should display the console.log message specified above





        // fs.readFile('/create-post', function (error, file) {
        //
        //   fs.writeFile('/data/posts.json', newPost, function (error) {
        //   })
        // })
        //
        // // Takes the content written into the site textbox & console.log's it within the terminal
        // app.post('/create-post', function(req, res) {
        //   var newPost = req.fields.blogpost;
        //   console.log(newPost);
        //
        //
        //   // Writes the new content to the file 'posts.json'
        //   fs.writeFile(__dirname + '/data/posts.json', newPost, function (error) {
        //      var file = JSON.stringify(newPost);
        //      console.log(file);
        //    });
        // });
        //
        // // When new blog post comes in, read from the 'posts.json' file to access its content
        // app.get("/create-post", function(req, res) {
        //   // console.log(req.fields);
        //
        //   fs.readFile(__dirname + '/data/posts.json', function (error, file) {
        //     var parsedFile = JSON.parse(file);
        //
        //   });
        // });
