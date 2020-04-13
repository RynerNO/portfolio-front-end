<template lang="pug">
  section
    div(class="mx-auto" :class="$style.container")
      div(class="grid grid-cols-3")
        div(class="col-span-3" :class="$style.title")
          h2 get&nbsp;
            span in touch
          p I’m always open to discussing work.
        div(class="flex" :class="$style.contactsContainer")
          div(class="my-2")
            p 
              font-awesome(icon='envelope')
              |Email
            h6 ***REMOVED***
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
        div(:class="$style.formContainer")
          p If you have any project or job offer, please fill out the form below and I will 
            | reply you shortly. 
          div
            form
              div(class="w-full flex flex-wrap justify-center" :class="$style.topInputs" )
                div(:class="$style.inputContainer")
                  font-awesome(icon='user')
                  input(placeholder="Your name" type="text")
                div(:class="$style.inputContainer")
                  font-awesome(icon='envelope')
                  input(placeholder="Your email" type="email")
              div(:class="$style.inputContainer" class="w-full")
                font-awesome(icon='comments')
                textarea(placeholder="Your message")
              button(:class="$style.button")
                
                span 
                  font-awesome(icon='paper-plane')
                  |send message
    changePage
</template>

<script>
import changePage from '@components/ChangePage.vue';
export default {
  components: {
    changePage
  },
}
</script>

<style lang="scss" module>
  .container {
    @include container;
  }
  .title {
    @include title;
  }
  .contactsContainer {
    color: $primary_text;
    @apply flex-col;
    grid-column: span 3 / span 3;
    justify-content: flex-start;
    transition: all 0.5s ease-in-out;
    div {
      width: 155px;
      display: flex;
      @apply flex-col;
      p {
        margin-right: 15px;
      }
    }
    @media(min-width: 800px) {
       grid-column: span 1 / span 1;
       align-items:flex-end;
       margin-right: 50px;
       justify-content: flex-start;
       @apply flex-col;
        div {
          display: initial;
        p   {
          margin-right: 0;
        }
        }
    }
    p {
      font-weight: 400;
      @apply font-secondary;
      margin-bottom: 10px;
      svg {
        color: $secondary;
        margin-right: 15px;
      }
    }
    h6 {
      @apply font-secondary;
      font-weight: 500;
      width: 100%;
    }
  }
  .formContainer {
    color: $primary_text;
    grid-column: span 3 / span 3;
     @media(min-width: 800px) { 
       grid-column: span 2 / span 2;
     }
    p {
      font-weight: 400;
      @apply font-secondary;
      margin: 0 0 24px;
      color: #eee;
      text-align: left;
    }
    .topInputs {
      @media (min-width: 800px) {
          margin-bottom: 30px;
      }
      div {
        width: 100%;
        margin-bottom: 30px;
      }
    }
    .inputContainer {
      position: relative;
      padding: 0 15px;
      input {
        height: 46px;
      }
      input, textarea {
        width: 100%;
        border: 1px solid #444;
        background: #333;
        border-radius: 30px;
        outline: none;
        @apply font-secondary;
        padding: .375rem .75rem;
        padding-left: 49px;
        font-size: 14px;
        @apply font-secondary;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
      }
      textarea {
        line-height: 1.5;
        height: 130px;
      }
      input::placeholder, textarea::placeholder {
        color: #6c757d;
        text-transform: uppercase;
      }
      svg {
        position: absolute;
        left: 35px;
        top: 15px;
        color: #6c757d;
      }
     
    }
     .button {
        @include btn;
        margin: 0 15px;
        margin-top: 2rem;
        border: none;
        svg {
          margin-right: 10px;
        }
      }
  }
</style>