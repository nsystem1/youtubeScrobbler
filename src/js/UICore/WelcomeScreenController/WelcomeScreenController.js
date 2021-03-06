window.UI = window.UI || {};

window.UI.WelcomeScreenController = function(config, view, model)
{
    this.config = config;
    this.view = view;
    this.model = model;
};

window.UI.WelcomeScreenController.prototype =
{
    _handleButtonClicked: function()
    {
        this.model.activateApplication();
        this.showMainScreen();
    },

    showMainScreen: function()
    {
        this.view.find(this.config.MainScreenId).show();
        this.view.find(this.config.WelcomeScreenId).hide();
    },

    initialise: function()
    {
        this.view.find(this.config.WelcomeScreenButton).click(this._handleButtonClicked.bind(this));
    }
};