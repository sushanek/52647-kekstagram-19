'use strict';

(function () {
  var URL = {
    POST: 'https://js.dump.academy/kekstagram',
    GET: 'https://js.dump.academy/kekstagram/data'
  };

  var CODE_OK = 200;
  var TIMEOUT = 3000;
  var ERROR_MESSAGE = 'Произошла ошибка';
  var TIMOUT_MESSAGE = 'Истекло время ожидания: ';
  var TIMEOUT_UNIT = ' секунд';
  var TIMOUT_DIVISIN = 1000;

  window.photo = [];

  window.load = function (method, onLoad, onError, data) {
    var xhr = new this.XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, URL[method]);

    // Проверяем ответ сервера и готовность принять/загрузить
    xhr.addEventListener('load', function () {
      var serverAnswer = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      if (xhr.status === CODE_OK) {
        onLoad(xhr.response);
      } else {
        onError(serverAnswer);
      }
    });

    // Обработка ошибоки если сервер не ответил
    xhr.addEventListener('error', function () {
      onError(ERROR_MESSAGE);
    });

    // Обработка таймаута
    xhr.addEventListener('timeout', function () {
      var time = xhr.timeout / TIMOUT_DIVISIN;
      var answer = TIMOUT_MESSAGE + time + TIMEOUT_UNIT;
      onError(answer);
    });

    // Устанавливаем максимальное время ожидания ответа
    xhr.timeout = TIMEOUT;

    // Отправляем данные на сервер
    xhr.send(data);
  };
})();
