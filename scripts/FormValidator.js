export class FormValidator {
  constructor(settingObj, formElement){
    this.settingObj = settingObj;
    this.formElement = formElement;
  }
  enableValidation () {
    const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = this.settingObj;
  
    this.formElement.addEventListener(submitButtonSelector, (evt) => {
        evt.preventDefault();
      });
  
      this._setEventListeners(this.formElement, inputSelector, submitButtonSelector, inactiveButtonClass, errorClass, inputErrorClass);
      console.log(this.formElement, inputSelector, submitButtonSelector, inactiveButtonClass, errorClass, inputErrorClass)
  }

  _setEventListeners (
    formElement,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    errorClass,
    inputErrorClass
  ) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(formElement, inputElement, errorClass, inputErrorClass);
        this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  };

  _showInputError (
    formElement,
    inputElement,
    errorMessage,
    errorClass,
    inputErrorClass
  ) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  
  _hideInputError (
    formElement,
    inputElement,
    errorClass,
    inputErrorClass
  ) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  };
  
  _isValid (formElement, inputElement, errorClass, inputErrorClass) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClass);
    } else {
      this._hideInputError(formElement, inputElement, inputErrorClass);
    }
  }
  
  _hasInvalidInput(inputList)  {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  
  _toggleButtonState (inputList, buttonElement, inactiveButtonClass)  {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
    }
  }
  
}