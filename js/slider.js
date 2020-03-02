'use strict';

(function () {
  var sliderHolder = document.querySelector('.effect-level');
  var sliderValue = sliderHolder.querySelector('.effect-level__value');
  var sliderProgressBar = sliderHolder.querySelector('.effect-level__line');
  var sliderLevelPin = sliderProgressBar.querySelector('.effect-level__pin');
  var effectLevelDepth = sliderHolder.querySelector('.effect-level__depth');

  // Ширина слайдера в px
  var SLIDER_LEN = sliderProgressBar.offsetWidth;

  // Значение по умолчанию для слайдера берем из Inputa
  var DEFAULT_VALUE = sliderValue.value;

  var Unit = {
    SYMBOL: '%',
    MAX: '100',
    MIN: 0
  };

  // Инициализируем значения по умолчанию
  sliderLevelPin.style.left = DEFAULT_VALUE + Unit.SYMBOL;
  effectLevelDepth.style.width = DEFAULT_VALUE + Unit.SYMBOL;
  var movePin = function (position) {

    // Переводим в проценты
    var currentPosition = parseFloat(sliderLevelPin.style.left);
    position = currentPosition - (position / SLIDER_LEN * Unit.MAX);

    // Проверяем на выход из диапозона
    if (position >= Unit.MAX) {
      position = Unit.MAX;
    } else if (position <= Unit.MIN) {
      position = Unit.MIN;
    }

    sliderLevelPin.style.left = position + Unit.SYMBOL;
    effectLevelDepth.style.width = position + Unit.SYMBOL;
    sliderValue.value = Math.floor(position);

    return (sliderValue.value);
  };

  /*
  var onClick = function (evt) {
    evt.preventDefault();
    var position = evt.offsetX / SLIDER_LEN * Unit.MAX;
    sliderLevelPin.style.left = position + Unit.SYMBOL;
    effectLevelDepth.style.width = position + Unit.SYMBOL;
    sliderValue.value = position;
  };
  // Отрабатываем перемещения пин по клику мыши
  sliderHolder.addEventListener('click', onClick);
  */

  sliderLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // Записываем начальные координаты
    var startX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      // Вычисляем смещение мыши по оси оX
      var moveX = moveEvt.clientX;
      var shiftPosition = startX - moveX;

      // Функция для обновление слайдера
      renderEffect(shiftPosition)
      movePin(shiftPosition);

      // Меняем стартовые координаты
      startX = moveX;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      // После отпускания мыши удаляем события которые уже не нужны
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // По клику возобновляем события
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


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
        image.style = '';
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
  });
})();
