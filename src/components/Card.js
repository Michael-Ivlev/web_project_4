import { Popup } from "./Popup.js";

export class Card {
  constructor(
    data,
    template,
    handleCardClick,
    handleDeleteClick,
    userId,
    handleLikeClick
  ) {
    this._image = data.link;
    this._title = data.name;
    this._likes = data.likes;
    this._template = template;
    this._userId = userId;
    this._imageOwnerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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

    if (this.isLiked()) {
      this.element
        .querySelector(".heart-button")
        .classList.add("heart-button_active");
    }

    this._setEventListeners();
    return this.element;
  }

  cardLike(newLikes) {
    this._likes = newLikes;
    this.element.querySelector(".image-likes").textContent = this._likes.length;
    this.element
      .querySelector(".heart-button")
      .classList.add("heart-button_active");
  }

  cardDislike(likesabout) {
    console.log(likesabout)
    this.element.querySelector(".image-likes").textContent = likesabout.length;
    this.element
      .querySelector(".heart-button")
      .classList.remove("heart-button_active");
  }

  _setEventListeners() {
    this.element
      .querySelector(".heart-button")
      .addEventListener("click", () => this._handleLikeClick());
    this.element
      .querySelector(".element__img")
      .addEventListener("click", () => this._handleCardClick());
    this.element
      .querySelector(".element__delete")
      .addEventListener("click", () => this._handleDeleteClick());
  }

  isLiked() {
    return this._likes.some((element) => element._id === this._userId);
  }

  removeCard = () => { 

    this.element.remove(); 

    this.element = null; 

  }; 
}
