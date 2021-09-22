import { openPopup } from "./index.js";
import { imagePopUp } from "./index.js";
import { popupImageImage } from "./index.js";
import { popupImageName } from "./index.js";
class Card {
  constructor(data, template) {
    this._image = data.link;
    this._title = data.name;
    this._template = template;
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
    this.element.querySelector(".element__container-heading").textContent =
      this._title;
    this._setEventListeners();
    return this.element;
  }

  _setEventListeners() {
    this.element
      .querySelector(".heart-button")
      .addEventListener("click", () => {
        this._heartButtonClick();
      });
    this.element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._deleteButtonClick();
      });
    this.element
      .querySelector(".element__img")
      .addEventListener("click", () => {
        this._openImagePopup();
      });
  }

  _heartButtonClick() {
    this.element
      .querySelector(".heart-button")
      .classList.toggle("heart-button_active");
  }

  _deleteButtonClick() {
    this.element.remove();
  }

  _openImagePopup() {
    openPopup(imagePopUp);
    popupImageImage.src = this._image;
    popupImageName.textContent = this._title;
  }
}

export { Card };
