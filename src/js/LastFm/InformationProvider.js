//namespace
window.LastFm = window.LastFm || {};

//using
window.Common = window.Common || {};

//Provide easy way to get information about artist/track etc. from last.fm portal.
window.LastFm.InformationProvider = function(lastFmDataProvider)
{
    this.dataProvider = lastFmDataProvider;
    Logger.getInstance().info("LastFm Information provider has been created");
};

window.LastFm.InformationProvider.prototype =
{
    getTrackDetails: function(mediaDetails, session, callbacks)
    {
        Logger.getInstance().debug("[LastFm] Track details requested for: "+mediaDetails.artist.name +" - "+mediaDetails.title);
        this.dataProvider.track.getInfo(
            {
                track: mediaDetails.title,
                artist: mediaDetails.artist.name,
                username: session.user,
                autocorrect: 1,
                api_key: window.LastFm.LastFmConstants.API_KEY
            },
            {
            // Example response:
            //        <track>
            //            <id>1019817</id>
            //            <name>Believe</name>
            //            <mbid/>
            //            <url>http://www.last.fm/music/Cher/_/Believe</url>
            //            <duration>240000</duration>
            //            <streamable fulltrack="1">1</streamable>
            //            <listeners>69572</listeners>
            //            <playcount>281445</playcount>
            //            <artist>
            //                <name>Cher</name>
            //                <mbid>bfcc6d75-a6a5-4bc6-8282-47aec8531818</mbid>
            //                <url>http://www.last.fm/music/Cher</url>
            //            </artist>
            //            <album position="1">
            //                <artist>Cher</artist>
            //                <title>Believe</title>
            //                <mbid>61bf0388-b8a9-48f4-81d1-7eb02706dfb0</mbid>
            //                <url>http://www.last.fm/music/Cher/Believe</url>
            //                <image size="small">http://userserve-ak.last.fm/serve/34/8674593.jpg</image>
            //                <image size="medium">http://userserve-ak.last.fm/serve/64/8674593.jpg</image>
            //                <image size="large">http://userserve-ak.last.fm/serve/126/8674593.jpg</image>
            //            </album>
            //            <toptags>
            //                <tag>
            //                    <name>pop</name>
            //                    <url>http://www.last.fm/tag/pop</url>
            //                </tag>
            //            ...
            //            </toptags>
            //            <wiki>
            //                <published>Sun, 27 Jul 2008 15:44:58 +0000</published>
            //                <summary>...</summary>
            //                <content>...</content>
            //            </wiki>
            //        </track>
                success: $.proxy(function(response)
                {
                    var mediaDetails = new window.Player.MediaDetails();

                    mediaDetails.title = response.track.name;
                    mediaDetails.mbid = response.track.mbid;
                    mediaDetails.id = response.track.id;

                    mediaDetails.artist = new window.Player.ArtistDetails(
                        {
                            name: response.track.artist.name,
                            mbid: response.track.artist.mbid,
                            url: response.track.artist.url
                        }
                    );

                    if(response.track.album)
                    {
                        mediaDetails.album = new window.Player.AlbumDetails(
                            {
                                name: response.track.album.title,
                                mbid: response.track.album.mbid,
                                url: response.track.album.url,
                                cover: response.track.album.image[0]["#text"]
                            }
                        );
                    }

                    mediaDetails.loved = response.track.userloved == "1";

                    Logger.getInstance().info("[LastFm] Track details has been obtained: "+mediaDetails.artist.name +" - "+mediaDetails.title);
                    callbacks.done(mediaDetails);
                },
                this),

                error: $.proxy(function(response)
                {
                    Logger.getInstance().warning("[LastFm] Track details obtaining error: " +window.LastFm.Errors[response]);
                    callbacks.fail();
                },
                this)
            }

        );
    },

    getRecommendedArtists: function(params, session, callback){
        this.lastFmApi.user.getRecommendedArtists(params, session, callback);
    },

    getSimilar: function(params, session, callback){
        this.lastFmApi.track.getSimilar(params, callback);
    }

};
