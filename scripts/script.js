
let profileInfoEditBtn = document.querySelector(".profile__info-edit");

function openPopup() {
    let popup = document.querySelector(".popup");
    popup.classList.add("popup__open");
    console.log ("open");
}
profileInfoEditBtn.addEventListener("click", openPopup);

let closePopupBtn = document.querySelector(".popup__close");

function closePopup() {
    let popup = document.querySelector(".popup");
    popup.classList.remove("popup__open");
    console.log ("close");
}

closePopupBtn.addEventListener("click", closePopup);


// Let's find the form in the DOM
let formElement = document.querySelector(".popup__form"); // Use the querySelector() method

  // Next is the form submit handler, though
  // it won't submit anywhere just yet
  function handleFormSubmit(evt) {
    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
    // Having done so, we can define our own way of submitting the form.
    // We'll explain it in more detail later.

    // Let's find the form fields in the DOM
    let nameInput = document.querySelector(".popup__form-name"); // Use querySelector()
    let jobInput = document.querySelector(".popup__form-job");// Use querySelector()

    let name = document.querySelector(".profile__info-heading");
    let job = document.querySelector(".profile__info-description")
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    let popup = document.querySelector(".popup");
    popup.classList.remove("popup__open");
        // Get the values of each field from the corresponding value property

        // Select elements where the field values will be entered

        // Insert new values using the textContent property of the querySelector() method
  }

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', handleFormSubmit);