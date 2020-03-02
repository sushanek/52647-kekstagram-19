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
})();
