import {
  resetValidation,
  hasInvalidInput,
  toggleButtonState,
} from "./validate.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");

function addCard(placesTitle, placesImage) {
  const places = document.querySelector(".places");
  const cardTemplate = document.querySelector("#place__card").content;
  const placesCard = cardTemplate
    .querySelector(".places__card")
    .cloneNode(true);
  const placesTitleElement = placesCard.querySelector(".places__title");
  const placesDeleteButton = placesCard.querySelector(".places__delete-button");
  const placesImageElement = placesCard.querySelector(".places__image");
  const placesLikeButton = placesCard.querySelector(".places__like-button");

  placesImageElement.src = placesImage;
  placesImageElement.alt = placesTitle;
  placesTitleElement.textContent = placesTitle;

  placesDeleteButton.addEventListener("click", function () {
    placesCard.remove();
  });

  placesLikeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("places__like-button_active");
  });

  function openImagePopup() {
    const imagePopupTemplate = document.querySelector("#popup__image").content;
    const imagePopup = imagePopupTemplate
      .querySelector(".popup__image")
      .cloneNode(true);
    const imagePopupCloseButton = imagePopup.querySelector(
      ".popup__image-close-button"
    );
    const imagePopupContent = imagePopup.querySelector(".popup__image-content");
    const imagePopupTitle = imagePopup.querySelector(".popup__image-title");

    imagePopupTitle.textContent = placesTitle;
    imagePopupContent.src = placesImage;
    imagePopupContent.alt = placesTitle;

    document.body.append(imagePopup);
    imagePopup.classList.add("popup_active");

    imagePopupCloseButton.addEventListener("click", function () {
      imagePopup.remove();
    });

    imagePopup.addEventListener("click", closePopupOnClick);
  }

  placesImageElement.addEventListener("click", openImagePopup);

  places.append(placesCard);
}

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

initialCards.forEach((item) => {
  addCard(item.name, item.link);
});

function openPopup(popup) {
  popup.classList.add("popup_active");
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
  const form = popup.querySelector(".popup__form");
  if (form) {
    resetValidation(form);
    form.reset();
  }
}

function keydownHandler(evt) {
  const activePopup = document.querySelector(".popup_active");
  if (evt.key === "Escape") {
    closePopup(activePopup);
  }
}

function closePopupOnClick(evt) {
  const activePopup = document.querySelector(".popup_active");
  if (evt.target === activePopup) {
    closePopup(activePopup);
  }
}

function editProfile() {
  const popup = document.querySelector("#popup__edit-profile");
  const popupCloseButton = popup.querySelector(".popup__close-button");
  const popupNameInput = popup.querySelector(".popup__name-input");
  const popupAboutInput = popup.querySelector(".popup__about-input");
  const currentName = document.querySelector(".profile__name");
  const currentBio = document.querySelector(".profile__bio");
  const popupSubmitButton = popup.querySelector(".popup__submit-button");

  toggleButtonState([popupNameInput, popupAboutInput], popupSubmitButton);

  popupNameInput.value = currentName.textContent;
  popupAboutInput.value = currentBio.textContent;

  openPopup(popup);

  popupCloseButton.addEventListener("click", function () {
    closePopup(popup);
  });

  popup.addEventListener("click", closePopupOnClick);

  popupSubmitButton.addEventListener("click", function (evt) {
    evt.preventDefault();

    if (
      hasInvalidInput([popupNameInput, popupAboutInput]) ||
      (currentName.textContent === popupNameInput.value &&
        currentBio.textContent === popupAboutInput.value)
    ) {
      return;
    }

    currentName.textContent = popupNameInput.value;
    currentBio.textContent = popupAboutInput.value;

    closePopup(popup);
  });

  document.addEventListener("keydown", keydownHandler);
}

function addPlace(evt) {
  const popup = document.querySelector("#popup__add-card");
  const popupCloseButton = popup.querySelector(".popup__close-button");
  const popupTitleInput = popup.querySelector(".popup__title-input");
  const popupUrlInput = popup.querySelector(".popup__url-input");
  const popupSubmitButton = popup.querySelector(".popup__submit-button");

  openPopup(popup);

  popupCloseButton.addEventListener("click", function () {
    closePopup(popup);
  });

  popup.addEventListener("click", closePopupOnClick);

  popupSubmitButton.addEventListener("click", function (evt) {
    evt.preventDefault();

    if (hasInvalidInput([popupTitleInput, popupUrlInput])) {
      return;
    }

    const placeTitle = popupTitleInput.value;
    const placeImage = popupUrlInput.value;
    const newCard = {
      name: placeTitle,
      link: placeImage,
    };

    if (!placeTitle || !placeImage) {
      return;
    }

    addCard(newCard.name, newCard.link);
    closePopup(popup);

    popupTitleInput.value = "";
    popupUrlInput.value = "";
  });

  document.addEventListener("keydown", keydownHandler);
}

profileEditButton.addEventListener("click", editProfile);

addPlaceButton.addEventListener("click", addPlace);
