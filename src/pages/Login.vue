<template lang="pug">
  div(class="w-screen h-screen flex justify-center items-center")
    div
      ValidationObserver(ref="form" v-slot="{ handleSubmit }")
        form(class="flex flex-col"  @submit.prevent="handleSubmit(login)")
          ValidationProvider(name="Username" rules="required" v-slot="{errors}")
           input(type="text" placeholder='Username' v-model="username" class="border-2 border-gray-400 rounded-lg p-2 my-2 outline-none focus:border-2 focus:border-indigo-400 w-full")
           p(class='text-red-600 text-lg w-full') {{ errors[0] }}
          ValidationProvider(name="Password" rules="required" v-slot="{errors}")
           input(type="password" placeholder='Password' v-model="password" class="focus:border-2 focus:border-indigo-400 border-2 border-gray-400  rounded-lg p-2 my-2 outline-none w-full")
           p(class='text-red-600 text-lg w-full') {{ errors[0] }}
          vue-recaptcha( ref="recaptcha" class="px-6 py-2" sitekey="6LdJzkcaAAAAAGmQLWSHJaDjIARXCNQVBlI9kQQb" :loadRecaptchaScript="true" @verify="setToken($event)" @expired="unsetToken()")
          button(type="submit" class="opacity-75 hover:opacity-100 bg-blue-600 rounded-lg py-4 px-16 my-2") Sign In
</template>

<script>
import {
  ValidationProvider,
  extend,
  ValidationObserver,
  localize
} from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import ru from 'vee-validate/dist/locale/ru.json';
import VueRecaptcha from 'vue-recaptcha'
extend('required', required);

localize('ru', ru);
import { POST_LOGIN, SET_AUTH} from '@store/auth/actions'
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    VueRecaptcha
  },
  meta: {
      title: 'Login',
      meta: [
        { name: 'robots', content: 'noindex, nofollow'  },
      ]
    },
  data: () => { 
    return {
        username: '',
        password: '',
        token: '',
        failCaptcha: true
    }

     },
    methods: {
          unsetToken() {
          this.token = '';
          this.failCaptcha = true
        },
        setToken(event) {
          this.token = event;
          this.failCaptcha = false;
        },
        setAuth: function (payload) {
            this.$store.commit(SET_AUTH, payload)
            localStorage.setItem('auth', JSON.stringify(payload))
            this.$router.push('/admin')
            
         
        },
      login() {
      this.$store.dispatch(POST_LOGIN, {
        username: this.username,
        password: this.password,
        token: this.token
      }).then( response =>{
          this.setAuth(response.data)
      }).catch(error => {
        if(!error) return
        Object.keys(error.data).forEach(field => {
          this.$refs.form.setErrors({
           email: error.response.data[field]
          }
          )
        })
      })
      },
    }
  }

</script>

<style lang="sass" scoped>
body 
  background-color:#FFFFFF

</style>