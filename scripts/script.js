// popup script part
const profileInfoEditBtn = document.querySelector(".profile__info-edit");
const profilePopup = document.querySelector(".popup-profile");
const closePopupBtn = document.querySelector(".popup-profile__close");
const Form = document.querySelector(".popup__form");
const name = document.querySelector(".profile__info-heading");
const job = document.querySelector(".profile__info-description");
const imagePopUp = document.querySelector(".popup-image");
const imageClose = document.querySelector(".popup-image__close");
const profileInputName = document.querySelector(
  "#popup-profile__form-input_name"
);
const profileInputJob = document.querySelector(
  "#popup-profile__form-input_job"
);
const pageContainer = document.querySelector(".page__container");

function openPopup(popup) {
  popup.classList.add("popup_open");
}

function closePopup(popup) {
  popup.classList.remove("popup_open");
}

function openProfilePopup() {
  openPopup(profilePopup);
  profileInputName.value = name.textContent;
  profileInputJob.value = job.textContent;
}

function closeProfilePopup() {
  closePopup(profilePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
  // Having done so, we can define our own way of submitting the form.
  // We'll explain it in more detail later.

  name.textContent = profileInputName.value;
  job.textContent = profileInputJob.value;
  closeProfilePopup();
}
const popupElement = document.querySelector(".popup");
popupElement.addEventListener("click", closeProfilePopup);
Form.addEventListener("submit", handleProfileFormSubmit);
profileInfoEditBtn.addEventListener("click", openProfilePopup);
closePopupBtn.addEventListener("click", closeProfilePopup);

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
  card.querySelector(".element__img").src = link;
  card.querySelector(".element__img").alt = name;
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
  const elementImg = card.querySelector(".element__img");
  elementImg.addEventListener("click", function (evt) {
    openPopup(imagePopUp);
    imagePopUp.querySelector(".popup-image__image").src = evt.target.src;
    imagePopUp.querySelector(".popup-image__name").textContent = evt.target.alt;
  });
  return card;
}
function closeImagePopup() {
  closePopup(imagePopUp);
}
imageClose.addEventListener("click", closeImagePopup);

function renderCard(card) {
  elementsSection.append(card);
}

function handleFormNewplaceSubmit(event) {
  event.preventDefault();
  renderCard(
    createCard(
      titleInput.value,
      imgurlInput.value
    )
  );
  closeCardPopup();
}

initialCards.forEach((card) => {
  renderCard(createCard(card.name, card.link));
});

newPlaceForm.addEventListener("submit", handleFormNewplaceSubmit);

// Pop up Card
const card = document.querySelector(".popup-card");
const profileAddButton = document.querySelector(".profile__add-button");
const newPlaceDiv = document.querySelector(".popup-card");
const cardCloseButton = document.querySelector(".popup-card__close");

function openCardPopup() {
  openPopup(card);
}

function closeCardPopup() {
  closePopup(card);
}

profileAddButton.addEventListener("click", openCardPopup);
cardCloseButton.addEventListener("click", closeCardPopup);
