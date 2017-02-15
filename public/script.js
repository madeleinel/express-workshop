$(document).ready(function() {
    $.ajax({
        url: '/get-posts',
        dataType: 'json',

        // app.get(__dirname + '/data/posts.json', function (req, res) {
        //   res.sendFile(__dirname + '/get-posts');
        // })

        success: function(data) {

            for (var blogPost in data) {
                var postDiv         = document.createElement('div');
                var postText        = document.createElement('p');
                var thumbnail       = document.createElement('img');
                var postContainer   = document.getElementsByClassName('post-container')[0];

                // app.get(__dirname + '/data/posts.json', function (req, res) {
                //   res.sendFile(__dirname + '/get-posts');
                // });

                thumbnail.src = "./img/logo2.png";
                thumbnail.className = "thumbnail";
                postText.innerHTML = data[blogPost];
                postDiv.className = "post";

                postDiv.appendChild(thumbnail);
                postDiv.appendChild(postText);
                postContainer.appendChild(postDiv);

            }
        },
        error: function(error){
            console.log(error);
        }
    });
});
