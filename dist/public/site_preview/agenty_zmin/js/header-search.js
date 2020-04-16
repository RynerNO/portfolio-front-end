const search_button = document.querySelector(".search-button-show");
const search_button_cancel = document.querySelector('.search-button-cancel')
const header_nav = document.querySelector('.header__nav_hidden')
const search_input = document.querySelector('.search-input')
const search_results = document.querySelector('.search-results-container')
const search_button_submit = document.querySelector('.search-button-submit')
search_button.addEventListener('click', show_search, false);
search_button_cancel.addEventListener('click', hide_search, false);
search_input.addEventListener('keypress', show_results, false)
function show_search() {
    if (search_input.classList.contains('search-input_hidden')) {
        header_nav.classList.add('search-item_hidden');
        search_input.classList.remove('search-input_hidden');
        search_button_cancel.classList.remove('search-item_hidden')
        search_button_submit.classList.remove('search-item_hidden')
        search_button.classList.add('search-item_hidden')
    }  
    
}

function hide_search() {
    search_input.classList.add('search-input_hidden');
    header_nav.classList.remove('search-item_hidden');
    search_button_submit.classList.add('search-item_hidden')
    search_button_cancel.classList.add('search-item_hidden')
    search_results.classList.add('search-results_hidden')
    search_button.classList.remove('search-item_hidden')
}

function show_results() {
    if (search_results.classList.contains('search-results_hidden')) {
        search_results.classList.remove('search-results_hidden')
    }
}