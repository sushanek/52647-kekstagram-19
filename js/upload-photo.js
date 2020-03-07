'use strict';

(function () {
  var input = document.querySelector('.img-upload__input');

  var getFile = function (evt) {

    var file = evt.target.files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      window.utils.image.src = reader.result;
    });
    reader.readAsDataURL(file);
  };

  input.addEventListener('change', getFile);
})();
