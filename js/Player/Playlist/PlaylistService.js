//namespace
window.Player = window.Player || {};

window.Player.PlaylistService = function(player, playlist)
{
    this.player = player;
    this.playlist = playlist || {};
    this._autoplay = true;
};

window.Player.PlaylistService.prototype =
{
    _loadMedia: function(mediaDetails)
    {
        this.player.load(mediaDetails);
        if(this._autoplay)
        {
            this.player.play();
        }
    },

    //initialises playlist object, or overwrite existing one.
    setUpPlaylist: function(playlist)
    {
        this.playlist = playlist;
    },

    //plays next media item from playlist
    playNext: function()
    {
        var nextItem = this.playlist.next();
        this._loadMedia(nextItem);
    },

    //plays previous media item from playlist
    playPrevious: function()
    {
        var previousItem = this.playlist.previous();
        this._loadMedia(previousItem);
    },

    //plays item with given index from playlist
    playSpecific: function(index)
    {
        var item = this.playlist.getItem(index);
        if(item != null)
        {
            this._loadMedia(item);
        }
    }
}
