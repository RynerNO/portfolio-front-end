<template lang="pug">
  section
    div(class="mx-auto" class="container")
      div(class="grid grid-cols-3")
        div(class="col-span-3" class="title")
          h2 {{ $ml.get('contact').title[0] }} &nbsp;
            span {{ $ml.get('contact').title[1] }}
          p(lang="en") I’m always open to discussing work.
        div(class="flex" class="contactsContainer")
          div(class="my-2")
            p 
              font-awesome(icon='envelope')
              |Email
            h6 ryner.no@gmail.com
          div(class="my-2")
            p 
              font-awesome(:icon=['fab', 'skype'])
              |Skype
            h6 live:ryner.no
          div(class="my-2")
            p 
              font-awesome(:icon=['fab', 'github'])
              |Github
            h6 
              a(href="https://github.com/RynerNO") RynerNO
        div(class="formContainer")
          p {{ $ml.get('contact').description }} 
          div
            ValidationObserver(v-slot="{ invalid, reset}" ref="observer")
              form 
                div(class="w-full flex flex-wrap justify-center" class="topInputs" )
                  div(class="inputContainer")
                    ValidationProvider(name="Name" rules="required" v-slot="{errors}")
                      font-awesome(icon='user')
                      input(:placeholder="$ml.get('contact').placeholders.name" type="text" v-model="message.name")
                      span(class='px-2 text-red-600 text-lg w-full') {{ errors[0] }}
                  div(class="inputContainer")
                    ValidationProvider(name="Email" rules="required|email" v-slot="{errors}")
                      font-awesome(icon='envelope')
                      input(:placeholder="$ml.get('contact').placeholders.email" type="email" v-model="message.email")
                      span(class='px-2 text-red-600 text-lg w-full') {{ errors[0] }}
                div(class="inputContainer" class="w-full")
                  ValidationProvider(name="Message" rules="required" v-slot="{errors}")
                    font-awesome(icon='comments')
                    textarea(:placeholder="$ml.get('contact').placeholders.message" v-model="message.text")
                    span(class='px-2 text-red-600 text-lg w-full') {{ errors[0] }}
                div(class="w-full")
                  span(v-if="messageSendSuccess" class="px-12 text-green-600") Message Sent
                  span(v-if="messageSendError" class="px-12 text-red-600") Error
                vue-recaptcha( ref="recaptcha" class="px-6 py-2" sitekey="6LcBvXkUAAAAAAKYtJBXQtBQHwOUiG_rq3nOxsFi" :loadRecaptchaScript="true" @verify="setToken($event)" @expired="unsetToken()")
                button(class="button" :disabled="(invalid||failCaptcha)" @click.prevent="sendMessage") 
                  span 
                    font-awesome(icon='paper-plane')
                    |{{ $ml.get('contact').buttons.sendMessage }}
    changePage
</template>

<script>
import {
  ValidationProvider,
  extend,
  ValidationObserver,
  localize
} from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';


extend('required', required);
extend('email', email);

localize({
  en: {
    messages: {
      required: 'this field is required',
      email: 'email is not valid'
    }
  }
});
import changePage from '@components/ChangePage.vue';
import axios from '@utils/axios'
import VueRecaptcha from 'vue-recaptcha'
export default {
  components: {
    changePage, 
    VueRecaptcha,
     ValidationProvider,
  ValidationObserver,
  },
  meta() {
    return {
      title: this.$ml.get('contact').meta.title,
    }
  },
  data() {
    return {
      message: {
        name: '',
        email: '',
        text: '',
        token: ''
      },
      messageSendSuccess: false,
      messageSendError: false,
      failCaptcha: true
    }
  },
  methods: {
    unsetToken() {
      this.message.token = '',
      this.failCaptcha = true;
    },
    setToken(event) {
      this.message.token = event;
      this.failCaptcha = false;
    },
    sendMessage(token) {
      axios.post('mail/send', this.message).then(response => {
        this.$refs.observer.reset()
        this.message.name = '';
        this.message.email = '';
        this.message.text = '';
        this.messageSendSuccess = true;
        this.token = '';
        this.failCaptcha = true;
        this.$refs.recaptcha.reset()
        setTimeout(()=> {
          this.messageSendSuccess = false;
        }, 5000)
      }).catch(error => {
        this.messageSendError = true;
        this.message.name = '';
        this.message.email = '';
        this.message.text = '';
        this.token = '';
        this.failCaptcha = true;
        this.$refs.recaptcha.reset()
        setTimeout(()=> {
          this.messageSendError = false;
        }, 5000)
        
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  +container

.title
  +title

.contactsContainer
  color: $primary_text

  @apply flex-col

  grid-column: span 3 / span 3
  justify-content: flex-start
  transition: all 0.5s ease-in-out

  div
    width: 155px
    display: flex

    @apply flex-col

    p
      margin-right: 15px

  @media (min-width: 800px)
    grid-column: span 1 / span 1
    align-items: flex-end
    margin-right: 50px
    justify-content: flex-start

    @apply flex-col

    div
      display: initial

      p
        margin-right: 0

  p
    font-weight: 400

    @apply font-secondary

    margin-bottom: 10px

    svg
      color: $secondary
      margin-right: 15px

  h6
    @apply font-secondary

    font-weight: 500
    width: 100%

.formContainer
  color: $primary_text
  grid-column: span 3 / span 3

  @media (min-width: 800px)
    grid-column: span 2 / span 2

  p
    font-weight: 400

    @apply font-secondary

    margin: 0 0 24px
    color: #eee
    text-align: left

  .topInputs
    @media (min-width: 800px)
      margin-bottom: 30px

    div
      width: 100%
      margin-bottom: 30px

  .inputContainer
    position: relative
    padding: 0 15px

    input
      height: 46px

    input, textarea
      width: 100%
      border: 1px solid #444
      background: #333
      border-radius: 30px
      outline: none

      @apply font-secondary

      padding: .375rem .75rem
      padding-left: 49px
      font-size: 14px

      @apply font-secondary

      transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out

    textarea
      line-height: 1.5
      height: 130px

    input::placeholder, textarea::placeholder
      color: #6c757d
      text-transform: uppercase

    svg
      position: absolute
      left: 35px
      top: 15px
      color: #6c757d

  .button
    +btn

    margin: 0 15px
    margin-top: 2rem
    border: none

    &:disabled
      background: #555
      cursor: default

    svg
      margin-right: 10px

</style>