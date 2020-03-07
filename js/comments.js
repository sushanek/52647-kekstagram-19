'use strict';

(function () {
  // Шаблон для комментариев
  var commentTemplate = document.querySelector('#social__comment')
    .content
    .querySelector('.social__comment');

  // Окно просмотра
  var preview = document.querySelector('.big-picture');

  // Куда вставляем комментарии
  var comments = preview.querySelector('.social__comments');

  // Счетчик комментарие
  var commentsCountHolder = preview.querySelector('.social__comment-count');

  // Счетчик отображенных комментариев
  var commentsCurrent = preview.querySelector('.comments-currrent');


  // Кнопка показа комментариев
  var buttonMoreComments = preview.querySelector('.comments-loader');

  var MAX_COMMENTS = 5;

  // Создания блока для одного комментария
  var renderComment = function (element) {
    var comment = commentTemplate.cloneNode(true);
    var commentImage = comment.querySelector('.social__picture');
    var commentText = comment.querySelector('.social__text');
    commentImage.src = element.avatar;
    commentImage.alt = element.name;
    comment.tabIndex = '0';
    commentText.innerHTML = element.message;
    return comment;
  };

  // Если комментариев меньше 5 скрываем счетчик и кнопку загрузки
  var checkCommentsLen = function (array) {
    if (array.length <= MAX_COMMENTS) {
      commentsCountHolder.classList.add('hidden');
      buttonMoreComments.classList.add('hidden');
    } else {
      commentsCountHolder.classList.remove('hidden');
      buttonMoreComments.classList.remove('hidden');
    }
  };

  var insertComments = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (element) {
      fragment.appendChild(renderComment(element));
    });
    comments.appendChild(fragment);
  };

  window.showComments = function (array) {
    // Показываем кнопку если вдруг скрыли ее
    buttonMoreComments.classList.remove('hidden');
    var commentsArray = array.slice();
    var commentParts = commentsArray.splice(0, MAX_COMMENTS);
    checkCommentsLen(array);

    // Отрисовываем все или первые 5 комментариев
    insertComments(commentParts);

    // Инициализируем счетчик комментариев
    var comentsCount = MAX_COMMENTS;
    commentsCurrent.innerHTML = comentsCount;

    // Показ комментариев по клику
    var getComments = function () {
      // Отрезаем от массива новую часть и показываем ее
      commentParts = commentsArray.splice(0, MAX_COMMENTS);
      insertComments(commentParts);

      // Обновляем счетчик комментариев
      comentsCount += commentParts.length;
      commentsCurrent.innerHTML = comentsCount;

      // Если массив пустой скрываем кнопку и прокручиваем до последних комментариев
      // Иначе прокручиваем страницу до кнопки загрузки

      if (array.length === comentsCount) {
        buttonMoreComments.classList.add('hidden');
        buttonMoreComments.removeEventListener('click', getComments);
        comments.scrollIntoView(false);
      } else {
        buttonMoreComments.scrollIntoView(false);
      }
    };

    buttonMoreComments.addEventListener('click', getComments);
  };

})();
