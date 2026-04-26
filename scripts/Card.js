class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".places__card")
      .cloneNode(true);

    return cardElement;
  }

  _handleDeleteButtonClick() {
    this._element.remove();
  }

  _handleLikeButtonClick() {
    this._likeButton.classList.toggle("places__like-button_active");
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButtonClick();
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });

    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector(".places__image");
    this._titleElement = this._element.querySelector(".places__title");
    this._deleteButton = this._element.querySelector(".places__delete-button");
    this._likeButton = this._element.querySelector(".places__like-button");

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
