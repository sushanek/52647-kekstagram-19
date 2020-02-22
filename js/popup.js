'use strict';
(function () {
  var ESC_KEY = 27;

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
      place.removeChild(popup);
      document.removeEventListener('click', onPopupClick);
      document.removeEventListener('keydown', onPopupEscPress);
    };

    var onPopupEscPress = function (evt) {
      if (evt.keyCode === ESC_KEY) {
        closePopup();
      }
    };

    var onPopupClick = function () {
      closePopup();

      // В последствии тут будет
      /* if (evt.target.className === 'error__button') {
      } else {
        closePopup();
      */
    };

    document.addEventListener('click', onPopupClick);
    document.addEventListener('keydown', onPopupEscPress);
  };
})();
