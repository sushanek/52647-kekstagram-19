'use strict';

(function () {

  // Фокус на загрузке
  document.querySelector('.img-upload__label').focus();

  var imgUploadForm = document.querySelector('.img-upload__form');
  var uploadInput = imgUploadForm.querySelector('.img-upload__input');
  var imgUploadPopup = imgUploadForm.querySelector('.img-upload__overlay');
  var uploadClose = imgUploadPopup.querySelector('.img-upload__cancel');

  // обработка формы
  var uploadForm = document.querySelector('.img-upload__form');
  var hashtagsInput = uploadForm.querySelector('.text__hashtags');


  // Функция для обработки нажатия ESC
  var onPopupEscPress = function (evt) {
    var targetClass = evt.target.className;
    var inputClass = 'text__hashtags';
    var textareaClass = 'text__description';

    // Закрываем по ESC окно загрузки фотографии если нет фокуса на поля ввода
    if (targetClass !== inputClass && targetClass !== textareaClass) {
      window.utils.pressEscEvent(evt, onPopupClose);
    }
  };

  // Функция открывает окно и добавляет отслеживания ESC
  var onPopupOpen = function () {
    window.clearFilter();
    document.querySelector('body').classList.add('modal-open');
    imgUploadPopup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    // Обработка события Отпускания мыши
    effectLevelPin.addEventListener('mouseup', getEffectLevelPinPosition);
    imgUploadPopup.querySelector('.text__hashtags').focus();
  };

  // Функция: Закрывает окно и убирает отслеживание нажатяи ESC
  var onPopupClose = function () {
    document.querySelector('body').classList.remove('modal-open');
    imgUploadPopup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    effectLevelPin.removeEventListener('mouseup', getEffectLevelPinPosition);
    imgUploadForm.reset();

    // сбрасывем эффекты
    window.clearFilter();
    // сбрасываем масштаб
    window.resetScale();
  };

  // Отслеживает события по клику
  uploadInput.addEventListener('change', onPopupOpen);
  uploadClose.addEventListener('click', onPopupClose);

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

  // Функция сбрасывает ошибку и отписывается от наблюдения
  var onInputChange = function (evt) {
    evt.target.setCustomValidity('');
    hashtagsInput.removeEventListener('input', onInputChange);
  };

  // Отслеживаем изменения в поле ввода при потере фокуса
  hashtagsInput.addEventListener('change', function (evt) {
    var errorMessage = window.chekedHashtags(evt.target.value);
    // Если функция проверки возвращает строку ошибки
    if (errorMessage) {

      // Добовляем кастомное сообщение из функции
      evt.target.setCustomValidity(errorMessage);

      // Подписываемся на изменения в инпуте
      hashtagsInput.addEventListener('input', onInputChange);

      // Выдаем сообщение обо ошибке
      uploadForm.reportValidity();
    }
  });

  var onLoad = function () {
    onPopupClose();
    window.getPopup('success');
  };

  var onError = function () {
    onPopupClose();
    window.getPopup('error');
  };


  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.load('POST', onLoad, onError, new FormData(imgUploadForm));

  });
})();
