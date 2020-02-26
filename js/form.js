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
    document.querySelector('body').classList.add('modal-open');
    imgUploadPopup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    // Обработка события Отпускания мыши
    effectLevelPin.addEventListener('mouseup', getEffectLevelPinPosition);
  };

  // Функция: Закрывает окно и убирает отслеживание нажатяи ESC
  var closePopup = function () {
    document.querySelector('body').classList.remove('modal-open');
    imgUploadPopup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    effectLevelPin.removeEventListener('mouseup', getEffectLevelPinPosition);
    imgUploadForm.reset();
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
    return Math.round(effectLevelPinPosition / effectLevelLineStep); // возвращаем позицию в процентах
  };

  // обработка формы
  var uploadForm = document.querySelector('.img-upload__form');
  var hashtagsInput = uploadForm.querySelector('.text__hashtags');

  // Функция сбрасывает ошибку и отписывается от наблюдения
  var handleInput = function (evt) {
    evt.target.setCustomValidity('');
    hashtagsInput.removeEventListener('input', handleInput);
  };

  // Отслеживаем изменения в поле ввода при потере фокуса
  hashtagsInput.addEventListener('change', function (evt) {
    var errorMessage = window.chekedHashtags(evt.target.value);
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

  var loadHandler = function () {
    closePopup();
    window.getPopup('success');
  };

  var errorHandler = function () {
    closePopup();
    window.getPopup('error');
  };


  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.load('POST', loadHandler, errorHandler, new FormData(imgUploadForm));

  });
})();
