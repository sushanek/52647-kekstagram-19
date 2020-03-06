'use strict';

(function () {

  window.preview = function (photo) {


    // Переменные для заполнения
    var preview = document.querySelector('.big-picture');
    var bigPicture = document.querySelector('.big-picture__preview');
    var image = preview.querySelector('.big-picture__img').querySelector('img');
    var imageInfo = preview.querySelector('.social__header');
    var description = imageInfo.querySelector('.social__caption');
    var likesCount = imageInfo.querySelector('.likes-count');
    var commentsCount = preview.querySelector('.comments-count');

    // Куда вставляем комментарии
    var comments = preview.querySelector('.social__comments');

    image.src = photo.url;
    likesCount.innerHTML = photo.likes;
    description.innerHTML = photo.description;
    commentsCount.innerHTML = photo.comments.length;
    // оброботка комментариев
    window.showComments(photo.comments);
    // Отображаем окно
    document.querySelector('body').classList.add('modal-open');
    preview.classList.remove('hidden');

    // Прокручиваем окно до фотографии
    bigPicture.scrollIntoView(true);

    var closeButton = preview.querySelector('.cancel');
    var closePopup = function () {
      document.querySelector('body').classList.remove('modal-open');
      preview.classList.add('hidden');
      // очищаем вставленные комменатрии
      comments.innerHTML = '';
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
