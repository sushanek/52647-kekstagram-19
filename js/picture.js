'use strict';

(function () {
  var pictureInsert = document.querySelector('.pictures');

  // Шаблон для отрисовки изображений
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  // Куда вставляем ошибку
  var errorInsert = document.querySelector('main');

  // Обработка ошибки
  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  var renderPicture = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__img').alt = photo.description;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureTemplate.querySelector('.picture__likes').textContent = photo.likes;
    return pictureElement;
  };

  var renderError = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__title').textContent = message;
    errorElement.querySelector('.error__button').textContent = 'Закрыть';
    return errorElement;
  };

  var loadHandle = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i]));
    }
    pictureInsert.appendChild(fragment);
  };

  var errorHandle = function (message) {
    // Отрисовываем ошибку
    errorInsert.appendChild(renderError(message));

    // Отрабатываем закрытие
    var errorWindow = document.querySelector('.error');
    errorWindow.addEventListener('click', function () {
      errorInsert.removeChild(errorWindow);
    });
  };

  window.load('GET', loadHandle, errorHandle);
})();
