(function() {
  this.CleverList = (function() {
    function CleverList(content1) {
      this.content = content1;
      this.tpl = {};
      this.def = {
        append: '.',
        last: ' and ',
        others: ' others',
        comma: ', ',
        limit: 3,
        type: 'string'
      };
    }

    CleverList.prototype.toSentence = function(arr) {
      var last;
      if (arr.length > this.def.limit + 1) {
        last = "" + (arr.length - this.def.limit) + this.def.others;
        arr = arr.splice(0, this.def.limit);
      } else {
        last = arr.pop();
      }
      if (!arr.length) {
        return last;
      } else {
        return "" + (arr.join(this.def.comma)) + this.def.last + last;
      }
    };

    CleverList.prototype.result = function() {
      return "" + (this.toSentence(this.content)) + this.def.append;
    };

    CleverList.prototype.addTemplate = function(template, settings) {
      return this.tpl[template] = settings;
    };

    CleverList.prototype.withTemplate = function(template, content) {
      var currentTemplate, k;
      this.content = content;
      if (this.tpl[template]) {
        currentTemplate = this.tpl[template];
      } else {
        console.error('Template not found.');
      }
      for (k in this.def) {
        if (currentTemplate[k]) {
          this.def[k] = currentTemplate[k];
        }
      }
      return this.result();
    };

    return CleverList;

  })();

}).call(this);
