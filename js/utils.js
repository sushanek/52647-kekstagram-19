'use strict';

(function () {
  window.utils = {
    ESC_KEY: 27,
    ENTER_KEY: 13,
    DEBOUNCE_INTERVAL: 500,

    pressEscEvent: function (evt, action) {
      if (evt.keyCode === this.ESC_KEY) {
        action();
      }
    },

    pressEnterEvent: function (evt, action) {
      if (evt.keyCode === this.ENTER_KEY) {
        action();
      }
    },

    image: document.querySelector('.img-upload__preview').querySelector('img'),

    getRandom: function (end, start) {
      start = start || 0;
      end = end - start;
      return Math.floor(Math.random() * end + start);
    },

    getRandomUnique: function (max, array) {
      var res = this.getRandom(max);
      var isDuble = array.indexOf(res) > -1;
      return isDuble ? this.getRandomUnique(max, array) : array.push(res);
    },

    onError: function (message) {
      window.getPopup('server', message);
    },

    debounce: function (cb) {
      var lastTimeout;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, this.DEBOUNCE_INTERVAL);
    },
  };
})();
