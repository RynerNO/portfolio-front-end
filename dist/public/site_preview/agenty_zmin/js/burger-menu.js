const burger_button = document.querySelector('.burger-button_click')
burger_button.addEventListener('click', show_burgermenu, false)

function show_burgermenu() {
    const nav_menu = document.querySelector('.header__nav-burger')
    const first_block_image = document.querySelector('.first-block__image')
    if (burger_button.classList.contains('burger-button_active')) {
        burger_button.classList.remove('burger-button_active')
        nav_menu.classList.remove('header__nav-burger_active')
        first_block_image.classList.remove('first-block__image_hidden')
    } else {
        burger_button.classList.add('burger-button_active')
        nav_menu.classList.add('header__nav-burger_active')
        first_block_image.classList.add('first-block__image_hidden')
    }


}


