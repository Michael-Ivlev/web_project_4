import { Popup } from "./Popup.js";

export class Card {
  constructor(data, template, handleCardClick, handleDeleteClick, userId) {
    this._image = data.link;
    this._title = data.name;
    this._likes = data.likes;
    this._template = template;
    this._userId = userId;
    this._imageOwnerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this.element = this._getTemplate();
    this.element.querySelector(".element__img").src = this._image;
    this.element.querySelector(".element__img").alt = this._title;
    this.element.querySelector(".element__container-heading").textContent =
      this._title;
    this.element.querySelector(".image-likes").textContent = this._likes.length;
    if (this._imageOwnerId === this._userId) {
      this.element.querySelector(".element__delete").style.visibility =
        "visible";
    }
    this._setEventListeners();
    return this.element;
  }

  _setEventListeners() {
    this.element
      .querySelector(".heart-button")
      .addEventListener("click", this._heartButtonClick);
    this.element
      .querySelector(".element__img")
      .addEventListener("click", () => this._handleCardClick());
    this.element
      .querySelector(".element__delete")
      .addEventListener("click", () => this._handleDeleteClick());
  }



  _heartButtonClick = () => {
    this.element
      .querySelector(".heart-button")
      .classList.toggle("heart-button_active");
  };
}
