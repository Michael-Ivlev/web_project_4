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

  setForminputs () {
    const inputs = [...this._form.querySelectorAll(".popup__input")];
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      this._form.querySelector(".popup__button").textContent = "Saving...";
      this._submitHandler(this._getInputValues());
      event.preventDefault();
    });
  };

  // _preventDefault = (event) =>{
  //     event.preventDefault();
  // }

  close() {
    super.close();
    this._form.reset();
    this._form.querySelector(".popup__button").textContent = "Save";
    this._form.querySelector(".popup__button").setAttribute("disabled", true);
    this._form.querySelector(".popup__button").classList.add("popup__button_disabled")
  }
}
