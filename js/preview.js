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
    var commentsCountHolder = preview.querySelector('.social__comment-count');
    var commentsCount = preview.querySelector('.comments-count');
    var buttonMoreComments = preview.querySelector('.comments-loader');
    var comments = preview.querySelector('.social__comments');

    var MAX_COMMENTS = 5;
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

    // Если комментариев меньше 5 скрываем счетчик и кнопку загрузки
    var checkCommentsLen = function (array) {
      var commentParts = array.splice(0, MAX_COMMENTS);
      if (array.length <= MAX_COMMENTS) {
        buttonMoreComments.classList.add('hidden');
        commentsCountHolder.classList.add('hidden');
      }
      return commentParts;
    };

    var insertComments = function (array) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(renderComment(array[i]));
      }
      comments.appendChild(fragment);
    };

    // Инициализация
    var commentsCopy = photo.comments.slice();
    insertComments(divideComments(commentsCopy);

    // Отображаем окно
    document.querySelector('body').classList.add('modal-open');
    preview.classList.remove('hidden');

    // Копируем массив с комментариями


    buttonMoreComments.addEventListener('click', function (evt) {
      insertComments(divideComments(commentsCopy);
    });

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
