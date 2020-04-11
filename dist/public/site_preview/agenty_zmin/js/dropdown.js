"use strict";

var dropdown_button = document.querySelector('.projects-dropdown-button');
var dropdown_items = document.querySelectorAll('.projects-dropdown__item');

for (var i = 0; i < dropdown_items.length; i++) {
  dropdown_items[i].addEventListener('click', select_dropdown, false);
}

dropdown_button.addEventListener('click', show_dropdown, false);
dropdown_button.addEventListener('click', logc, false);

function logc() {
  console.log(this);
}

function show_dropdown() {
  var dropdown_menu = document.querySelector('.projects-dropdown-list');

  if (dropdown_menu.classList.contains('projects-dropdown-list_active')) {
    dropdown_menu.classList.remove('projects-dropdown-list_active');
    dropdown_button.classList.remove('projects-dropdown-button_active');
  } else {
    dropdown_menu.classList.add('projects-dropdown-list_active');
    dropdown_button.classList.add('projects-dropdown-button_active');
  }
}

function select_dropdown() {
  dropdown_button.innerHTML = this.innerHTML;
  this.classList.add('projects-dropdown__item_selected');
  show_dropdown();

  for (var _i = 0; _i < dropdown_items.length; _i++) {
    if (dropdown_items[_i] === this) {
      continue;
    } else {
      dropdown_items[_i].classList.remove('projects-dropdown__item_selected');
    }
  }
}