'use strict';

(function () {

  var imgFilters = document.querySelector('.img-filters');

  // Сортировка по-умолчанию
  var filterDefault = function (array) {
    return array;
  };

  // фото по рандому добиться уникальности
  var filterRandom = function () {
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

  var filterDiscussed = function () {
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
    photos.forEach(function (photo) {
      photo.remove();
    });
  };

  // Устанавливаем метку активной кнопки
  var makeActiveButton = function (id) {
    var buttons = imgFilters.querySelectorAll('button');
    var activeClass = 'img-filters__button--active';
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      if (button.id === id) {
        button.classList.add(activeClass);
      } else {
        button.classList.remove(activeClass);
      }
    }
  };

  // в
  var setFilter = function (targetId, cb) {
    clearPhotos();
    makeActiveButton(targetId);
    window.utils.debounce(cb);
  };


  // Вызываем нужную сортировку
  var switchPhotos = function (evt) {
    var targetId = evt.target.id;
    switch (targetId) {
      case 'filter-default':
        setFilter(targetId, filterDefault);
        break;
      case 'filter-random':
        setFilter(targetId, filterRandom);
        break;
      case 'filter-discussed':
        setFilter(targetId, filterDiscussed);
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
      }
    });
  };
})();
