'use strict';

(function () {
  var ESC_KEY = 27;

  var uploadInput = document.querySelector('.img-upload__input');
  var imgUploadPopup = document.querySelector('.img-upload__overlay');
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
    uploadInput.value = '';
  };

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
    var effectLevelPinPositionPercent = Math.round(effectLevelPinPosition / effectLevelLineStep); // позиция в процентах
    return effectLevelPinPositionPercent;
  };

  // обработка формы
  var chekedHashtags = function (hashtags) {
    hashtags = hashtags.replace(/\s+/g, ' '); // Убираем повторяющиеся пробелы
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

    // Функция проверки самих хэш-тегов
    var checkTag = function (tag) {
      var VALID_SYMBOL = /^#[A-Za-zА-Яа-я0-9]*$/;
      if (tag.charAt(0) !== '#') {
        errorMessage = 'Хэш-тэг должен начинаться с решетки';
      } else if (tag.length < 2) {
        errorMessage = 'Хэш-тэг не может состоять только из одной решетки';
      } else if (tag.length > 20) {
        errorMessage = 'Хэш-тэг не может быть больше 20 символов';
      } else if (!(VALID_SYMBOL.test(tag))) {
        errorMessage = 'Хэш-тэг должен содержать только буквы и цифры';
      }
    };

    // Проверка хэш-тегов
    if (hashtags.length >= 5) {
      errorMessage = 'Хэш-тегов не может быть больше 5';
    }

    if (hashtags.length > 0) {
      for (var i = 0; i < hashtags.length; i++) {
        checkTag(hashtags[i]);
      }
    }

    if (checkDouble(hashtags)) {
      errorMessage = 'Хэш-теги не должны повторяться';
    }

    return errorMessage;
  };

  var uploadForm = document.querySelector('.img-upload__form');
  var hashtagsInput = uploadForm.querySelector('.text__hashtags');

  var handleInput = function (evt) {
    evt.target.setCustomValidity('');
    hashtagsInput.removeEventListener('input', handleInput);
  };

  hashtagsInput.addEventListener('change', function (evt) {
    var target = evt.target;
    if (chekedHashtags(target.value)) {
      target.setCustomValidity(chekedHashtags(target.value));
      hashtagsInput.addEventListener('input', handleInput);
      uploadForm.reportValidity();
    }
  });
})();
