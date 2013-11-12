//using
window.UI = window.UI || {};

window.UI.ReportSenderConstants =
{
    destinationEmail: "onlinescrobbler@gmail.com",
    emailScriptLocation: "php/EmailSender.php",
    errorTag: "[Error]",

    logsContainer: "logger-content"
};

window.UI.ReportSender = function(){};

window.UI.ReportSender.prototype =
{
    _handleError: function(message)
    {
        this.send(
            window.UI.ReportSenderConstants.destinationEmail,
            window.UI.ReportSenderConstants.errorTag + "Automatically generated report",
            message)
    },

    _getBrowser: function()
    {
        return navigator.appCodeName +" "+ navigator.appVersion;
    },

    _getOperatingSystem: function()
    {
        return navigator.platform;
    },

    _getUserAgent: function()
    {
        return navigator.userAgent;
    },

    _getLogs: function()
    {
        var logEntries = $("#"+window.UI.ReportSenderConstants.logsContainer).children();
        var logs = "";

        for(var i=0;i<logEntries.length;i++)
        {
            logs += logEntries[i].innerHTML + "<br>";
        }

        return logs;
    },

    _generateErrorReportContent: function(sender, description)
    {
        return (
            "<h2>Test report from: "+sender+"</h2>" +
                "<h4>Environment details:</h4>" +
                "<ul>" +
                    "<li>OS: "+this._getOperatingSystem()+"</li>"+
                    "<li>Browser: "+this._getBrowser()+"</li>"+
                    "<li>User Agent: "+this._getUserAgent()+"</li>"+
                "</ul>" +
                "<h4>Error description:</h4>"+
                description +
                "<h4>Logs:</h4>"+
                this._getLogs());
    },

    send: function(sender, title, description, callbacks)
    {
        callbacks = callbacks || {
            success: function()
            {
                window.Common.Log.Instance().Debug("Error report has been sent.");
            },
            fail: function()
            {
                window.Common.Log.Instance().Debug("Error occurs while sending error report.");
            }
        };

        title = window.UI.ReportSenderConstants.errorTag+" "+title;
        var content = this._generateErrorReportContent(sender, description);

        $.post(window.UI.ReportSenderConstants.emailScriptLocation,
            {
                recipient: window.UI.ReportSenderConstants.destinationEmail,
                sender: sender,
                subject: title,
                content: content
            })
            .fail(callbacks.fail)
            .done(callbacks.success)
    },

    initialise: function()
    {
        window.Common.EventBrokerSingleton.instance().addListener(window.Common.LoggerEvents.LoggerError, this._handleError, null, this);
    }
};