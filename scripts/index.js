import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input-error",
};

const initialCards = [
  {
    name: "Kilauea",
    link: "https://images.unsplash.com/photo-1576941026827-bccc82341bdd?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Gran Cañón",
    link: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lago Tahoe",
    link: "https://images.unsplash.com/photo-1647285467535-f57aa912ebe8?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Parque Nacional de las Secuoyas",
    link: "https://images.unsplash.com/photo-1472740378865-80aab8e73251?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cataratas McWay",
    link: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Glaciar Hubbard",
    link: "https://images.unsplash.com/photo-1605978208410-c3deb0fab40d?q=80&w=1676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const places = document.querySelector(".places");

const profileEditButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");

const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");

const editProfilePopup = document.querySelector("#popup__edit-profile");
const addCardPopup = document.querySelector("#popup__add-card");
const imagePopup = document.querySelector("#popup__image");

const editProfileForm = editProfilePopup.querySelector(".popup__form");
const addCardForm = addCardPopup.querySelector(".popup__form");

const nameInput = editProfilePopup.querySelector(".popup__name-input");
const aboutInput = editProfilePopup.querySelector(".popup__about-input");

const titleInput = addCardPopup.querySelector(".popup__title-input");
const urlInput = addCardPopup.querySelector(".popup__url-input");

const imagePopupContent = imagePopup.querySelector(".popup__image-content");
const imagePopupTitle = imagePopup.querySelector(".popup__image-title");

const editProfileValidator = new FormValidator(
  validationConfig,
  editProfileForm,
);

const addCardValidator = new FormValidator(validationConfig, addCardForm);

editProfileValidator.setEventListeners();
addCardValidator.setEventListeners();

function openImagePopup(name, link) {
  imagePopupContent.src = link;
  imagePopupContent.alt = name;
  imagePopupTitle.textContent = name;

  openPopup(imagePopup);
}

function createCard(cardData) {
  const card = new Card(cardData, "#place__card", openImagePopup);
  return card.generateCard();
}

function addCard(cardData) {
  const cardElement = createCard(cardData);
  places.append(cardElement);
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileBio.textContent = aboutInput.value;

  closePopup(editProfilePopup);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: titleInput.value,
    link: urlInput.value,
  };

  addCard(newCard);

  addCardForm.reset();
  addCardValidator.resetValidation();

  closePopup(addCardPopup);
}

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileBio.textContent;

  editProfileValidator.resetValidation();
  openPopup(editProfilePopup);
}

function openAddCardPopup() {
  addCardForm.reset();
  addCardValidator.resetValidation();

  openPopup(addCardPopup);
}

function setPopupEventListeners(popup) {
  const closeButton = popup.querySelector(
    ".popup__close-button, .popup__image-close-button",
  );

  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });

  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
}

initialCards.forEach((cardData) => {
  addCard(cardData);
});

profileEditButton.addEventListener("click", openEditProfilePopup);
addPlaceButton.addEventListener("click", openAddCardPopup);

editProfileForm.addEventListener("submit", handleEditProfileSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  setPopupEventListeners(popup);
});
