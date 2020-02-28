'use strict';

(function () {

  window.preview = function (photos, id) {
    // Ссылка на объект
    var photo = photos[id];

    // Переменные для заполнения
    var preview = document.querySelector('.big-picture');
    var image = preview.querySelector('.big-picture__img').querySelector('img');
    var imageInfo = preview.querySelector('.social__header');
    var description = imageInfo.querySelector('.social__caption');
    var likesCount = imageInfo.querySelector('.likes-count');
    var commentsCount = preview.querySelector('.comments-count');

    image.src = photo.url;
    likesCount.innerHTML = photo.likes;
    description.innerHTML = photo.description;
    commentsCount.innerHTML = photo.comments.length;

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


    // Работа с комментариями
    // Скрываем счетчик (2 задание)
    preview.querySelector('.social__comment-count').classList.add('hidden');
    preview.querySelector('.comments-loader').classList.add('hidden');

    // Отображаем окно
    document.querySelector('body').classList.add('modal-open');
    preview.classList.remove('hidden');

    var closeButton = preview.querySelector('.cancel');

    var closePopup = function () {
      document.querySelector('body').classList.remove('modal-open');
      preview.classList.add('hidden');
    };

    var onEscClosePopup = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEY) {
        closePopup();
        document.removeEventListener('keydown', onEscClosePopup);
      }

    };

    closeButton.addEventListener('click', closePopup);
    document.addEventListener('keydown', onEscClosePopup);
  };
})();
