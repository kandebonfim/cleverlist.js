(function() {
  this.CleverList = (function() {
    function CleverList(content, limit1) {
      this.content = content;
      this.limit = limit1 != null ? limit1 : 3;
      console.log((this.toSentence(this.content, this.limit)) + " liked your foto.");
    }

    CleverList.prototype.toSentence = function(arr, limit) {
      var last;
      if (arr.length > limit + 1 && limit) {
        last = (arr.length - limit) + " others";
        arr = arr.splice(0, limit);
      } else {
        last = arr.pop();
      }
      if (!arr.length) {
        return last;
      } else {
        return (arr.join(', ')) + " and " + last;
      }
    };

    return CleverList;

  })();

}).call(this);
