// popup script part
let profileInfoEditBtn = document.querySelector(".profile__info-edit");
let popup = document.querySelector(".popup");
let closePopupBtn = document.querySelector(".popup__close");
let formElement = document.querySelector(".popup__form"); 
let name = document.querySelector(".profile__info-heading");
let job = document.querySelector(".profile__info-description");
let nameInput = document.querySelector("#popup__form-input_name");
let jobInput = document.querySelector("#popup__form-input_job");
const pageContainer = document.querySelector(".page__container");


function openPopup() {
    popup.classList.add("popup_open");
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

function closePopup() {
    
    popup.classList.remove("popup_open");
}

function handleFormSubmit(evt) {
  evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
  // Having done so, we can define our own way of submitting the form.
  // We'll explain it in more detail later.



  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
    
  popup.classList.remove("popup_open");
  // Get the values of each field from the corresponding value property

  // Select elements where the field values will be entered

  // Insert new values using the textContent property of the querySelector() method
  }

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', handleFormSubmit);
profileInfoEditBtn.addEventListener("click", openPopup);
closePopupBtn.addEventListener("click", closePopup);


// image script part
const elementTemplate = document.querySelector("#element-template").content;
const elementsSection = document.querySelector(".elements");
const titleInput = document.querySelector("#newplace__form-input_title");
const imgurlInput = document.querySelector("#newplace__form-input_imgurl");
const newPlaceForm = document.querySelector(".newplace__form");
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

function handleFormNewplaceSubmit(event) {
  event.preventDefault();
  const initialElement = elementTemplate.querySelector(".element").cloneNode(true);
  initialCards.push(
  {
    name: titleInput.value,
    link: imgurlInput.value
  });
  initialElement.querySelector(".element__img").src = initialCards[initialCards.length - 1].link;
  initialElement.querySelector(".element__container-heading").textContent = initialCards[initialCards.length - 1].name;
  elementsSection.prepend(initialElement);
  // heart button on a new element
    const heartButton = initialElement.querySelector(".heart-button").addEventListener("click", function (evt) {
      evt.target.classList.toggle("heart-button_active");
    });
  // delete button on a new element
    const deleteButton = document.querySelector(".element__delete").addEventListener("click", function(evt) {
      let elementLink = evt.target.parentElement.querySelector(".element__img").src;
      const element = evt.target.parentElement;
    
      let index = -1;
      for(var i=0; i<initialCards.length; i++) {
        if(initialCards[i].link == elementLink) {
        index = i;
        initialCards.splice(i, 1);
      }
    } 
      element.remove();
    });
    imagePopup ();
};


for (let i = 0; i < initialCards.length; i++) {
  const initialElement = elementTemplate.querySelector(".element").cloneNode(true);
  initialElement.querySelector(".element__img").src = initialCards[i].link;
  initialElement.querySelector(".element__img").alt = initialCards[i].name;
  initialElement.querySelector(".element__container-heading").textContent = initialCards[i].name;
  elementsSection.append(initialElement);
};

newPlaceForm.addEventListener("submit", handleFormNewplaceSubmit);

// Pop up new place 
const newplace = document.querySelector(".newplace");
const profileAddButton = document.querySelector(".profile__add-button");
const newPlaceDiv = document.querySelector(".newplace");
const newplaceCloseButton = document.querySelector(".newplace__close");

function newPlaceOpen() {

newplace.classList.add("newplace_open");

 
};

 function newPlaceClose() {
  newplace.classList.remove("newplace_open");
};

profileAddButton.addEventListener("click", newPlaceOpen);
newplaceCloseButton.addEventListener("click", newPlaceClose);

// heart button
const heartButton = document.querySelectorAll(".heart-button");
heartButton.forEach(element => element.addEventListener("click", function (evt) {
  evt.target.classList.toggle("heart-button_active");
}));

// delete button
const deleteButton = document.querySelectorAll(".element__delete");
deleteButton.forEach(element => element.addEventListener("click", function(evt) {
  let elementLink = evt.target.parentElement.querySelector(".element__img").src;
  const element = evt.target.parentElement;

  let index = -1;
  for(var i=0; i<initialCards.length; i++) {
	  if(initialCards[i].link == elementLink) {
		index = i;
    initialCards.splice(i, 1);
	}
} 
  element.remove();
}));

// image popup
function imagePopup () {
const imageElement = document.querySelectorAll(".element__img");
const imagePopupTemplate = document.querySelector("#image-popup-template").content;
const initialPopupTemplate = imagePopupTemplate.querySelector(".image-popup");
  imageElement.forEach (element => element.addEventListener("click", function (evt) {
    pageContainer.prepend(initialPopupTemplate);
    const popupImage = evt.target.src;
    initialPopupTemplate.querySelector(".image-popup__image").src = popupImage;
    console.log(popupImage);
    const popupCloseButton = document.querySelector(".image-popup__close").addEventListener("click", function () {
      const imagepopup = document.querySelector(".image-popup");
      imagepopup.remove();
    });
}));
};