'use strict';

(function () {
  var scaleField = document.querySelector('.img-upload__scale');
  var scaleSmaller = scaleField.querySelector('.scale__control--smaller');
  var scaleBigger = scaleField.querySelector('.scale__control--bigger');
  var scaleValue = scaleField.querySelector('.scale__control--value');
  var image = window.utils.image;

  var Scale = {
    MIN: 25,
    MAX: 100,
    STEP: 25,
    DEFAULT: 100
  }

  var setScale = function(value) {
    // Устанавливаем значение формы

    scaleValue.value = value + '%';
    // Применяем эффект
    // Приводим значение к виду для использования в стиле
    value = value / 100;

    image.style.transform = 'scale(' + value + ')';
  }

  var changeScale = function(evt) {
    var type = evt.target.className;
    var less = /smaller/;
    var more = /bigger/;
    var value = +scaleValue.value.replace(/%/, '');

    if (less.test(type) && value > Scale.MIN) {
      value -= Scale.STEP;
      setScale(value);
    } else if (more.test(type) && value < Scale.MAX) {
      value += Scale.STEP;
      setScale(value);
    }
  };

  // Инициализация
  scaleValue.value = Scale.DEFAULT;
  setScale(Scale.DEFAULT);

  // Обработка событий по нажатию кнопок
  scaleSmaller.addEventListener ('click', changeScale);
  scaleBigger.addEventListener ('click', changeScale);



})();
