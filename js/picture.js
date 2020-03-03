'use strict';

(function () {
  var pictureInsert = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var filterButtons = document.querySelectorAll('.img-filters__button');

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

  // фото по умолчанию
  var insertPhoto = function (photos) {

    var fragment = document.createDocumentFragment();
    var count = photos.length;

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i], i));
    }
    // Вставляем фрагмент с фото
    pictureInsert.appendChild(fragment);
  };

  // фото по рандому добиться уникальности
  var randomPhoto = function (photos) {

    var photosCopy = photos;
    var fragment = document.createDocumentFragment();
    var count = 10;
    var randomIndex;

    for (var i = 0; i < count; i++) {
      randomIndex = window.utils.getRandom(photosCopy.length);
      fragment.appendChild(renderPicture(photosCopy[randomIndex], randomIndex));
    }
    // Вставляем фрагмент с фото
    pictureInsert.appendChild(fragment);
  };


  // Функция удаляет фото
  var clearPhotos = function () {
    var photos = document.querySelectorAll('.picture');
    for (var i = 0; i < photos.length; i++) {
      photos[i].remove();
    }
  };

  var applyFilter = function () {
    imgFilters.classList.remove('img-filters--inactive');
    for (var i = 0; i < filterButtons.length; i++) {
      (function () {
        filterButtons[i].addEventListener('click', function (evt) {
          var activeClass = 'img-filters__button--active';
          var isActive = evt.target.classList.contains(activeClass);
          switch (evt.target.id) {
            case 'filter-default':
              console.log('По-умолчанию');
              clearPhotos();
              insertPhoto(window.photo);
              break;
            case 'filter-random':
              console.log('---Рандом---');
              clearPhotos();
              randomPhoto(window.photo);
              break;
            case 'filter-discussed':
              console.log('Обсуждаемые');
              break;
          }
          //evt.target.className.add(activeClass);
        });
      })();
    }


  };

  var loadHandle = function (photos) {
    window.photo = photos;

    // Первичная загрузка фото по-умолчанию
    insertPhoto(photos);

    //Работа с фильтрм
    applyFilter();

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
