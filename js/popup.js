'use strict';
(function () {

  // Место дом куда вставляем окно
  var place = document.querySelector('main');

  // Возможные типы окон
  // Шаблон с ошибкой
  var error = document.querySelector('#error')
      .content
      .querySelector('.error');

  // Шаблон с успешной загрузкой
  var success = document.querySelector('#success')
      .content
      .querySelector('.success');

  // Шаблон с инфосообщение
  var info = document.querySelector('#messages')
    .content
    .querySelector('.img-upload__message--loading');

  // Функция для отображения статусных окон
  window.getPopup = function (type, message) {
    var popup;
    switch (type) {
      case 'server':
        popup = error.cloneNode(true);
        popup.querySelector('.error__title').textContent = message;
        popup.querySelector('.error__button').textContent = 'Закрыть';
        break;

      case 'error':
        popup = error.cloneNode(true);
        break;

      case 'success':
        popup = success.cloneNode(true);
        break;

      case 'info':
        popup = info.cloneNode(true);
        break;
    }

    // Добавляем окно
    place.appendChild(popup);

    // Механизм закрытия окна
    var closePopup = function () {
      document.querySelector('body').classList.remove('modal-open');
      place.removeChild(popup);
      document.removeEventListener('click', onPopupClick);
      document.removeEventListener('keydown', onPopupEscPress);
    };

    var onPopupEscPress = function (evt) {
      window.utils.pressEscEvent(evt, closePopup);
    };

    var onPopupClick = function () {
      closePopup();
    };

    document.addEventListener('click', onPopupClick);
    document.addEventListener('keydown', onPopupEscPress);
  };
})();
