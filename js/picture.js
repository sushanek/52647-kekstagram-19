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
  var insertPhoto = function () {
    var photos = window.photo.slice();
    var fragment = document.createDocumentFragment();
    var count = photos.length;

    for (var i = 0; i < count; i++) {
      fragment.appendChild(renderPicture(photos[i], i));
    }
    // Вставляем фрагмент с фото
    pictureInsert.appendChild(fragment);
  };

  // фото по рандому добиться уникальности
  var randomPhoto = function () {
    var photos = window.photo.slice();
    var photoAmount = photos.length;
    var fragment = document.createDocumentFragment();
    var count = 10;
    var randomIndex;
    var randomUnique = [];
    for (var i = 0; i < count; i++) {
      randomUnique.push(window.utils.getRandomUnique(photoAmount, randomUnique));
      randomIndex = randomUnique[i];
      fragment.appendChild(renderPicture(photos[randomIndex], randomIndex));
    }
    // Вставляем фрагмент с фото
    pictureInsert.appendChild(fragment);
  };

  var sortPhoto = function () {
    var fragment = document.createDocumentFragment();
    var photos = window.photo.slice();
    var count = photos.length;
    photos.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    for (var i = 0; i < count; i++) {
      fragment.appendChild(renderPicture(photos[i], i));
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

  // Устанавливаем метку активной кнопки
  var makeActiveButton = function (id) {
    var buttons = imgFilters.querySelectorAll('button');
    var activeClass = 'img-filters__button--active';
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      (button.id === id) ? button.classList.add(activeClass) : button.classList.remove(activeClass);
    }
  };

  // Вызываем нужную сортировку
  var switchPhotos = function (evt) {
    switch (evt.target.id) {
      case 'filter-default':
        clearPhotos();
        makeActiveButton(evt.target.id);
        window.utils.debounce(insertPhoto);
        break;
      case 'filter-random':
        clearPhotos();
        makeActiveButton(evt.target.id);
        window.utils.debounce(randomPhoto);
        break;
      case 'filter-discussed':
        clearPhotos();
        makeActiveButton(evt.target.id);
        window.utils.debounce(sortPhoto);
        break;
    }
  };

  // Инициализация фильтра
  var applyFilter = function () {
    imgFilters.classList.remove('img-filters--inactive');

    // Один обработчик на все кнопки
    imgFilters.addEventListener('click', function (evt) {
      var buttonClass = 'img-filters__button';
      var isActive = evt.target.classList.contains(buttonClass);
      if (isActive) {
        switchPhotos(evt);
      };
    });
  };

  var loadHandle = function (photos) {
    window.photo = photos;

    // Первичная загрузка фото по-умолчанию
    insertPhoto(photos);

    //Работа с фильтрм
    applyFilter();

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
