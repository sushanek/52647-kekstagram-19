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

  var loadHandle = function (photos) {
    window.photo = photos;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i], i));
    }
    // Вставляем фрагмент с фото
    pictureInsert.appendChild(fragment);

    // Добовляем на контейнер событие

    // СОбытие по клику
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


  var errorHandle = function (message) {
    // Отрисовываем ошибку
    window.getPopup('server', message);
  };

  window.load('GET', loadHandle, errorHandle);
})();
