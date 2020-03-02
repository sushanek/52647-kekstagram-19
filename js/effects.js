'use strict';

(function () {
  var imgUploadForm = document.querySelector('.img-upload__form');
  var sliderValue = imgUploadForm.querySelector('.effect-level__value');
  var effectsSet = imgUploadForm.querySelector('.img-upload__effects');
  var image = imgUploadForm.querySelector('.img-upload__preview')
    .querySelector('img');

  var renderEffect = function (name, value) {
    var CLASS_PERFIX = 'effects__preview--';
    switch (name) {
      case 'none':
        image.className = '';
        image.style = value;
        // image.removeAttribute(style);
        break;
      case 'chrome':
        image.className = (CLASS_PERFIX + name);
        value = value / 100;
        image.style = 'filter: grayscale(' + value + ')';
        break;
      case 'sepia':
        image.className = (CLASS_PERFIX + name);
        value = value / 100;
        image.style = 'filter: sepia(' + value + ')';
        break;
      case 'marvin':
        image.className = (CLASS_PERFIX + name);
        image.style = 'filter: invert(' + value + '%)';
        break;
      case 'phobos':
        image.className = (CLASS_PERFIX + name);
        value = value * 3 / 100;
        image.style = 'filter: blur(' + value + 'px)';
        break;
      case 'heat':
        image.className = (CLASS_PERFIX + name);
        value = (value < 1) ? value * 3 / 100 + 1 : value * 3 / 100;
        image.style = 'filter: brightness(' + value + ')';
        break;
    }


  };

  effectsSet.addEventListener('change', function (evt) {
    renderEffect(evt.target.value, sliderValue.value);
  })

})();
