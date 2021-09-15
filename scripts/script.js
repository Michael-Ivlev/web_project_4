// popup script part
const profileInfoEditBtn = document.querySelector(".profile__info-edit");
const profilePopup = document.querySelector(".popup-profile");
const profileForm = profilePopup.querySelector(".popup__form");
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
  closePopup(event.target);
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
const elementTemplate = document.querySelector("#element-template").content;
const elementsSection = document.querySelector(".elements");
const titleInput = document.querySelector("#popup-card__form-input_title");
const imgurlInput = document.querySelector("#popup-card__form-input_imgurl");
const newPlaceForm = document.querySelector("#popup-card__form");
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
function createCard(name, link) {
  const card = elementTemplate.querySelector(".element").cloneNode(true);
  const cardImage = card.querySelector(".element__img");
  cardImage.src = link;
  cardImage.alt = name;
  card.querySelector(".element__container-heading").textContent = name;
  // add heart button
  const heartButton = card.querySelector(".heart-button");
  heartButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("heart-button_active");
  });
  // delete button
  const deleteButton = card.querySelector(".element__delete");
  deleteButton.addEventListener("click", function (evt) {
    card.remove();
  });
  // image popup
  cardImage.addEventListener("click", function (evt) {
    openPopup(imagePopUp);
    popupImageImage.src = evt.target.src;
    popupImageName.textContent = evt.target.alt;
  });
  return card;
}
function closeImagePopup() {
  closePopup(imagePopUp);
}

function renderCard(card) {
  elementsSection.prepend(card);
}

function handleFormNewplaceSubmit(event) {
  event.preventDefault();
  renderCard(createCard(titleInput.value, imgurlInput.value));
  titleInput.value = "";
  imgurlInput.value = "";
  event.target
    .querySelector(".popup__button")
    .classList.add("popup__button_disabled");
  closeCardPopup();
}

initialCards.reverse().forEach((card) => {
  renderCard(createCard(card.name, card.link));
});

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
