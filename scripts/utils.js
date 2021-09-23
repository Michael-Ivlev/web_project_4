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

function closePopupWithOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

function closePopupWithEsc(event) {
  const key = event.key;
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_open");
    closePopup(popup);
  }
}

export { openPopup, closePopup, closePopupWithOverlay, closePopupWithEsc };
