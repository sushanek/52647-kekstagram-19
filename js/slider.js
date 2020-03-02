'use strict';

(function () {
  var sliderHolder = document.querySelector('.effect-level');
  var sliderValue = sliderHolder.querySelector('.effect-level__value');
  var sliderProgressBar = sliderHolder.querySelector('.effect-level__line');
  var sliderLevelPin = sliderProgressBar.querySelector('.effect-level__pin');
  var effectLevelDepth = sliderHolder.querySelector('.effect-level__depth');

  var SLIDER_LEN = sliderProgressBar.offsetWidth;

  var Unit = {
    SYMBOL: '%',
    MAX: '100',
    MIN: 0
  };

  var movePin = function (position, shift) {

    // Переводим в проценты
    position = Math.floor(position / SLIDER_LEN * Unit.MAX);

    // Добавляем текущую позицию если она есть
    position = (shift) ? shift - position : position;

    // Проверяем на выход из диапозона
    if (position >= Unit.MAX) {
      position = Unit.MAX;
    } else if (position <= Unit.MIN) {
      position = Unit.MIN;
    }

    sliderLevelPin.style.left = position + Unit.SYMBOL;
    effectLevelDepth.style.width = position + Unit.SYMBOL;
    sliderValue.value = position;
  };

  // Отрабатываем перемещения пин по клику мыши
  /*
  sliderHolder.addEventListener('click', function (evt) {
    evt.preventDefault();
    var position = evt.offsetX;
    console.log(evt.offsetX);
    movePin(position, 0);
  });
  */

  sliderLevelPin.addEventListener('mousedown', function (evt) {
    var startPosition = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftPosition = startPosition - moveEvt.clientX;
      var currentPosition = +sliderValue.value;
      movePin(shiftPosition, currentPosition);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
