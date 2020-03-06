'use strict';

(function () {
  var pictureInsert = document.querySelector('.pictures');

  // Шаблон для отрисовки изображений
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPicture = function (photo, id) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__img').alt = photo.description;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.dataset.id = id;
    return pictureElement;
  };

  var insertPicture = function (array) {
    var photos = window.photo.slice();
    var fragment = document.createDocumentFragment();
    var count = photos.length;
    array.forEach(function(element, index) {
      fragment.appendChild(renderPicture(element, index))
    });

    // Вставляем фрагмент с фото
    pictureInsert.appendChild(fragment);
  };


  var loadHandle = function (photos) {

    // Сохраняем фото в массив
    window.photo = photos;

    // Первичная загрузка фото по-умолчанию
    insertPicture(photos);

    // Работа с фильтрм
    //applyFilter();

    // Добовляем на контейнер с картинками событие по клику
    pictureInsert.addEventListener('click', function (evt) {
      if (evt.target.className === 'picture__img') {
        var id = evt.target.closest('a').dataset.id;
        evt.preventDefault();
        window.preview(photos, id);
      }
    });

    pictureInsert.addEventListener('keydown', function (evt) {
      var key = evt.keyCode;
      if (evt.target.className === 'picture' && key === window.utils.ENTER_KEY) {
        var id = evt.target.dataset.id;
        evt.preventDefault();
        window.preview(photos, id);
      }
    });
  };
  window.load('GET', loadHandle, window.utils.errorHandle);
})();
