// CSS Imports
import "./index.css";
// JavaScript Imports
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import {
  profileAddButton,
  profileInfoEditBtn,
  profileForm,
  profileInputName,
  profileInputJob,
  newPlaceForm,
  settingsObject,
} from "../utils/constants.js";
import { api } from "../components/Api";

// // generate Dom element from item with link and name and return it
// const cardGenerator = (item) => {
//   const cardInstance = new Card(item, "#element-template", () => {
//     imageModal.open(item.link, item.name);
//   });
//   const cardElement = cardInstance.generateCard();
//   return cardElement;
// };

// modals
const userInfoModal = new UserInfo(
  ".profile__info-heading",
  ".profile__info-description",
  ".profile__avatar"
);

const imageModal = new PopupWithImage(".popup-image");

const editProfielModal = new PopupWithForm(".popup-profile", (data) => {
  api.setUserInfo(
    data["popup-profile-profile-name-input"],
    data["popup-profile-job-input"]
  );

  api.getUserInfo().then((res) => {
    userInfoModal.setUserInfo(res.name, res.about, res.avatar);
  });
  // userInfoModal.setUserInfo(
  //   data["popup-profile-profile-name-input"],
  //   data["popup-profile-job-input"]
  // );
  // profileInputName.placeholder = userInfoModal.getUserInfo().name;
  // profileInputJob.placeholder = userInfoModal.getUserInfo().job;
});

// const deleteImageModal = new PopupWithForm(".popup-delete", (evt) => {
//   console.log(evt)
// })

const addCardModal = new PopupWithForm(".popup-card", (object) => {
  api
    .addNewCard(
      object["popup-card-title-input"],
      object["popup-card-imgurl-input"]
    )
    .then((res) => {
      location.reload();
    });
});

// const addCardModal = new PopupWithForm(".popup-card", (object) => {

//   api.addNewCard(object["popup-card-title-input"], object["popup-card-imgurl-input"])
//   // .then((res) => {
//   //   console.log(res)
//   // })
//   const data = {
//     name: object["popup-card-title-input"],
//     link: object["popup-card-imgurl-input"],
//   };

//   const newCard = new Section(
//     {
//       items: res,
//       renderer: (item) => {
//         newCard.addItem(cardGenerator(item));
//       },
//     },
//     ".elements"
//   );
//   newCard.renderItems();

//   initialCardsModal.prependItem(cardGenerator(data));
// });

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


// inital the profile name and job from server
api.getUserInfo().then((res) => {
  userInfoModal.setUserInfo(res.name, res.about, res.avatar);
});

// generate Dom element from item with link and name and return it
const cardGenerator = (item) => {
  const cardInstance = new Card(item, "#element-template", () => {
    imageModal.open(item.link, item.name);
  });
  const cardElement = cardInstance.generateCard();
  return cardElement;
};

// initial cards from the server
api.getInitialCards().then((res) => {
  const initialCardsModal = new Section(
    {
      items: res,
      renderer: (item) => {
        initialCardsModal.addItem(cardGenerator(item));
      },
    },
    ".elements"
  );
  initialCardsModal.renderItems();
});

// const initialCardsModal =
// new Section(
//   {
//     items: initialCards,
//     renderer: (item) => {
//       initialCardsModal.addItem(cardGenerator(item));
//     },
//   },
//   ".elements"
// );
// initialCardsModal.renderItems();

// add form validators
const newPlaceFormInstance = new FormValidator(settingsObject, newPlaceForm);
newPlaceFormInstance.enableValidation();

const profileFormInstance = new FormValidator(settingsObject, profileForm);
profileFormInstance.enableValidation();
