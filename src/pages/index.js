// CSS Imports
import "./index.css"
// JavaScript Imports
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import {
  initialCards,
  profileAddButton,
  profileInfoEditBtn,
  profileForm,
  profileInputName,
  profileInputJob,
  newPlaceForm,
  settingsObject,
} from "../utils/constants.js";

// generate Dom element from item with link and name and return it
const cardGenerator = (item) => {
  const cardInstance = new Card(item, "#element-template", () => {
    imageModal.open(item.link, item.name);
  });
  const cardElement = cardInstance.generateCard();
  return cardElement;
};

// modals
const imageModal = new PopupWithImage(".popup-image");
const editProfielModal = new PopupWithForm(".popup-profile", (data) => {
  const userInfoModal = new UserInfo(
    ".profile__info-heading",
    ".profile__info-description"
  );
  userInfoModal.setUserInfo(
    data["popup-profile-profile-name-input"],
    data["popup-profile-job-input"]
  );
  profileInputName.placeholder = userInfoModal.getUserInfo().name;
  profileInputJob.placeholder = userInfoModal.getUserInfo().job;
});

const addCardModal = new PopupWithForm(".popup-card", (object) => {
  const data = [
    {
      name: object["popup-card-title-input"],
      link: object["popup-card-imgurl-input"],
    },
  ];
  const addCardsModal = new Section(
    {
      items: data,
      renderer: (item) => {
        addCardsModal.prependItem(cardGenerator(item));
      },
    },
    ".elements"
  );
  addCardsModal.renderItems();
});

const initialCardsModal = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      initialCardsModal.addItem(cardGenerator(item));
    },
  },
  ".elements"
);
initialCardsModal.renderItems();

// eventlisteners to the modal
imageModal.setEventListeners();
editProfielModal.setEventListeners();
addCardModal.setEventListeners();

profileAddButton.addEventListener("click", () => {
  addCardModal.open();
});

profileInfoEditBtn.addEventListener("click", () => {
  editProfielModal.open();
});

const newPlaceFormInstance = new FormValidator(settingsObject, newPlaceForm);
newPlaceFormInstance.enableValidation();
const profileFormInstance = new FormValidator(settingsObject, profileForm);
profileFormInstance.enableValidation();
