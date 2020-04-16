
const form__button = document.querySelector('.third-block__button');
const form__button_cancel = document.querySelector('.third-block__form__button-cancel')
const form__button_submit = document.querySelector('.third-block__form__button')
form__button_submit.addEventListener('click', show_form_success, false)
form__button_cancel.addEventListener('click', show_form, false)
form__button.addEventListener('click', show_form, false)

function show_form() {
    const form_background = document.querySelector('.third-block__form_background')
    const form = document.querySelector('.third-block__form-container')
    if (form.classList.contains('third-block__form-container_acive')) {
        form.classList.remove('third-block__form-container_acive')
        form_background.classList.remove('third-block__form_background_active')
    } else {
        form_background.classList.add('third-block__form_background_active')
        form.classList.add('third-block__form-container_acive')
    }
}
function show_form_success() {
    const form = document.querySelector('.third-block__form-block')
    const form_success = document.querySelector('.third-block__form-success')
    const form_background = document.querySelector('.third-block__form_background')
    if (form_success.classList.contains('third-block__form_hidden')) {
        form_success.classList.remove('third-block__form_hidden')
        form.classList.add('third-block__form_hidden')
        form_background.classList.add('third-block__form_background_active')
        setTimeout(() => {
            
            const main_form = document.querySelector('.third-block__form-container')
            main_form.classList.remove('third-block__form-container_acive')
            form_success.classList.add('third-block__form_hidden')
            form.classList.remove('third-block__form_hidden')
            form_background.classList.remove('third-block__form_background_active')
        }, 3000)
    } 
}
const name_input = document.querySelector('.third-block__form__input-name')
const email_input = document.querySelector('.third-block__form__input-email')
const number_input = document.querySelector('.third-block__form__input-number')
const message_input = document.querySelector('.third-block__form__input-message')
name_input.addEventListener('change', validate_name, false)
email_input.addEventListener('change', validate_email, false)
number_input.addEventListener('change', validate_number, false)
message_input.addEventListener('change', validate_message, false)
function validate_name() {
    let rules = {
        required: true,
        alphaNumeric: false,
        alpha: true
    };
    let result = approve.value(name_input.value, rules);
    if (result.approved) {
        name_input.classList.remove('third-block__form__input_error')
        name_input.classList.add('third-block__form__input_success')
    } else {
        name_input.classList.remove('third-block__form__input_success')
        name_input.classList.add('third-block__form__input_error')
    }
}
function validate_email() {
    let rules = {
        required: true,
        email: true
    };
    let result = approve.value(email_input.value, rules);
    if (result.approved) {
        email_input.classList.remove('third-block__form__input_error')
        email_input.classList.add('third-block__form__input_success')
    } else {
        email_input.classList.remove('third-block__form__input_success')
        email_input.classList.add('third-block__form__input_error')
    }
}
function validate_number() {
    let rules = {
        numeric: true,
        alphaNumeric: false
    };
    let result = approve.value(number_input.value, rules);
    if (result.approved) {
        number_input.classList.remove('third-block__form__input_error')
        number_input.classList.add('third-block__form__input_success')
    } else {
        number_input.classList.remove('third-block__form__input_success')
        number_input.classList.add('third-block__form__input_error')
    }
}
function validate_message() {
    let rules = {
        required: true
    };
    let result = approve.value(message_input.value, rules);
    console.log(result)
    if (result.approved) {
        message_input.classList.remove('third-block__form__input_error')
        message_input.classList.add('third-block__form__input_success')
    } else {
        message_input.classList.remove('third-block__form__input_success')
        message_input.classList.add('third-block__form__input_error')
    }
}
