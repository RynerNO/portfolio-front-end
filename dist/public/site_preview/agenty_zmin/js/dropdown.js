const dropdown_button = document.querySelector('.projects-dropdown-button')
const dropdown_items = document.querySelectorAll('.projects-dropdown__item')
for(let i=0; i<dropdown_items.length; i++) {
    dropdown_items[i].addEventListener('click', select_dropdown, false)
}
dropdown_button.addEventListener('click', show_dropdown, false);
dropdown_button.addEventListener('click', logc, false);
function logc() {
    console.log(this)
}
function show_dropdown() {
    const dropdown_menu = document.querySelector('.projects-dropdown-list')
    if (dropdown_menu.classList.contains('projects-dropdown-list_active')) {
        dropdown_menu.classList.remove('projects-dropdown-list_active')
        dropdown_button.classList.remove('projects-dropdown-button_active')
    } else {
        dropdown_menu.classList.add('projects-dropdown-list_active')
        dropdown_button.classList.add('projects-dropdown-button_active')
    }
}
function select_dropdown() {
    dropdown_button.innerHTML = this.innerHTML;
    this.classList.add('projects-dropdown__item_selected')
    show_dropdown()
    for(let i=0; i<dropdown_items.length; i++) {
        if(dropdown_items[i] === this) {
            continue;
        } else {
            dropdown_items[i].classList.remove('projects-dropdown__item_selected')
        }
    }
}