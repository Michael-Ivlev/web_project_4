import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {

open(link, text) {
    const imageElement = this._popupElement.querySelector(".popup-image__image");
    const captionElement = this._popupElement.querySelector(".popup-image__name");

    imageElement.src = link;
    captionElement.textContent = text;

    super.open();
  }
}

