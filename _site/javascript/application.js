(function() {
  var i, len, ref, syt;

  ref = document.querySelectorAll('.js-syt');
  for (i = 0, len = ref.length; i < len; i++) {
    syt = ref[i];
    syt = new ShowYourTerms(syt);
  }

}).call(this);
