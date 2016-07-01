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

    CleverList.prototype.parseObject = function() {
      var el, i, j, k, len, ref, results;
      if (Array.isArray(this.content)) {
        ref = this.content;
        results = [];
        for (k = j = 0, len = ref.length; j < len; k = ++j) {
          i = ref[k];
          el = document.createElement("a");
          el.innerText = i[0];
          el.href = i[1];
          results.push(this.content[k] = el.outerHTML);
        }
        return results;
      }
    };

    CleverList.prototype.result = function() {
      if (this.def.type === 'link') {
        this.parseObject();
      }
      return "" + (this.toSentence(this.content)) + this.def.append;
    };

    return CleverList;

  })();

}).call(this);
