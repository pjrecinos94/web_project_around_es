const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

const editPopup = document.querySelector("#edit-popup");
const editPopupCloseButton = editPopup.querySelector(".popup__close");
const editProfileForm = editPopup.querySelector("#edit-profile-form");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const descriptionInput = editProfileForm.querySelector(
  ".popup__input_type_description",
);

const newCardPopup = document.querySelector("#new-card-popup");
const newCardPopupCloseButton = newCardPopup.querySelector(".popup__close");
const newCardForm = newCardPopup.querySelector("#new-card-form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

const imagePopup = document.querySelector("#image-popup");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

function openModal(modalElement) {
  modalElement.classList.add("popup_is-opened");
}

function closeModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editPopup);
}

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteButtonClick(evt) {
  evt.target.closest(".card").remove();
}

function handleOpenImageModal(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;

  openModal(imagePopup);
}

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardLikeButton.addEventListener("click", handleLikeButtonClick);
  cardDeleteButton.addEventListener("click", handleDeleteButtonClick);
  cardImage.addEventListener("click", function () {
    handleOpenImageModal(name, link);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);

  container.prepend(cardElement);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  renderCard(cardNameInput.value, cardLinkInput.value, cardsList);

  closeModal(newCardPopup);
  newCardForm.reset();
}

profileEditButton.addEventListener("click", handleOpenEditModal);

editPopupCloseButton.addEventListener("click", function () {
  closeModal(editPopup);
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

profileAddButton.addEventListener("click", function () {
  openModal(newCardPopup);
});

newCardPopupCloseButton.addEventListener("click", function () {
  closeModal(newCardPopup);
});

newCardForm.addEventListener("submit", handleCardFormSubmit);

imagePopupCloseButton.addEventListener("click", function () {
  closeModal(imagePopup);
});

initialCards
  .slice()
  .reverse()
  .forEach(function (card) {
    renderCard(card.name, card.link, cardsList);
  });
