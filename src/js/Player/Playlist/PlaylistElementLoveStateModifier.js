//namespace
window.Playlist = window.Playlist || {};

window.Playlist.PlaylistElementLoveStateModifier = function(innerModifier, sessionProvider, playlistService)
{
    this.innerModifier = innerModifier;
    this.sessionProvider = sessionProvider;
    this.playlistService = playlistService;
};

window.Playlist.PlaylistElementLoveStateModifier.prototype =
{
    toggleTrackLoveState: function(callback)
    {
        var currentItemIndex = this.playlistService.getPlaylist().currentItemIndex;
        var currentItemDetails = this.playlistService.getPlaylist().get(currentItemIndex);

        if(currentItemDetails.loved)
        {
            this._unlove(currentItemDetails, currentItemIndex, callback);
        }
        else
        {
            this._love(currentItemDetails, currentItemIndex, callback);
        }
    },

    _love: function(mediaDetails, index, successCallback)
    {
        var success = function()
        {
            return function onTrackLoved()
            {
                mediaDetails.loved = true;
                successCallback(index, mediaDetails);
            }
        };

        this.innerModifier.love(
            mediaDetails,
            {
                success: success(),
                error: function(){}
            });
    },

    _unlove: function(mediaDetails, index, successCallback)
    {
        var details =
        {
            details: mediaDetails,
            index: index
        };

        var callbacks =
        {
            success: function trackUnloved(index, mediaDetails)
            {
                mediaDetails.loved = false;
                successCallback(index, mediaDetails);
            }
        };

        this.innerModifier.unLove(details, this.sessionProvider.getSession(), callbacks);
    }
};

