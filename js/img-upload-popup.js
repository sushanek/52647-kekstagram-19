'use strict';

(function () {
  var ESC_KEY = 27;
  var VALID_HASHTAG_SYMBOL = /#{1}[A-Za-zА-Яа-я0-9]*$/;

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
    hashtags = hashtags.split(' ');
    if ((hashtags.length < 6) && (hashtags.length > 0)) {
      for (var i = 0; i < hashtags.length; i++) {
        var test = hashtags[i];
        if (test.charAt(0) !== '#') {
          return ('Хэш-тэг должен начинаться с решетки');
        } else if (test.lenght < 2) {
          return ('Хэш-тэг не может состоять только из одной решетки');
        } else if (test.lenght > 20) {
          return ('Хэш-тэг не может быть больше 20 символов');
        } else if (!(VALID_HASHTAG_SYMBOL.test(test))) {
          return ('Хэш-тэг должен содержать только буквы и цифры');
        }
      }
    } else {
      return ('Хэш тегов не может быть больше 5' + hashtags.length);
    }
    return 0;
  };

  var uploadForm = document.querySelector('.img-upload__form');

  uploadForm.addEventListener('submit', function (evt) {
    var hashtags = uploadForm.querySelector('.text__hashtags').value; // получаем значения поля с хэштегами
    if (chekedHashtags(hashtags)) {
      evt.preventDefault();
      console.log(chekedHashtags(hashtags));
      uploadForm.querySelector('.text__hashtags').setCustomValidity(chekedHashtags(hashtags));
    }
  });


})();
