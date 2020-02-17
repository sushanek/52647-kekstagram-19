'use strict';

(function () {
  var ESC_KEY = 27;

  var imgUploadForm = document.querySelector('.img-upload__form');
  var uploadInput = imgUploadForm.querySelector('.img-upload__input');
  var imgUploadPopup = imgUploadForm.querySelector('.img-upload__overlay');
  var uploadClose = imgUploadPopup.querySelector('.img-upload__cancel');

  // Функция для обработки нажатия ESC
  var onPopupEscPress = function (evt) {
    if ((evt.keyCode === ESC_KEY) && (evt.target.tagName !== 'INPUT') && (evt.target.tagName !== 'TEXTAREA')) {
      closePopup();
    }
  };

  // Функция открывает окно и добавляет отслеживания ESC
  var openPopup = function () {
    imgUploadPopup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    // Обработка события Отпускания мыши
    effectLevelPin.addEventListener('mouseup', getEffectLevelPinPosition);
  };

  // Функция: Закрывает окно и убирает отслеживание нажатяи ESC
  var closePopup = function () {
    imgUploadPopup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    effectLevelPin.removeEventListener('mouseup', getEffectLevelPinPosition);
    imgUploadForm.reset();
    uploadInput.value = '';
  };

  // очищаем форму после отправки.
  imgUploadForm.addEventListener('submit', function () {
    imgUploadForm.reset();
  });

  // Отслеживает события по клику
  uploadInput.addEventListener('change', openPopup);
  uploadClose.addEventListener('click', closePopup);

  // Насыщенность фильтра для изображения
  // Прогресс-бар
  var effectLevelLine = imgUploadPopup.querySelector('.effect-level__line');

  // Ползунок прогресс-бара
  var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');

  // Функция достает значение ползунка
  var getEffectLevelPinPosition = function (evt) {
    var effectLevelLineWidth = effectLevelLine.offsetWidth; // Длина програсс-бара
    var effectLevelPinPosition = evt.target.offsetLeft; // положение ползунка
    var effectLevelLineStep = effectLevelLineWidth / 100; // Шаг-пропорция в процентах
    return Math.round(effectLevelPinPosition / effectLevelLineStep); // возвращаем позицию в процентах
  };

  // обработка формы
  var chekedHashtags = function (hashtags) {
    var VALID_SYMBOL = /^#[A-Za-zА-Яа-я0-9]*$/;
    var MIN_SYMBOL = 2;
    var MAX_SYMBOL = 20;
    var HASHTAGS_AMOUNT = 5;
    var MESSAGE_FIRST_SYMBOL = 'Хэштэг должен начинаться с #';
    var MESSAGE_MIN_SYMBOL = 'Хэштэг не может быть меньше ' + MIN_SYMBOL + ' символов';
    var MESSAGE_MAX_SYMBOL = 'Хэштэг не может быть больше ' + MAX_SYMBOL + ' символов';
    var MESSAGE_VALID_SYMBOL = 'Хэштэг должен содержать только буквы и цифры';
    var MESSAGE_HASHTAGS_AMOUNT = 'Хэштегов не может быть больше ' + HASHTAGS_AMOUNT;
    var MESSAGE_HASHTAGS_REPEAT = 'Хэштеги не должны повторяться';

    // Убираем повторяющиеся пробелы
    hashtags = hashtags.replace(/\s+/g, ' ');

    // Обрезаем пробелы по краям строки
    // переводим все буквы в нижний регистр
    // разбиваем строку на массив
    hashtags = hashtags.trim().toLowerCase().split(' ');
    var errorMessage;

    // Функция проверка на наличие дублей в массиве
    var checkDouble = function (array) {
      for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
          if (array[i] === array[j] && i !== j) {
            return true;
          }
        }
      }
      return false;
    };

    // Функция проверки самих хэштегов
    var checkTag = function (tag) {
      if (tag.charAt(0) !== '#') {
        errorMessage = MESSAGE_FIRST_SYMBOL;
      } else if (tag.length < MIN_SYMBOL) {
        errorMessage = MESSAGE_MIN_SYMBOL;
      } else if (tag.length > MAX_SYMBOL) {
        errorMessage = MESSAGE_MAX_SYMBOL;
      } else if (!(VALID_SYMBOL.test(tag))) {
        errorMessage = MESSAGE_VALID_SYMBOL;
      }
    };

    // Проверка хэштегов
    if (hashtags.length > HASHTAGS_AMOUNT) {
      errorMessage = MESSAGE_HASHTAGS_AMOUNT;
    } else if (checkDouble(hashtags)) {
      errorMessage = MESSAGE_HASHTAGS_REPEAT;
    } else if (hashtags.length > 0) {
      for (var i = 0; i < hashtags.length; i++) {
        checkTag(hashtags[i]);
      }
    }
    return errorMessage;
  };

  var uploadForm = document.querySelector('.img-upload__form');
  var hashtagsInput = uploadForm.querySelector('.text__hashtags');

  // Функция сбрасывает ошибку и отписывается от наблюдения
  var handleInput = function (evt) {
    evt.target.setCustomValidity('');
    hashtagsInput.removeEventListener('input', handleInput);
  };

  // Отслеживаем изменения в поле ввода при потере фокуса
  hashtagsInput.addEventListener('change', function (evt) {
    var errorMessage = chekedHashtags(evt.target.value);
    // Если функция проверки возвращает строку ошибки
    if (errorMessage) {

      // Добовляем кастомное сообщение из функции
      evt.target.setCustomValidity(errorMessage);

      // Подписываемся на изменения в инпуте
      hashtagsInput.addEventListener('input', handleInput);

      // Выдаем сообщение обо ошибке
      uploadForm.reportValidity();
    }
  });
})();
