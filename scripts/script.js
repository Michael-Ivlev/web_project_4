// popup script part
let profileInfoEditBtn = document.querySelector(".profile__info-edit");
let popup = document.querySelector(".popup");
let closePopupBtn = document.querySelector(".popup__close");
let formElement = document.querySelector(".popup__form"); 
let name = document.querySelector(".profile__info-heading");
let job = document.querySelector(".profile__info-description");
let nameInput = document.querySelector("#popup__form-input_name");
let jobInput = document.querySelector("#popup__form-input_job");



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


for (let i = 0; i < initialCards.length; i++) {
  const initialElement = elementTemplate.querySelector(".element").cloneNode(true);
  initialElement.querySelector(".element__img").src = initialCards[i].link;
  initialElement.querySelector(".element__img").alt = initialCards[i].name;
  initialElement.querySelector(".element__container-heading").textContent = initialCards[i].name;
  elementsSection.append(initialElement);
}




    // initialCards.forEach(element => {
    //   initialElement1.querySelector(".element__img").src = initialCards[0].link;
    //   initialElement1.querySelector(".element__container-heading").textContent = initialCards[0].name;
    //   elementsSection.append(initialElement1);
    // });
    // console.log(elementTemplate);
    // console.log(initialCards[0].name);
