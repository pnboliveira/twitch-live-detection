$(document).ready(function () {
    //This activates the stream check function.
    set_twitch_stream_status();

    // Variable to store a given username.
    let username = 'BobRoss';

    //The variable below is a list of mobile devices a given user
    //may be visiting. This is entirely optional, but recommended
    //if you want to show just the player on mobile.

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    // The Twitch API uses AJAX requests for transporting data, 
    // whether it's their streams, users or games.
    // I recommend using Insomnia to test out the data you send or
    // receive. For more info on these references, visit
    // the following URL: https://dev.twitch.tv/docs/api/reference

    function set_twitch_stream_status() {
        $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/helix/streams',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer <token>' 
                // Starting April 30th 2020, you need to generate an authentication
                // token for your application to call Twitch API requests.
                // For more info: https://dev.twitch.tv/docs/authentication
            },
            data: {
                'user_login': username
              //   Alternatively, you can also use  'user_id': '105458682'
            },
            error: set_twitch_offline, 
            success: function (response) {
                if (!response || !response['data'] || response['data'].length == 0) {
                    set_twitch_offline();//If there is no data, the file will execute the offline function.
                    return;
                }
                // From this point, the function will check if a user is on Mobile. 
                // If they are, this will execute the corresponding function for mobile.
                // Alternatively, you can also send over a game ID if you want to print
                // a game name. These functions will be commented.


                // OPTIONAL: Store username with the following:
                // username = response['data'][0]['user_name'];

                if (isMobile.any()) {
                    
                    jQuery('#stream').append('<h3>Live Feed</h3><hr /><div class="video-container"><iframe src="https://player.twitch.tv/?channel='+ username +'" frameborder="0" height="378" width="100%"></iframe></div><div>&nbsp;</div><h4>Join in the conversation over at <a href="https://www.twitch.tv/'+ username +'" target="_blank">our Twitch page!</a></h4>')
                    //OR: set_twitch_stream_status_mobile(response['data'][0]['game_id']);
                } else {
                    
                    jQuery('#stream').append('<h3>Live Feed</h3><hr /><div class="video-container"><iframe src="https://player.twitch.tv/?channel='+ username +'" frameborder="0" height="378" width="100%"></iframe></div><div class="col m4 l4 hide-on-small-only"><iframe src="https://www.twitch.tv/embed/'+ username +'/chat" frameborder="0" height="440" width="100%"></iframe></div>')
                    //OR: set_twitch_stream_status_cont(response['data'][0]['game_id']);
                }

            }
        });
    }
    
    // Optional Game fetching functions

   /*  function set_twitch_stream_status_cont(game_id) {
        $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/helix/games',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer <token>'
            },
            data: {
                'id': game_id
            },
            error: set_twitch_offline,
            success: function (response) {
                if (!response || !response['data'] || response['data'].length == 0) {
                    set_twitch_offline();
                    return;
                }

                jQuery('#stream').append('<h3>Live Feed</h3><h6>Currently streaming '+ response['data'][0]['name'] + '</h6><hr /><div class="video-container"><iframe src="https://player.twitch.tv/?channel='+ username +'" frameborder="0" height="378" width="100%"></iframe></div><div class="col m4 l4 hide-on-small-only"><iframe src="https://www.twitch.tv/embed/'+ username +'/chat" frameborder="0" height="440" width="100%"></iframe></div>')
            }
        })
    } */

    /* function set_twitch_stream_status_mobile(game_id) {
        $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/helix/games',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer <token>'
            },
            data: {
                'id': game_id
            },
            error: set_twitch_offline,
            success: function (response) {
                if (!response || !response['data'] || response['data'].length == 0) {
                    set_twitch_offline();
                    return;
                }

                jQuery('#stream').append('<h3>Live Feed</h3><h6>Currently streaming '+ response['data'][0]['name'] + '</h6><hr /><div class="video-container"><iframe src="https://player.twitch.tv/?channel='+ username +'" frameborder="0" height="378" width="100%"></iframe></div><div>&nbsp;</div><h4>Join in the conversation over at <a href="https://www.twitch.tv/'+ username +'" target="_blank">our Twitch page!</a></h4>')
            }
        })
    } */

    // End of Optional Game fetching functions

    // This will send the message that the stream is currently offline.
    function set_twitch_offline() {
       
                document.getElementById("stream").innerHTML = "Hey! This Twitch stream isn-t online. Check your API settings or your User Login.";
            
    }
});
