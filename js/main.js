'use strict';
var SUM_PHOTO_ARRAYS = 25;
var MAX_COMMENTS = 15;
var MIN_LIKES = 15;
var MAX_LIKES = 185;
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = [
  'Ваня',
  'Ибрагим',
  'Рулано',
  'Пикель',
  'Инокентий',
  'Самара'
];

var DESCRIPTIONS = [
  'Это временное решение, этот класс переключает карту из неактивного состояния в активное. В последующих заданиях, в соответствии с ТЗ',
  'На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте',
  'Координаты X и Y, которые вы вставите в разметку, это не координаты левого верхнего угла блока метки',
  'Стоит отдельно объявить функцию генерации случайных данных, функцию создания DOM-элемента на основе JS-объекта, функцию заполнения блока DOM-элементами на основе массива JS-объектов.'
];

var pictureInsert = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var getRandom = function (end, start) {
  start = typeof start !== 'undefined' ? start : 0;
  return Math.floor(Math.random() * end + start);
};

var getComments = function () {
  var sum = getRandom(MAX_COMMENTS);
  var comments = [];
  for (var i = 0; i < sum; i++) {

    comments.push({
      'avatar': 'img/avatar-' + getRandom(6, 1) + '.svg',
      'message': MESSAGES[getRandom(MESSAGES.length)],
      'name': NAMES[getRandom(NAMES.length)]
    });
  }
  return comments;
};

var createPhotoArrays = function (count) {
  var photoArrays = [];
  for (var i = 0; i < count; i++) {
    photoArrays.push({
      'url': 'photos/' + (i + 1) + '.jpg',
      'description': DESCRIPTIONS[getRandom(DESCRIPTIONS.length)],
      'likes': getRandom(MIN_LIKES, MAX_LIKES),
      'comments': getComments()
    });
  }
  return photoArrays;
};

var renderPicture = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__img').alt = photo.description;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureTemplate.querySelector('.picture__likes').textContent = photo.likes;
  return pictureElement;
};

var createFragment = function (photoArrays) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photoArrays.length; i++) {
    fragment.appendChild(renderPicture(photoArrays[i]));
  }
  return fragment;
};

pictureInsert.appendChild(createFragment(createPhotoArrays(SUM_PHOTO_ARRAYS)));
