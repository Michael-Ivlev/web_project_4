import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { settingsObject } from "./settingsObject.js";
import { initialCards } from "./initialCards.js";
import { openPopup, closePopup } from "./utils.js";

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

allCloseButtons.forEach((element) => {
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

function openProfilePopup() {
  openPopup(profilePopup);
  profileInputName.value = name.textContent;
  profileInputJob.value = job.textContent;
}

function closeProfilePopup() {
  closePopup(profilePopup);
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
const imgUrlInput = document.querySelector("#popup-card__form-input_imgurl");
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
    link: imgUrlInput.value,
  };

  const cardInstance = new Card(data, "#element-template");
  const cardElement = cardInstance.generateCard();
  elementsSection.prepend(cardElement);

  titleInput.form.reset();
  imgUrlInput.form.reset();
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

const newPlaceFormInstance = new FormValidator(settingsObject, newPlaceForm);
newPlaceFormInstance.enableValidation();
const profileFormInstance = new FormValidator(settingsObject, profileForm);
profileFormInstance.enableValidation();

export { imagePopUp, popupImageImage, popupImageName };
