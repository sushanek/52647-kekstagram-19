'use strict';

(function () {
  var URL = {
    POST: 'https://js.dump.academy/kekstagram',
    GET: 'https://js.dump.academy/kekstagram/data'
  };

  var CODE_OK = 200;
  var TIMEOUT = 100;

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
      onError('Произошла ошибка');
    });

    // Обработка таймаута
    xhr.addEventListener('timeout', function () {
      var time = xhr.timeout / 1000;
      var answer = 'Истекло время ожидания: ' + time + ' секунд';
      onError(answer);
    });

    // Устанавливаем максимальное время ожидания ответа
    xhr.timeout = TIMEOUT;

    // Отправляем данные на сервер
    xhr.send(data);
  };
})();
