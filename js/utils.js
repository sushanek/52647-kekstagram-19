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
    }
  };
})();
