//namespace
window.Player = window.Player || {};

//using
window.Common = window.Common || {};

//It is a facade for jquery-youtube-player library.
//Provides possibility to attach to player events.
window.Player.YouTubePlayer = function(configuration, playerContainer)
{
    //stored video details
    var currentVideoDetails;
    this.playlistLength;


	//updates currentVideoDetails and fires videoLoaded event
	var onVideoLoaded = function(video)
	{
		var loader = new window.Player.YouTubePlaylistLoader();
		loader.loadVideo(video.id, $.proxy(
				function(videoDetails)
				{
					this.currentVideoDetails = videoDetails.videos[0];
                    window.Common.Log.Instance().Debug("Video: \""+this.currentVideoDetails.name+"\" has been loaded.");
					this.eventHandler.fireEventWithData(window.Player.Events.videoPlay, this.currentVideoDetails);
				}
				, this));
	};
	

    /*------------fields---------------*/


    this.eventHandler = new window.Common.EventHandler(window.Player.Events);
    
    //extends jquery-youtube-player configuration by event handlers.
    this.config = $.extend(
        {
            //extends options by event handlers
            onReady:$.proxy(function(){this.eventHandler.fireEvent(window.Player.Events.playerReady);}, this),
            onError: $.proxy(function(msg){this.eventHandler.fireEventWithData(window.Player.Events.error, msg);}, this),
            
            onVideoLoaded: $.proxy(function(video){this.eventHandler.fireEventWithData(window.Player.Events.videoLoaded, video);}, this),
            onVideoPaused: $.proxy(function(){this.eventHandler.fireEvent(window.Player.Events.videoPaused);}, this),
            onVideoPlay: $.proxy(onVideoLoaded, this),
            onVideoCue: $.proxy(function(video){this.eventHandler.fireEventWithData(window.Player.Events.videoCue, video);}, this),
            onBuffer: $.proxy(function(){this.eventHandler.fireEvent(window.Player.Events.videoBuffering);}, this),

            onAfterPlaylistLoaded: $.proxy(function(){this.eventHandler.fireEvent(window.Player.Events.playlistReady);}, this),
            onBeforePlaylistLoaded: $.proxy(function(){this.eventHandler.fireEvent(window.Player.Events.beforePlaylistReady);}, this)
        }
        ,configuration
    );
        
    this.instance = playerContainer.player(this.config);
    window.Common.Log.Instance().Info("YouTube player has been configured and initialised.");
};

window.Player.YouTubePlayer.prototype =
{
    _executeAction: function(action)
    {
        this.instance.player(action);
        return false;
    },
    
    _onPlaylistReady:function(playlist)
    {

        this.instance.player("loadPlaylist", playlist);
		this.playlistLength = playlist.videos.length;

        window.Common.Log.Instance().Info("Playlist has been loaded, contains "+this.playlistLength+" video(s).");
        this.eventHandler.fireEvent(window.Player.Events.playlistReady);
    },
            
    hookUpButtonAction: function(button, action)
    {
        $("#"+button).find("a").click(
            $.proxy(this._executeAction, this, action)
        );
    },
    
    addListener: function(event, listener)
    {
        this.eventHandler.addListener(event, listener);
    },
    
    loadPlaylistFromUrl: function(url)
    {
        window.Common.Log.Instance().Debug("Try loading playlist using URL: "+url);
        var loader = new window.Player.YouTubePlaylistLoader();
        loader.loadPlaylistFromUrl(
                url, 
                $.proxy(this._onPlaylistReady, this)
        );
    },
	    
    getCurrentVideo:function()
    {
		return this.currentVideoDetails;
    },
			
	getPlaylistLength:function()
	{
		return this.playlistLength;
	}
};


    /*   PLAYER CONFIG
width: 425,	// player width (integer or string)
height: 356,	// player height (integer or string)
swfobject: window.swfobject,	// swfobject object
playlist: {},	// playlist object (object literal)
showPlaylist: 1,	// show playlist on plugin init (boolean)
showTime: 1,	// show current time and duration in toolbar (boolean)
videoThumbs: 0,	// show videos as thumbnails in the playlist area (boolean) (experimental)
randomStart: 0,	// show random video on plugin init (boolean)
autoStart: 0,	// auto play the video after the player as been built (boolean)
autoPlay: 0,	// auto play the video when loading it via the playlist or toolbar controls (boolean)
repeat: 1,	// repeat videos (boolean)
repeatPlaylist: 0,	// repeat the playlist (boolean)
shuffle: 0,	// shuffle the play list (boolean)
chromeless: 1,	// chromeless player (boolean)
highDef: 0,	// high definition quality or normal quality (boolean)
playlistHeight: 5,	// height of the playlist (integer) (N * playlist item height)
playlistBuilder: null,	// custom playlist builder function (null or function) see http://github.com/badsyntax/jquery-youtube-player/wiki/Installation-and-usage#fn9
playlistBuilderClickHandler: null, // custom playlist video click event handler, useful if you want to prevent default click event (null or function)
playlistAnimation: {
height: 'show',
opacity: 'show'
},
playlistSpeed: 550,	// speed of playlist show/hide animate
toolbarAppendTo: null,	// element to append the toolbar to (selector or null)
playlistAppendTo: null,	// element to append the playlist to (selector or null)
timeAppendTo: null,	// elemend to append to time to (selector or null)
videoParams: {	// video <object> params (object literal)
allowfullscreen: 'true',
allowScriptAccess: 'always',
wmode: 'transparent'
},
showToolbar: null,	// show or hide the custom toolbar (null, true or false)
toolbarButtons: {},	// custom toolbar buttons
toolbar: 'play,prev,next,shuffle,repeat,mute,playlistToggle', // comma separated list of toolbar buttons
toolbarAnimation: {
opacity: 1
},
toolbarSpeed: 500

*/