var fs = require('fs');

var express = require('express');
var app = express();

app.use(express.static("public"));

var formidable = require('express-formidable');
app.use(formidable());

// // req.fields.blogpost == the content of the blog post

// //  read content from html input
// //   add it to blog posts file
// //   add to posts.json
// //   display these posts on the site

//////// is this function necessary?? what does it do exactly??
app.get('/create-post', function (req, res) {
  res.sendFile(__dirname + '/data/posts.json');
});
////////

//// to send the nex post to 'posts.json':
//// post > read > write
app.post('/create-post', function (req, res) {

  fs.readFile(__dirname + '/data/posts.json', function (error, file) {
    var theDate = Date.now();
    var parsedFile = JSON.parse(file);

    parsedFile[theDate] = req.fields.blogpost;

    fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(parsedFile, null, 4), function (error) {
    });
  });
});
////
////

// // 'posts.json' data now displayed at 'url/create-post'

app.listen(3000, function() {
  console.log('Server is listening on port 3000. Ready to accept requests!')
});
