'use strict';

(function () {
  var SUM_PHOTO_ARRAYS = 25;

  var pictureInsert = document.querySelector('.pictures');
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

  var createFragment = function (photoArrays) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photoArrays.length; i++) {
      fragment.appendChild(renderPicture(photoArrays[i]));
    }
    return fragment;
  };

  pictureInsert.appendChild(createFragment(window.createPhotoArrays(SUM_PHOTO_ARRAYS)));
})();
