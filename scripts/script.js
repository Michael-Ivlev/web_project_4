
let profileInfoEditBtn = document.querySelector(".profile__info-edit");
let popup = document.querySelector(".popup");
let closePopupBtn = document.querySelector(".popup__close");
let formElement = document.querySelector(".popup__form"); 

function openPopup() {
    popup.classList.add("popup_open");
}

function closePopup() {
    
    popup.classList.remove("popup_open");
}

function handleFormSubmit(evt) {
  evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
  // Having done so, we can define our own way of submitting the form.
  // We'll explain it in more detail later.

  // Let's find the form fields in the DOM
  let nameInput = document.querySelector("#popup__form-input_name"); // Use querySelector()
  let jobInput = document.querySelector("#popup__form-input_job");// Use querySelector()

  let name = document.querySelector(".profile__info-heading");
  let job = document.querySelector(".profile__info-description");
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