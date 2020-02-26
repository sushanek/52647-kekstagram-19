'use strict';

(function () {
  var preview = document.querySelector('.big-picture');
  var image = preview.querySelector('.big-picture__img').querySelector('img');
  var imageInfo = preview.querySelector('.social__header');
  var description = imageInfo.querySelector('.social__caption');
  var likesCount = imageInfo.querySelector('.likes-count');
  var commentsCount = preview.querySelector('.comments-count');

  var photos = window.createPhotoArrays(1);
  var photo = photos[0];

  document.querySelector('body').classList.add('modal-open');
  preview.classList.remove('hidden');

  image.src = photo.url;
  likesCount.innerHTML = photo.likes;
  description.innerHTML = photo.description;
  commentsCount.innerHTML = photo.comments.length;


  // Работа с комментариями
  // Скрываем счетчик (2 задание)
  preview.querySelector('.social__comment-count').classList.add('hidden');
  preview.querySelector('.comments-loader').classList.add('hidden');


  // Шаблон для комментариев
  var commentTemplate = document.querySelector('#social__comment')
    .content
    .querySelector('.social__comment');

  var renderComment = function (data) {
    var comment = commentTemplate.cloneNode(true);
    var commentImage = comment.querySelector('.social__picture');
    var commentText = comment.querySelector('.social__text');

    commentImage.src = data.avatar;
    commentImage.alt = data.name;
    commentText.innerHTML = data.message;

    return comment;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photo.comments.length; i++) {
    fragment.appendChild(renderComment(photo.comments[i]));
  }

  // Контейнер для комментариев
  var comments = preview.querySelector('.social__comments');
  comments.innerHTML = '';
  comments.appendChild(fragment);


})();
