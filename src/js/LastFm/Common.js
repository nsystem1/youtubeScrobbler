window.LastFm = window.LastFm || {};

//TODO move to server side.
window.LastFm.LastFmConstants =
{
    API_KEY: 'c6374de0b62e5b4a8776bf85a6b56801',
    API_SECRET: '2584ffa53e3a1cbabded6a43fd9dc7c5'
};

LastFmApiCommon =
{
    CACHE: new LastFMCache(),
    DATA_PROVIDER: new LastFM({
        apiKey: window.LastFm.LastFmConstants.API_KEY,
        apiSecret: window.LastFm.LastFmConstants.API_SECRET,
        cache: this.CACHE
    })
};

window.LastFm.Errors =
{
    2 : "Invalid service - This service does not exist",
    3 : "Invalid Method - No method with that name in this package",
    4 : "Authentication Failed - You do not have permissions to access the service",
    5 : "Invalid format - This service doesn't exist in that format",
    6 : "Invalid parameters - Your request is missing a required parameter",
    7 : "Invalid resource specified",
    8 : "Operation failed - Something else went wrong",
    9 : "Invalid session key - Please re-authenticate",
    10 : "Invalid API key - You must be granted a valid key by last.fm",
    11 : "Service Offline - This service is temporarily offline. Try again later.",
    13 : "Invalid method signature supplied",
    16 : "There was a temporary error processing your request. Please try again",
    26 : "Suspended API key - Access for your account has been suspended, please contact Last.fm",
    29 : "Rate limit exceeded - Your IP has made too many requests in a short period"
};