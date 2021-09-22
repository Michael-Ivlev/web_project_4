import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { settingsObj } from "./settingsObj.js";
import { initialCards } from "./initialCards.js";
// popup script part
const profileInfoEditBtn = document.querySelector(".profile__info-edit");
const profilePopup = document.querySelector(".popup-profile");
const profileForm = profilePopup.querySelector("#popup-profile__form");
const name = document.querySelector(".profile__info-heading");
const job = document.querySelector(".profile__info-description");
const imagePopUp = document.querySelector(".popup-image");
const cardPopup = document.querySelector(".popup-card");
const popupImageName = imagePopUp.querySelector(".popup-image__name");
const popupImageImage = imagePopUp.querySelector(".popup-image__image");
const profileCloseButton = profilePopup.querySelector(".popup__close");
const cardCloseButton = cardPopup.querySelector(".popup__close");
const imageCloseButton = imagePopUp.querySelector(".popup__close");
const allCloseButtons = document.querySelectorAll(".popup__close");

const addEventListenerToAllCrossBtns = allCloseButtons.forEach((element) => {
  if (element === profileCloseButton) {
    profileCloseButton.addEventListener("click", () =>
      closePopup(profilePopup)
    );
  }
  if (element === cardCloseButton) {
    cardCloseButton.addEventListener("click", () => closePopup(cardPopup));
  }
  if (element === imageCloseButton) {
    imageCloseButton.addEventListener("click", () => closePopup(imagePopUp));
  } else {
    return null;
  }
});
const profileInputName = document.querySelector(
  "#popup-profile__form-input_name"
);
const profileInputJob = document.querySelector(
  "#popup-profile__form-input_job"
);
const pageContainer = document.querySelector(".page__container");

function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", closePopupWithEsc);
  popup.addEventListener("mousedown", closePopupWithOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", closePopupWithEsc);
  popup.removeEventListener("mousedown", closePopupWithOverlay);
}

function openProfilePopup() {
  openPopup(profilePopup);
  profileInputName.value = name.textContent;
  profileInputJob.value = job.textContent;
}

function closeProfilePopup() {
  closePopup(profilePopup);
}

function closePopupWithOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

function closePopupWithEsc(event) {
  const key = event.key;
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_open");
    closePopup(popup);
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = profileInputName.value;
  job.textContent = profileInputJob.value;
  closeProfilePopup();
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
profileInfoEditBtn.addEventListener("click", openProfilePopup);

// image script part

const elementsSection = document.querySelector(".elements");
const titleInput = document.querySelector("#popup-card__form-input_title");
const imgurlInput = document.querySelector("#popup-card__form-input_imgurl");
const newPlaceForm = document.querySelector("#popup-card__form");

initialCards.forEach((data) => {
  const cardInstance = new Card(data, "#element-template");
  const cardElement = cardInstance.generateCard();
  elementsSection.append(cardElement);
});

function handleFormNewplaceSubmit(event) {
  event.preventDefault();

  const data = {
    name: titleInput.value,
    link: imgurlInput.value,
  };
  const cardInstance = new Card(data, "#element-template");
  const cardElement = cardInstance.generateCard();
  elementsSection.prepend(cardElement);

  titleInput.value = "";
  imgurlInput.value = "";
  event.target
    .querySelector(".popup__button")
    .classList.add("popup__button_disabled");
  closeCardPopup();
}

newPlaceForm.addEventListener("submit", handleFormNewplaceSubmit);

// Pop up Card
const profileAddButton = document.querySelector(".profile__add-button");

function openCardPopup() {
  openPopup(cardPopup);
}

function closeCardPopup() {
  closePopup(cardPopup);
}

profileAddButton.addEventListener("click", openCardPopup);

const newplaceFormInstance = new FormValidator(settingsObj, newPlaceForm);
newplaceFormInstance.enableValidation();
const ProfileFormInstance = new FormValidator(settingsObj, profileForm);
ProfileFormInstance.enableValidation();

export { openPopup };
export { imagePopUp };
export { popupImageImage };
export { popupImageName };
