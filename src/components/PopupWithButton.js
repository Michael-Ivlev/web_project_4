import { Popup } from "./Popup.js";

export class PopupWithButton extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popupElement.querySelector(".popup__form");
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitHandler();
    });
  };
}
