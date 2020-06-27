<template lang="pug">
  div(class="adminPanelContainer")
    header(class="mainHeader")
      nav(class="leftNavContainer")
        img(class="burgerButton" :src="BurgerIcon")
        img(class="searchButton" :src="SearchIcon") 
      nav(class="rightNavContainer")
        button(class="darkButton") Some Button
        span(class="notificationButton")
          i(class="notificationIndicator")
          img(:src="NotificationIcon")
        div(class="userContainer")
          div(class="avatarContainer")
            img(src="https://hb.bizmrg.com/esports-core-media/d9/d946526f832afd933d98fee06b4f7985.png")
          i(class="statusIcon")
          i(class="dropdownIcon")
    aside
    section
    component(v-bind:is='currentComponent' :auth="auth")


</template>
<script>
import PortfolioProjects from '@components/AdminPanel/PortfolioProjects.vue';
import { mapState } from 'vuex';
import BurgerIcon from '@assets/burger.svg'
import NotificationIcon from '@assets/notification.svg'
import SearchIcon from '@assets/search.svg'
export default {
   computed: {
        ...mapState({
            auth: state => state.auth,
        }),

    },
  components: {
    PortfolioProjects

  },
  mounted() {
    if(!this.auth.status) {
      this.$router.push('/login')
    }
  },
  data() {
    return {
      showMenu: false,
      pageName: 'test',
      BurgerIcon: BurgerIcon,
      NotificationIcon: NotificationIcon,
      SearchIcon: SearchIcon,
      currentComponent: 'portfolioProjects'
    }
  }
}
</script>
<style lang="sass">
  body
    background-color: #e3e8ee
</style>
<style lang="sass" scoped>
@import url("https://fonts.googleapis.com/css?family=Hind+Vadodara:500&display=swap")

$danger: #f2545b
$success: #3ecf8e

=button
  font-size: .9rem
  font-weight: 500
  padding: .375rem .75rem
  user-select: none
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out
  text-align: center
  vertical-align: middle
  border: 1px solid transparent
  border-radius: .25rem
  background-color: transparent
  color: #fff
  font-family: 'Hind Vadodara', sans-serif

.darkButton
  +button

  border-color: #32325d
  background-color: #32325d

  &:hover
    color: #fff
    border-color: #20203c
    background-color: #252544

.adminPanelContainer
  display: grid



// header
.mainHeader
  background: #FFFFFF
  height: 65px
  position: fixed
  top: 0
  left: 0
  width: 100%
  display: flex
  align-items: center

  .leftNavContainer
    display: flex
    align-items: center

    .burgerButton
      display: block
      width: 18px
      height: 18px
      margin-left: 15px
      cursor: pointer

    .searchButton
      width: 20px
      height: 20px
      display: block
      margin-left: 35px
      cursor: pointer

  .rightNavContainer
    display: flex
    align-items: center
    margin-left: auto

    .notificationButton
      width: 24px
      display: block
      height: 24px
      position: relative
      margin-right: 1rem
      margin-left: 1rem
      cursor: pointer

      .notificationIndicator
        width: 9px
        height: 9px
        border-radius: 9999px
        position: absolute
        top: 0
        right: 0
        background: $danger

    .userContainer
      margin-right: 30px
      position: relative

      .avatarContainer
        width: 50px
        height: 46px
        border-radius: 9999px
        overflow: hidden

      .statusIcon
        width: 10px
        height: 10px
        position: absolute
        background: #fff
        border-radius: 9999px
        right: 5px
        bottom: 1px
        display: flex
        justify-content: center
        align-items: center

        &::before
          content: " "
          width: 6px
          height: 6px
          border-radius: 9999px
          background-color: $success

      .dropdownIcon
        position: absolute
        left: 53px
        top: 23px
        display: inline-block
        margin-left: .255em
        border-top: .3em solid
        border-right: .3em solid transparent
        border-bottom: 0
        border-left: .3em solid transparent

  
// *********************************
 </style>