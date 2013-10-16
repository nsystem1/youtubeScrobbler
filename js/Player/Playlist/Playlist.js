//namespace
window.Player = window.Player || {};


window.Player.Playlist = function()
{
    this.mediaList = [];
    this.indexOfCurrentlySelectedMediaElement = 0;
};

window.Player.Playlist.prototype =
{
    add: function(mediaDetails)
    {
         this.mediaList.push(mediaDetails);
    },

    remove: function(index)
    {
          this.mediaList.splice(index, 1);
    },

    first: function()
    {
        return this.mediaList[0];
    },

    last: function()
    {
        return this.mediaList[this.lenght() -1];
    },

    getItem: function(index)
    {
        if(index >= 0 && index < this.length())
        {
            return this.mediaList[index];
        }
        else
        {
            return null;
        }
    },

    next: function()
    {
        if(this.indexOfCurrentlySelectedMediaElement + 1 < this.length() - 1)
        {
              this.indexOfCurrentlySelectedMediaElement++;
        }
        else
        {
            //jump to last one
            this.indexOfCurrentlySelectedMediaElement = this.length() - 1;
        }

        return this.mediaList[this.indexOfCurrentlySelectedMediaElement];
    },

    previous: function()
    {
        if(this.indexOfCurrentlySelectedMediaElement - 1 < 0)
        {
            this.indexOfCurrentlySelectedMediaElement = this.length() -1;
        }
        else
        {
            this.indexOfCurrentlySelectedMediaElement--;
        }

        return this.mediaList[this.indexOfCurrentlySelectedMediaElement];
    },

    length: function()
    {
          return this.mediaList.length;
    }
}