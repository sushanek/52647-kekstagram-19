'use strict';

(function () {
  var RANDOMS_PHOTO_SUM = 10;

  var imgFilters = document.querySelector('.img-filters');
  // Фильтр фотографий: по-умолчанию
  var applyFilterDefault = function () {
    var photos = window.photos;
    window.insertFragment(photos);
  };

  // Фильтр фотографий: по-количеству комментариев
  var getFilterDiscussed = function () {
    var photos = window.photos.slice();
    photos.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.insertFragment(photos);
  };

  // Фильтр фотографий: случайные 10 фотографий (без повторов)
  var getFilterRandom = function () {
    var photos = [];
    var indexArrays = [];
    var photoAmount = window.photos.length;

    for (var i = 0; i < RANDOMS_PHOTO_SUM; i++) {
      indexArrays.push(window.utils.getRandomUnique(photoAmount, indexArrays));
      photos.push(window.photos[indexArrays[i]]);
    }
    window.insertFragment(photos);
  };

  // Функция удаляет фото
  var clearPhotos = function () {
    var photos = document.querySelectorAll('.picture');
    photos.forEach(function (element) {
      element.remove();
    });
  };

  // Устанавливаем метку активной кнопки
  var makeActiveButton = function (id) {
    var buttons = imgFilters.querySelectorAll('button');
    var activeClass = 'img-filters__button--active';
    buttons.forEach(function (element) {
      if (element.id === id) {
        element.classList.add(activeClass);
      } else {
        element.classList.remove(activeClass);
      }
    });
  };

  // Вызываем нужную сортировку
  var switchFilters = function (evt) {
    clearPhotos();
    makeActiveButton(evt.target.id);
    switch (evt.target.id) {
      case 'filter-default':
        window.utils.debounce(applyFilterDefault);
        break;
      case 'filter-random':
        window.utils.debounce(getFilterRandom);
        break;
      case 'filter-discussed':
        window.utils.debounce(getFilterDiscussed);
        break;
    }
  };

  // Инициализация фильтра
  window.useFilter = function () {
    imgFilters.classList.remove('img-filters--inactive');

    // Один обработчик на все кнопки
    imgFilters.addEventListener('click', function (evt) {
      var buttonClass = 'img-filters__button';
      var isActive = evt.target.classList.contains(buttonClass);
      if (isActive) {
        switchFilters(evt);
      }
    });
  };

})();
