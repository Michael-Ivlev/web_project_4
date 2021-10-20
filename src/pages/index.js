// CSS Imports
import "./index.css";
// JavaScript Imports
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithButton } from "../components/PopupWithButton.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import {
  profileAddButton,
  profileInfoEditBtn,
  profileForm,
  newPlaceForm,
  settingsObject,
  avatarEditForm,
  profileAvatarEditButton,
} from "../utils/constants.js";
import { api } from "../components/Api";

const editAvatarModal = new PopupWithForm(".popup-avataredit", (data) => {
  api
    .setAvatarImage(data["popup-avataredit-profile-link-input"])
    .then(() => {
      userInfoModal.setAvatarImage(data["popup-avataredit-profile-link-input"]);
    })
    .then(() => editAvatarModal.close())
    .catch((err) => console.log(`Error: ${err}`));
});

const userInfoModal = new UserInfo(
  ".profile__info-heading",
  ".profile__info-description",
  ".profile__avatar"
);

const imageModal = new PopupWithImage(".popup-image");

const editProfielModal = new PopupWithForm(".popup-profile", (data) => {
  api
    .setUserInfo(
      data["popup-profile-profile-name-input"],
      data["popup-profile-job-input"]
    )
    .then((res) => {
      userInfoModal.setUserInfo(res.name, res.about, res.avatar);
    })
    .then(() => editProfielModal.close())
    .catch((err) => console.log(`Error: ${err}`));
});

// eventlisteners to the modal
imageModal.setEventListeners();

// deleteButtonModal.setEventListeners();

editAvatarModal.setEventListeners();

editProfielModal.setEventListeners();

profileInfoEditBtn.addEventListener("click", () => {
  const userinfo = userInfoModal.getUserInfo();
  api
    .getUserInfo()
    .then((res) => {
      document.querySelector("#popup-profile__form-input_name").value =
        userinfo.name;
      document.querySelector("#popup-profile__form-input_job").value =
        userinfo.job;
    })
    .catch((err) => console.log(`Error: ${err}`));
  editProfielModal.open();
});

profileAvatarEditButton.addEventListener("click", () => {
  editAvatarModal.open();
});

// inital the profile name and job from server
api
  .getUserInfo()
  .then((res) => {
    userInfoModal.setUserInfo(res.name, res.about, res.avatar);

    const cardGenerator = (item) => {
      const cardInstance = new Card(
        item,
        "#element-template",
        () => {
          imageModal.open(item.link, item.name);
        },
        () => {
          const deleteButtonModal = new PopupWithButton(".popup-delete", () => {
            api
              .removeCard(item._id)
              .then(() => {
                cardInstance.removeCard();
              })
              .then(() => deleteButtonModal.close())
              .catch((err) => console.log(`Error: ${err}`));
          });
          deleteButtonModal.setEventListeners();
          deleteButtonModal.open();
        },
        res._id,
        () => {
          const isAleradyLiked = cardInstance.isLiked();

          if (isAleradyLiked) {
            api
              .removeLike(item._id)
              .then((res) => {
                cardInstance.cardDislike(res.likes);
              })
              .catch((err) => console.log(`Error: ${err}`));
          } else {
            api
              .addLike(item._id)
              .then((res) => {
                cardInstance.cardLike(res.likes);
              })
              .catch((err) => console.log(`Error: ${err}`));
          }
        }
      );

      const cardElement = cardInstance.generateCard();
      return cardElement;
    };

    // initial cards from the server
    api
      .getInitialCards()
      .then((res) => {
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

        const addCardModal = new PopupWithForm(".popup-card", (object) => {
          api
            .addNewCard(
              object["popup-card-title-input"],
              object["popup-card-imgurl-input"]
            )
            .then((res) => {
              initialCardsModal.prependItem(cardGenerator(res));
            })
            .then(() => addCardModal.close())
            .catch((err) => console.log(`Error: ${err}`));
        });
        addCardModal.setEventListeners();

        profileAddButton.addEventListener("click", () => {
          addCardModal.open();
        });
      })
      .catch((err) => console.log(`Error: ${err}`));
  })
  .catch((err) => console.log(`Error: ${err}`));

// enable form validators
const newPlaceFormInstance = new FormValidator(settingsObject, newPlaceForm);
newPlaceFormInstance.enableValidation();

const profileFormInstance = new FormValidator(settingsObject, profileForm);
profileFormInstance.enableValidation();

const avatarEditInstance = new FormValidator(settingsObject, avatarEditForm);
avatarEditInstance.enableValidation();
