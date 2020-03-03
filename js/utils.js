'use strict';

(function () {
  window.utils = {
    ESC_KEY: 27,
    ENTER_KEY: 13,
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
    }
  };
})();
