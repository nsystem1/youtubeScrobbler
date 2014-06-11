//namespace
window.UI = window.UI || {};

window.UI.ProgressbarViewController = function(config, view)
{
    //substitute for dictionary
    this.ids = new Object();
    this.config = config;
    this.view = view;
};

window.UI.ProgressbarViewController.prototype =
{
    _createNewProgressbar: function(title)
    {
        return new window.UI.ProgressbarControl(this.config.ProgressbarClass, title);
    },

    _handleProgressbarRegistration: function(args)
    {
        var progressbar = this._createNewProgressbar(title);
        this.ids[args.id] = progressbar;
        view.append(progressbar);
    },

    _handleProgressbarStatusUpdate: function(args)
    {
        var progressbar = this.ids[args.id];
        progressbar.update(args.value);
        if(args.value = 100)
        {
            //hide and remove progressbar
            progressbar.hide();
        }
    },

    initialise: function()
    {
        EventBroker.getInstance().addListener(window.UI.ProgressbarServiceEvents.RegisterNewProgressbar, this._handleProgressbarRegistration);
        EventBroker.getInstance().addListener(window.UI.ProgressbarServiceEvents.UpdateProgressbarStatus, this._handleProgressbarStatusUpdate);
    }
};