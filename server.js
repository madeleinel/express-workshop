var fs = require('fs');

var express = require('express');
var app = express();

app.use(express.static("public"));

var formidable = require('express-formidable');
app.use(formidable());

// req.fields.blogpost == the content of the blog post

// read content from html input
// add it to blog posts file
// add to posts.json
// display these posts on the site

// post > read > write

app.get('/create-post', function (req, res) {
  res.sendFile(__dirname + '/data/posts.json');
});

app.post('/create-post', function (req, res) {
  // var newPost = req.fields.blogpost;

  fs.readFile(__dirname + '/data/posts.json', function (error, file) {
    var theDate = Date.now();
    var parsedFile = JSON.parse(file);

    parsedFile[theDate] = req.fields.blogpost;

    fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(parsedFile, null, 4), function (error) {

    });
  });
});

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




app.listen(3000, function() {
  console.log('Server is listening on port 3000. Ready to accept requests!')
});
