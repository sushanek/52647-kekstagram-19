'use strict';

(function () {
  var ESC_KEY = 27;

  var uploadInput = document.querySelector('.img-upload__input');
  var imgUploadPopup = document.querySelector('.img-upload__overlay');
  var uploadClose = imgUploadPopup.querySelector('.img-upload__cancel');

  // Функция для обработки нажатия ESC
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      closePopup();
    }
  };

  // Функция открывает окно и добавляет отслеживания ESC
  var openPopup = function () {
    imgUploadPopup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Функция: Закрывает окно и убирает отслеживание нажатяи ESC
  var closePopup = function () {
    imgUploadPopup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    uploadInput.value = '';
  };

  // Отслеживает события по клику
  uploadInput.addEventListener('change', openPopup);
  uploadClose.addEventListener('click', closePopup);

  // Насыщенность фильтра для изображения
  var effectLevelPin = imgUploadPopup.querySelector('.effect-level__pin');

  effectLevelPin.addEventListener('mouseup', function (evt) {
    console.log(evt);
  });


})();
