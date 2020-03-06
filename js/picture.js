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
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;

    // Событие по клику
    pictureElement.addEventListener('click', function () {
      window.preview(photo);
    });

    // Событие по Enter
    pictureElement.addEventListener('keydown', function (evt) {
      window.utils.pressEnterEvent(evt, window.preview);
    });
    return pictureElement;
  };

  // Отрисовка блока с фотографиями
  window.insertFragment = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (element) {
      fragment.appendChild(renderPicture(element));
    });
    pictureInsert.appendChild(fragment);
  };

  var loadHandle = function (photos) {
    window.photos = photos;

    // Первичная загрузка фото по-умолчанию
    window.insertFragment(photos);

    // Работа с фильтрм
    window.useFilter();
  };
  window.load('GET', loadHandle, window.utils.errorHandle);
})();
