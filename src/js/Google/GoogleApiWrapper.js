//namespace
window.Google = window.Google || {};

initialiseGoogleApi = function()
{
    //TODO handle loading errors
    gapi.client.setApiKey(window.Google.GoogleApiConstants.YOUTUBE.API.KEY);
    gapi.client.load(window.Google.GoogleApiConstants.YOUTUBE.API.NAME, window.Google.GoogleApiConstants.YOUTUBE.API.VERSION,
        function()
        {
            this.initialise();
        }.bind(window.Google.GoogleApiWrapper.prototype));
    gapi.client.load('oauth2', 'v2', function(){
        Logger.getInstance().info("[Google] OAuth2 loaded.");
    });
};

window.Google.GoogleApiWrapper = function()
{
    this.USER_ERROR_MSG = "There is a problem with loading Google services. Please reload page.";
    this.LOG_ERROR_MSG = "[Google API] Youtube service is not loaded yet.";
};

window.Google.GoogleApiWrapper.prototype =
{
    _handleServiceError: function()
    {
        UserNotifier.getInstance().error(this.USER_ERROR_MSG);
        Logger.getInstance().warning(this.LOG_ERROR_MSG);
    },

    _getPlaylistDetails: function(options, callback)
    {

    },

    isLoaded: false,
    initialise: function()
    {
        this.isLoaded = true;
        Logger.getInstance().debug("[Google API] Youtube service loaded.");
        //window.setTimeout(this.authorizeUser.bind(this),1);
    },

    _wrapAuthResponse: function(response)
    {

    },

    _obtainSessionToken: function(requestOptions, callback)
    {
        if(this.isLoaded)
        {
            var options = $.extend(
                {
                    client_id: window.Google.GoogleApiConstants.YOUTUBE.API.AUTH.CLIENT_ID,
                    response_type: "token",
                    scope: [window.Google.GoogleApiConstants.YOUTUBE.API.AUTH.SCOPE, "https://www.googleapis.com/auth/userinfo.profile"]
                },
                requestOptions
            );

            gapi.auth.authorize(options, callback);
        }
    },

    authorize: function(callback)
    {
        //show sign on dialog
        this._obtainSessionToken({immediate:false}, callback);
    },

    refreshSessionToken: function(callback)
    {
        //without sign on dialog
        this._obtainSessionToken({immediate:true}, callback);
    },

    getUserInfo: function(callback)
    {
        if(this.isLoaded)
        {
            var request = gapi.client.oauth2.userinfo.get();
            request.execute(callback);
        }
    },

    getUserPlaylists: function(callback)
    {
        if(this.isLoaded)
        {
            var options =
                {
                    part: 'snippet',
                    fields: 'items,nextPageToken,pageInfo',
                    mine: true,
                    maxResults: window.Google.GoogleApiConstants.MAX_NUMBER_OF_ITEMS_PER_REQUEST
                };

            var request = gapi.client.youtube.playlists.list(options);
            request.execute(callback);
        }
        else
        {
            this._handleServiceError();
        }
    },

    getPlaylistDetails: function(requestOptions, callback)
    {
        if(this.isLoaded)
        {
            var options = $.extend(
                {
                    part: 'contentDetails',
                    fields: 'items/contentDetails,nextPageToken,pageInfo',
                    maxResults: window.Google.GoogleApiConstants.MAX_NUMBER_OF_ITEMS_PER_REQUEST
                },
                requestOptions
            );

            var request = gapi.client.youtube.playlistItems.list(options);
            request.execute(callback);
        }
        else
        {
            this._handleServiceError();
        }
    },

    getVideoDetails: function(requestOptions, callback)
    {
        if(this.isLoaded)
        {
            var options = $.extend(
                {
                    part: 'contentDetails, snippet',
                    fields: 'items(contentDetails,id,snippet)'
                },
                requestOptions
            );

            var request = gapi.client.youtube.videos.list(options);
            request.execute(callback);
        }
        else
        {
            this._handleServiceError();
        }
    },

    getSearchResults: function(requestOptions, callback)
    {
        if(this.isLoaded)
        {
            var options = $.extend(
                {
                    //TODO add country code here
                    part: "snippet",
                    fields: "items(id,snippet),nextPageToken,pageInfo",
                    maxResults: window.Google.GoogleApiConstants.MAX_NUMBER_OF_SEARCH_RESULTS_PER_REQUEST
                },
                requestOptions);
            var request = gapi.client.youtube.search.list(options);
            request.execute(callback);
        }
        else
        {
            this._handleServiceError();
        }
    }
};