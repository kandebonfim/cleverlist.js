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
      this.result = this.result();
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
      for (k in currentTemplate) {
        this.def[k] = currentTemplate[k];
      }
      return this.result();
    };

    CleverList.prototype.objectToLink = function() {
      var el, i, j, k, len, ref, ref1, ref2, results;
      if (!Array.isArray(this.content)) {
        this.objectToArray();
      }
      ref = this.content;
      results = [];
      for (k = j = 0, len = ref.length; j < len; k = ++j) {
        i = ref[k];
        el = document.createElement("a");
        if (this.wasObject) {
          ref1 = [this.resolveobject(this.def.dataTitle, i), this.resolveobject(this.def.dataUrl, i)], el.innerText = ref1[0], el.href = ref1[1];
        } else {
          ref2 = [i[0], i[1]], el.innerText = ref2[0], el.href = ref2[1];
        }
        if (this.def.classList) {
          el.classList = this.def.classList;
        }
        results.push(this.content[k] = el.outerHTML);
      }
      return results;
    };

    CleverList.prototype.objectToArray = function() {
      this.content = this.resolveobject(this.def.dataRoot, this.content);
      return this.wasObject = true;
    };

    CleverList.prototype.resolveobject = function(path, obj, safe) {
      return path.split('.').reduce((function(prev, curr) {
        if (!safe) {
          return prev[curr];
        } else if (prev) {
          return prev[curr];
        } else {
          return void 0;
        }
      }), obj || self);
    };

    CleverList.prototype.result = function() {
      this.wasObject = false;
      if (this.def.type === 'link') {
        this.objectToLink();
      }
      return "" + (this.toSentence(this.content)) + this.def.append;
    };

    return CleverList;

  })();

}).call(this);
