"use strict";

var contactElement = function contactElement(name) {
  var hide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return "\n        <li data-identifier='".concat(name, "'>\n            <ion-icon name=\"").concat(name === "Todos" ? "people" : "person-circle", "\"></ion-icon>\n            ").concat(name, "\n            <ion-icon class=\"check ").concat(hide ? "" : "hide", "\" name=\"checkmark-outline\"></ion-icon>\n        </li>\n    ");
};

var renderParticipants = function renderParticipants(contact) {
  PARTICIPANTS.forEach(function (participant) {
    contact.innerHTML += contactElement(participant.name, participant.name === MESSAGE_CONFIG.to);
  });
};

var hideCheckElements = function hideCheckElements(elements) {
  elements.forEach(function (element) {
    element.querySelector(".check").classList.add("hide");
  });
};

var chooseParticipant = function chooseParticipant(participantElements) {
  participantElements.forEach(function (element) {
    element.onclick = function (e) {
      hideCheckElements(participantElements);
      MESSAGE_CONFIG.to = element.getAttribute("data-identifier");
      element.querySelector(".check").classList.remove("hide");
    };
  });
};

var chooseVisibility = function chooseVisibility() {
  var elements = document.querySelectorAll(".visibility ul li");
  elements.forEach(function (element) {
    element.onclick = function (e) {
      hideCheckElements(elements);
      MESSAGE_CONFIG.type = element.getAttribute("data-type") === "0" ? "message" : "private_message";
      element.querySelector(".check").classList.remove("hide");
    };
  });
};

var getParticipants = function getParticipants() {
  UOLChatAPI.getParticipants().then(function (res) {
    PARTICIPANTS = [{
      name: "Todos"
    }].concat(res.data).filter(function (data) {
      return data.name !== MESSAGE_CONFIG.from;
    });
  });
};

var optionsHandler = function optionsHandler() {
  var contact = document.querySelector(".options-container .options .contact ul");
  contact.innerHTML = "";
  renderParticipants(contact);
  chooseParticipant(contact.querySelectorAll("li"));
  chooseVisibility();
};

var toggleOptions = function toggleOptions() {
  var background = document.querySelector(".bg");
  var btn = document.querySelector(".side-bar-btn");

  btn.onclick = function (e) {
    document.querySelector(".options-container").classList.toggle("hide");
    optionsHandler();
  };

  background.onclick = function (e) {
    document.querySelector(".options-container").classList.toggle("hide");
  };
};