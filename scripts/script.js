// popup script part
const profileInfoEditBtn = document.querySelector(".profile__info-edit");
const profilePopup = document.querySelector(".popup-profile");
const closePopupBtn = document.querySelector(".popup-profile__close");
const formElement = document.querySelector(".popup-profile__form");
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

function handleFormSubmit(evt) {
  evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
  // Having done so, we can define our own way of submitting the form.
  // We'll explain it in more detail later.

  name.textContent = profileInputName.value;
  job.textContent = profileInputJob.value;
}

formElement.addEventListener("submit", handleFormSubmit);
profileInfoEditBtn.addEventListener("click", openProfilePopup);
closePopupBtn.addEventListener("click", closeProfilePopup);

// image script part
const elementTemplate = document.querySelector("#element-template").content;
const elementsSection = document.querySelector(".elements");
const titleInput = document.querySelector("#popup-card__form-input_title");
const imgurlInput = document.querySelector("#popup-card__form-input_imgurl");
const newPlaceForm = document.querySelector(".popup-card__form");
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
  const ElementImg = card.querySelector(".element__img");
  ElementImg.addEventListener("click", function (evt) {
    openPopup(imagePopUp);
    imagePopUp.querySelector(".popup-image__image").src = evt.target.src;
    imagePopUp.querySelector(".popup-image__name").textContent = evt.target.alt;
  });
  function closeImagePopup() {
    closePopup(imagePopUp);
  }
  imageClose.addEventListener("click", closeImagePopup);
  return card;
}

function renderCard(card) {
  elementsSection.append(card);
}

function handleFormNewplaceSubmit(event) {
  event.preventDefault();
  initialCards.push({ name: titleInput.value, link: imgurlInput.value });
  renderCard(
    createCard(
      initialCards[initialCards.length - 1].name,
      initialCards[initialCards.length - 1].link
    )
  );
}

initialCards.forEach((card) => {
  card;
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

function CloseCardPopup() {
  closePopup(card);
}

profileAddButton.addEventListener("click", openCardPopup);
cardCloseButton.addEventListener("click", CloseCardPopup);
