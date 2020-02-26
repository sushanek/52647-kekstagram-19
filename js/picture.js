'use strict';

(function () {
  var pictureInsert = document.querySelector('.pictures');

  // Шаблон для отрисовки изображений
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  var renderPicture = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__img').alt = photo.description;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureTemplate.querySelector('.picture__likes').textContent = photo.likes;
    return pictureElement;
  };

  var loadHandle = function (photos) {
    window.photo = photos;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i]));
    }
    pictureInsert.appendChild(fragment);
  };

  var errorHandle = function (message) {
    // Отрисовываем ошибку
    window.getPopup('server', message);
  };

  window.load('GET', loadHandle, errorHandle);
})();
