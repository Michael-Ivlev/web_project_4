import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popupElement.querySelector(".popup__form");
  }

  _getInputValues() {
    const inputs = [...this._form.querySelectorAll(".popup__input")];
    const inputValues = {};
    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", () =>
      this._submitHandler(this._getInputValues())
    );
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.close();
    });
  };

  // _preventDefault = (event) =>{
  //     event.preventDefault();
  // }

  close() {
    super.close();
    this._form.reset();
  }
}
