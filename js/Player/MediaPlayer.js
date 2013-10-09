//namespace
window.Player = window.Player || {};

window.Common = window.Common || {};

window.Player.MediaPlayer = function(configuration, container)
{
    this.instance = null;
    this._eventBroker = window.Common.EventBrokerSingleton.instance();
    this.currentlyLoadedMediaDetails = new window.Player.MediaDetails();

    var config = $.extend(
        {
            success: $.proxy(function (mediaElement, domObject) {

                this.instance = mediaElement;
                this._initialise(mediaElement);
                window.Common.Log.Instance().Debug("Media playes has been initialised");

                var mediaDetails = new window.Player.MediaDetails();
                mediaDetails.url = "media/big_buck_bunny.webm";
                mediaDetails.title = "Test track";
                mediaDetails.artist = "Dj Maslo";
                this.load(mediaDetails);

            }, this),

            error: function ()
            {
                window.Common.Log.Instance().Error("MediaElement initialisation failed.");
            }
        }, configuration
    );

    //instance is set when player loading is finished
    this.instance = new MediaElement(container, config);

};

window.Player.MediaPlayer.prototype =
{
    //initialises events for player
    _initialise: function(mediaElement)
    {
        mediaElement.addEventListener(
            window.Player.LibraryEventsNames.play,
            $.proxy(function(){this._eventBroker.fireEventWithData(window.Player.Events.videoPlay, this.currentlyLoadedMediaDetails);}, this),
            false
        );

        mediaElement.addEventListener(
            window.Player.LibraryEventsNames.ended,
            $.proxy(function(){this._eventBroker.fireEventWithData(window.Player.Events.videoStoped, this.currentlyLoadedMediaDetails);}, this),
            false
        );

        mediaElement.addEventListener(
            window.Player.LibraryEventsNames.pause,
            $.proxy(function(){this._eventBroker.fireEventWithData(window.Player.Events.videoPaused, this.currentlyLoadedMediaDetails);}, this),
            false
        );
    },

    load: function(mediaDetails)
    {
        this.currentlyLoadedMediaDetails = mediaDetails;
        this.instance.setSrc(mediaDetails.url);
        this.instance.load();
    },

    play: function()
    {
        this.instance.play();
    }
}
