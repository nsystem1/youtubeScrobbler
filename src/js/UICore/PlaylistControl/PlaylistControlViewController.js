//namespace
window.UI = window.UI || {};

window.UI.PlaylistControlViewController = function(playlistService, playlistController, loveStateModifier, view, config)
{
    this.playlistController = playlistController;
    this.playlistService = playlistService;
    this.loveStateModifier = loveStateModifier;
    this.config = config;
    this.view = $("#"+view);
};

window.UI.PlaylistControlViewController.prototype =
{
    //changes love state for currently played track
    _changeLoveStateForCurrentTrack: function(that)
    {
        return function changeLoveStateForCurrentTrack()
        {
            that.loveStateModifier.toggleTrackLoveState(that._handleLoveStateChanged(that));
        };
    },

    //handles successful change of love state
    _handleLoveStateChanged: function(that)
    {
        return function _handleLoveStateChanged(index, mediaDetails)
        {
            that._setLoveStateFoCurrentTrack(mediaDetails.loved);
            that.playlistService.updateItem(index, mediaDetails);
        };
    },

    //handles change of currently played track
    _handleMediaChanged: function(mediaDetails)
    {
        this._setLoveStateFoCurrentTrack(mediaDetails.loved);
    },

    //changes visual indication of love state for current track
    _setLoveStateFoCurrentTrack: function(isLoved)
    {
        if(isLoved)
        {
            $(this.config.LoveButton).addClass(this.config.SelectedButtonClass);
        }
        else
        {
            $(this.config.LoveButton).removeClass(this.config.SelectedButtonClass);
        }
    },

    _clearPlaylist: function(model)
    {
        return function()
        {
            model.clearPlaylist();
        };
    },

    _savePlaylist: function(model)
    {
        return function()
        {
            model.savePlaylist();
        };
    },

    _changeLoopModeState: function(that)
    {
        return function()
        {
            that.playlistController.toggleLoopMode(that._handleLoopModeChanged(that));
        };
    },

    _handleLoopModeChanged: function(that)
    {
        return function handleLoopModeChanged(isLoopModeOn)
        {
            if(isLoopModeOn)
            {
                that.view.find(that.config.LoopButton).addClass(that.config.SelectedButtonClass);
            }
            else
            {
                that.view.find(that.config.LoopButton).removeClass(that.config.SelectedButtonClass);
            }
        }
    },

    _shufflePlaylist: function(model)
    {
        return function()
        {
            model.shuffle();
        };
    },

    initialise: function()
    {
        //bind to Ui events
        this.view.find(this.config.LoveButton).click(this._changeLoveStateForCurrentTrack(this));
        this.view.find(this.config.ClearButton).click(this._clearPlaylist(this.playlistService));
        this.view.find(this.config.SaveButton).click(this._savePlaylist(this.playlistService));
        this.view.find(this.config.ShuffleButton).click(this._shufflePlaylist(this.playlistController));
        this.view.find(this.config.LoopButton).click(this._changeLoopModeState(this));

        EventBroker.getInstance().addListener(window.Player.Events.MediaChanged, this._handleMediaChanged, null, this);
    }
};
