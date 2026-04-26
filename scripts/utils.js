function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_active");

    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function openPopup(popup) {
  popup.classList.add("popup_active");
  document.addEventListener("keydown", handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
  document.removeEventListener("keydown", handleEscClose);
}

export { openPopup, closePopup };
