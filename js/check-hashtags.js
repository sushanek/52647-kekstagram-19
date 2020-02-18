'use strict';

(function () {
  window.chekedHashtags = function (hashtags) {
    var VALID_SYMBOL = /^#[A-Za-zА-Яа-я0-9]*$/;
    var MIN_SYMBOL = 2;
    var MAX_SYMBOL = 20;
    var HASHTAGS_AMOUNT = 5;
    var MESSAGE_FIRST_SYMBOL = 'Хэштэг должен начинаться с #';
    var MESSAGE_MIN_SYMBOL = 'Хэштэг не может быть меньше ' + MIN_SYMBOL + ' символов';
    var MESSAGE_MAX_SYMBOL = 'Хэштэг не может быть больше ' + MAX_SYMBOL + ' символов';
    var MESSAGE_VALID_SYMBOL = 'Хэштэг должен содержать только буквы и цифры';
    var MESSAGE_HASHTAGS_AMOUNT = 'Хэштегов не может быть больше ' + HASHTAGS_AMOUNT;
    var MESSAGE_HASHTAGS_REPEAT = 'Хэштеги не должны повторяться';

    // Убираем повторяющиеся пробелы
    hashtags = hashtags.replace(/\s+/g, ' ');

    // Обрезаем пробелы по краям строки
    // переводим все буквы в нижний регистр
    // разбиваем строку на массив
    hashtags = hashtags.trim().toLowerCase().split(' ');
    var errorMessage;

    // Функция проверка на наличие дублей в массиве
    var checkDouble = function (array) {
      for (var i = 0; i < array.length; i++) {
        for (var j = i + 1; j < array.length; j++) {
          if (array[i] === array[j]) {
            return true;
          }
        }
      }
      return false;
    };

    // Функция проверки самих хэштегов
    var checkTag = function (tag) {
      if (tag.length === 0) {
        errorMessage = '';
      } else if (tag.charAt(0) !== '#') {
        errorMessage = MESSAGE_FIRST_SYMBOL;
      } else if (tag.length < MIN_SYMBOL) {
        errorMessage = MESSAGE_MIN_SYMBOL;
      } else if (tag.length > MAX_SYMBOL) {
        errorMessage = MESSAGE_MAX_SYMBOL;
      } else if (!(VALID_SYMBOL.test(tag))) {
        errorMessage = MESSAGE_VALID_SYMBOL;
      }
    };

    // Проверка хэштегов
    if (hashtags.length > HASHTAGS_AMOUNT) {
      errorMessage = MESSAGE_HASHTAGS_AMOUNT;
    } else if (checkDouble(hashtags)) {
      errorMessage = MESSAGE_HASHTAGS_REPEAT;
    } else if (hashtags.length > 0) {
      for (var i = 0; i < hashtags.length; i++) {
        checkTag(hashtags[i]);
      }
    }
    return errorMessage;
  };
})();
