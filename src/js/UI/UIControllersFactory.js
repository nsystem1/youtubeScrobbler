//namespace
window.UI = window.UI || {};

window.UI.UIControllersFactory = function(config)
{
    this.config = config;
};

window.UI.UIControllersFactory.prototype =
{
    createUICore: function()
    {
        return new window.UI.UICore();
    },

    createLoggerViewController: function()
    {
        return new window.UI.LoggerViewController($(this.config.LoggerView), window.UI.LoggerUIConfig);
    },

    createTestReportViewController: function()
    {
        return new window.UI.TestReportsViewController(window.UI.TestReportUIConfig);
    },

    createPlaylistViewController: function(playlistService, playbackControlService, playlistFlowController)
    {
        return new window.UI.PlaylistViewController(
            playlistService,
            playbackControlService,
            playlistFlowController,
            $(this.config.PlaylistView),
            window.UI.PlaylistUIConfig
        );
    },

    createPlaybackDetailsViewController: function(playbackDetailsProvider, playlistDetailsProvider)
    {
        return new window.UI.PlaybackDetailsViewController(
            playbackDetailsProvider,
            playlistDetailsProvider,
            $(this.config.PlaybackProgressView),
            window.UI.PLaybackDetailsViewConfiguration
        );
    },

    createPlaybackControlViewController: function(player, playbackControlService, loveStateModifier, playlistService)
    {
        var volumeControlService = new window.Player.VolumeControlService(player);

        var fullScreenContainer = document.getElementById(window.UI.PlaybackControlConfiguration.FullScreenContainer);
        var sizeControlService = new window.Player.VideoSizeControlService(player, fullScreenContainer, window.Player.MediaPlayerConfig);
        sizeControlService.initialise();

        return new window.UI.PlaybackControlViewController(
            playbackControlService,
            volumeControlService,
            sizeControlService,
            loveStateModifier,
            playlistService,
            $(this.config.PlaybackControlView),
            window.UI.PlaybackControlConfiguration
        );
    },

    createPlaylistControlViewController: function(playlistService, playlistFlowController)
    {
        return new window.UI.PlaylistControlViewController(
            playlistService,
            playlistFlowController,
            $(this.config.PlaylistControlView),
            window.UI.PlaylistControlConfiguration
        );
    },

    createSessionViewController: function(sessionHandler)
    {
        return new window.UI.SessionViewController(sessionHandler, window.UI.SessionUIConfiguration);
    },

    createMediaLoadViewController: function(playlistLoaderService, searchService)
    {
        var searchResultValidator = new window.Services.SearchResultNameValidator(new window.Services.DefaultTrackNamePolicy(), new window.Services.DefaultPlaylistNamePolicy());
        var searchResultParser = new window.Services.SearchResultParser(searchResultValidator);

        return new window.UI.MediaLoadViewController(
            playlistLoaderService,
            searchService,
            searchResultParser,
            window.UI.MediaLoadConfig
        );
    },

    createPlaylistItemEditorViewController: function(playlistProvider, trackDetailsProvider)
    {
        return new window.UI.PlaylistItemDetailsEditorViewController(trackDetailsProvider, playlistProvider, window.UI.PlaylistItemDetailsEditorConfig);
    },

    createPlaylistEditorListViewController: function(playlistProvider)
    {
        return new window.UI.PlaylistEditorListViewController($(this.config.PlaylistEditorListView), playlistProvider, window.UI.PlaylistEditorItemConfiguration);
    },

    createColorSchemeControlViewController: function()
    {
        return new window.UI.ColorSchemeControlViewController(window.UI.ColorSchemeControlConfig);
    },

    createUserNotificationViewController: function()
    {
        return new window.UI.UserNotifierViewController($(this.config.UserNotificationView), window.UI.UserNotifierConfiguration);
    },

    createProgressbarViewController: function()
    {
        return new window.UI.ProgressbarViewController(window.UI.ProgressbarViewControllerConfiguration, $(this.config.ProgressbarView));
    },

    createWelcomeScreenController: function(welcomeScreenService)
    {
        return new window.UI.WelcomeScreenController(window.UI.WelcomeScreenConfiguration, $(this.config.WelcomeScreenView), welcomeScreenService);
    },

    createAppDetailsViewController: function()
    {
        return new window.UI.AppDetailsViewController(window.UI.AppDetailsConfig);
    },

    createMenuViewController: function()
    {
        return new window.UI.MenuController($(this.config.MenuView), window.UI.MenuControllerConfig, new window.UI.PageDisplayCoordinator("#player"));
    },

    createAccountsViewController: function(sessionService)
    {
        return new window.UI.AccountsViewController($(this.config.AccountsView), window.Accounts.AccountsNames, sessionService, window.UI.AccountsViewControllerConfiguration);
    },

    createScrobblingControlViewController: function(scrobbler)
    {
        return new window.UI.ScrobblingControlViewController($('#scrobbler-settings'), scrobbler, window.UI.ScrobblingControlConfiguration);
    }
};