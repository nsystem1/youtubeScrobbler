//using
window.Player = window.Player || {};

//tests events generated by yt player
function ytPlayerTests()
{
       var config = {
        playlist: 
            {
                title: 'Random videos',
                videos: [
                    { id: 'Kv6Ewqx3PMs', title: 'Mr. Oizo Flat Beat' }
                    ]
            }
    };
    
   /* Player = new window.Player.YouTubePlayer(config, $(".youtube-player"));
    Player.addListener(Player.events.videoLoaded, VideoLoaded);

    Player.addListener(Player.events.playlistReady, function(){
        console.log("playlist ready");
    });
    Player.addListener(Player.events.error, function(){
        console.log("error");
    });
    Player.addListener(Player.events.playerReady, function(){
        console.log("plReady");
    });
    Player.addListener(Player.events.playlistReady, function(){
        console.log("playlistReady");
    });
    Player.addListener(Player.events.videoBuffering, function(){
        console.log("buffering");
    });
    Player.addListener(Player.events.videoCue, function(){
        console.log("videoCue");
    });
    Player.addListener(Player.events.videoLoaded, function(){
        console.log("vid loaded");
    });
    Player.addListener(Player.events.videoPaused, function(){
        console.log("vid paused");
    });
    Player.addListener(Player.events.MediaPlay, function(){
        console.log("vid play");
    });
    Player.addListener(Player.events.beforePlaylistReady, function(){
        console.log("before playlist ready");
    });*/
}