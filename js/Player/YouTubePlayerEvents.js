//namespace
window.Player = window.Player || {};

//Represents enumeration of events fired by YouTubePlayer
window.Player.Events =
{
    //general events
    playerReady: "PlayerReady",
    error: "PlayerError",

    //video events
    videoLoaded: "VideoLoaded",
    videoPaused: "VideoPaused",
    videoPlay: "VideoStarted",
    videoStoped: "VideoStoped",
    videoCue: "VideoCue",
    videoBuffering: "VideoBuffering",

    playlistReady: "PlaylistReady",
    beforePlaylistReady: "BeforePlaylistReady"
};