'use strict';

(function () {

  // Форма
  var imgUploadForm = document.querySelector('.img-upload__form');

  // Слайдер
  var sliderHolder = imgUploadForm.querySelector('.effect-level');
  var sliderValue = sliderHolder.querySelector('.effect-level__value');
  var sliderProgressBar = sliderHolder.querySelector('.effect-level__line');
  var sliderLevelPin = sliderProgressBar.querySelector('.effect-level__pin');

  // Эффекты
  var effectLevelDepth = sliderHolder.querySelector('.effect-level__depth');
  var effectsField = imgUploadForm.querySelector('.img-upload__effects');
  var effectsInput = effectsField.querySelectorAll('.effects__radio');

  // Изображение
  var image = window.utils.image;

  // Инициализация загрузки
  image.className = '';
  image.style = '';
  sliderHolder.classList.add('hidden');

  // Значение по умолчанию для слайдера берем из Inputa
  var DEFAULT_VALUE = 100;

  var Unit = {
    SYMBOL: '%',
    MAX: 100,
    MIN: 0
  };

  // Инициализируем значения по умолчанию
  sliderLevelPin.style.left = DEFAULT_VALUE + Unit.SYMBOL;
  effectLevelDepth.style.width = DEFAULT_VALUE + Unit.SYMBOL;

  var movePin = function (position, type) {
    // Узнаем длину слайдера
    var SLIDER_LEN = sliderProgressBar.offsetWidth;
    // Переводим в проценты
    var currentPosition = parseFloat(sliderLevelPin.style.left);

    // Если функция вызвана кликом или инициализацией, не учитываем текущее положение пина
    if (type === 'quick') {
      position = position / SLIDER_LEN * Unit.MAX;
    } else {
      position = currentPosition - (position / SLIDER_LEN * Unit.MAX);
    }

    // Проверяем на выход из диапозона
    if (position >= Unit.MAX) {
      position = Unit.MAX;
    } else if (position <= Unit.MIN) {
      position = Unit.MIN;
    }

    sliderLevelPin.style.left = position + Unit.SYMBOL;
    effectLevelDepth.style.width = position + Unit.SYMBOL;
    sliderValue.value = Math.floor(position);

    // применяем эффект к фотографии
    renderEffect(getEffectName(), position);
  };

  // Отрабатываем перемещения пин по клику мыши
  var onClick = function (evt) {
    evt.preventDefault();
    if (evt.target.className !== 'effect-level__pin') {

      movePin(evt.offsetX, 'quick');
    }
  };

  sliderHolder.addEventListener('click', onClick);


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

  // Работа со списком эффектов
  var renderEffect = function (name, value) {
    var CLASS_PERFIX = 'effects__preview--';
    switch (name) {
      case 'chrome':
        image.className = (CLASS_PERFIX + name);
        value = value / 100;
        image.style.filter = 'grayscale(' + value + ')';
        break;
      case 'sepia':
        image.className = (CLASS_PERFIX + name);
        value = value / 100;
        image.style.filter = 'sepia(' + value + ')';
        break;
      case 'marvin':
        image.className = (CLASS_PERFIX + name);
        image.style.filter = 'invert(' + value + '%)';
        break;
      case 'phobos':
        image.className = (CLASS_PERFIX + name);
        value = value * 3 / 100;
        image.style.filter = 'blur(' + value + 'px)';
        break;
      case 'heat':
        image.className = (CLASS_PERFIX + name);
        value = 1 + value * 2 / 100;
        image.style.filter = 'brightness(' + value + ')';
        break;
    }
  };

  // Возвращает название эффекта
  var getEffectName = function () {
    for (var i = 0; i < effectsInput.length; i++) {
      if (effectsInput[i].checked === true) {
        var res = effectsInput[i].value;
      }
    }
    return res;
  };

  // Отслеживание переключения слайдера
  effectsField.addEventListener('change', function (evt) {
    var effectName = evt.target.value;
    var SLIDER_LEN;
    if (effectName === 'none') {
      sliderHolder.classList.add('hidden');
      image.className = '';
      image.style.filter = '';
      sliderValue.value = '';
    } else {
      // Если не скрыт слайдер можно узнать его длинну и выстовить пин на максимум при переключении
      sliderHolder.classList.remove('hidden');
      SLIDER_LEN = sliderProgressBar.offsetWidth;
      movePin(SLIDER_LEN, 'quick');
      renderEffect(effectName, DEFAULT_VALUE);
    }
  });
})();
