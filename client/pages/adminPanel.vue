<template lang="pug">
  div(:class="$style.adminPanelContainer")
    header(:class="$style.mainHeader")
      nav(:class="$style.leftNavContainer")
        span(:class="$style.burgerButton")
          svg(viewBox="0 -53 384 384" xmlns="http://www.w3.org/2000/svg"  fill="#424770")
            path(d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0")
            path(d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0")
            path(d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0")
        span(:class="$style.searchButton")
          svg(version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.005 512.005" style="enable-background:new 0 0 512.005 512.005;" xml:space="preserve"  fill="#424770")
            g
              path(d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667 S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6 c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z")
      nav(:class="$style.rightNavContainer")
        button(:class="$style.darkButton") Some Button
        span(:class="$style.notificationButton")
          i(:class="$style.notificationIndicator")
          svg(xmlns='http://www.w3.org/2000/svg' viewBox="0 0 512 512")
            g
              path(d='m450.201 407.453c-1.505-.977-12.832-8.912-24.174-32.917-20.829-44.082-25.201-106.18-25.201-150.511 0-.193-.004-.384-.011-.576-.227-58.589-35.31-109.095-85.514-131.756v-34.657c0-31.45-25.544-57.036-56.942-57.036h-4.719c-31.398 0-56.942 25.586-56.942 57.036v34.655c-50.372 22.734-85.525 73.498-85.525 132.334 0 44.331-4.372 106.428-25.201 150.511-11.341 24.004-22.668 31.939-24.174 32.917-6.342 2.935-9.469 9.715-8.01 16.586 1.473 6.939 7.959 11.723 15.042 11.723h109.947c.614 42.141 35.008 76.238 77.223 76.238s76.609-34.097 77.223-76.238h109.947c7.082 0 13.569-4.784 15.042-11.723 1.457-6.871-1.669-13.652-8.011-16.586zm-223.502-350.417c0-14.881 12.086-26.987 26.942-26.987h4.719c14.856 0 26.942 12.106 26.942 26.987v24.917c-9.468-1.957-19.269-2.987-29.306-2.987-10.034 0-19.832 1.029-29.296 2.984v-24.914zm29.301 424.915c-25.673 0-46.614-20.617-47.223-46.188h94.445c-.608 25.57-21.549 46.188-47.222 46.188zm60.4-76.239c-.003 0-213.385 0-213.385 0 2.595-4.044 5.236-8.623 7.861-13.798 20.104-39.643 30.298-96.129 30.298-167.889 0-63.417 51.509-115.01 114.821-115.01s114.821 51.593 114.821 115.06c0 .185.003.369.01.553.057 71.472 10.25 127.755 30.298 167.286 2.625 5.176 5.267 9.754 7.861 13.798z' fill='#424770')
        div(:class="$style.userContainer")
          div(:class="$style.avatarContainer")
            img(src="https://hb.bizmrg.com/esports-core-media/d9/d946526f832afd933d98fee06b4f7985.png")
          i(:class="$style.statusIcon")
          i(:class="$style.dropdownIcon")
    aside
    section
    component(v-bind:is='currentComponent' :auth="auth")


</template>
<script>
import portfolioProjects from '@components/adminPanel/portfolioProjects.vue';
import { mapState } from 'vuex';
export default {
   computed: {
        ...mapState({
            auth: state => state.auth,
        }),

    },
  components: {
    portfolioProjects

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
      currentComponent: 'portfolioProjects'
    }
  }
}
</script>
<style lang="scss" module>
@import url('https://fonts.googleapis.com/css?family=Hind+Vadodara:500&display=swap');
$danger: #f2545b;
$success: #3ecf8e;
@mixin button {
  font-size: .9rem;
  font-weight: 500;
  padding: .375rem .75rem;
  user-select: none;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  border-radius: .25rem;
  background-color: transparent;
  color: #fff; 
  font-family: 'Hind Vadodara', sans-serif;
}
.darkButton {
  @include button;
  border-color: #32325d;
  background-color: #32325d;
  &:hover {
    color: #fff;
    border-color: #20203c;
    background-color: #252544;
  }
}
  .adminPanelContainer {
    display: grid;

  } 
body { 
  background-color: #e3e8ee;
}
  // header
  .mainHeader {
    background: #FFFFFF;
    height: 65px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    .leftNavContainer {
        display: flex;
        align-items: center;
        .burgerButton {
          display: block;
          width: 18px;
          height: 18px;
          margin-left: 15px;
          cursor: pointer;
      }
        .searchButton {
          width: 20px;
          height: 20px;
          display: block;
          margin-left:35px;
          cursor: pointer;
      }
    }
    .rightNavContainer {
      display: flex;
      align-items: center;
      margin-left: auto;
      .notificationButton {
        width: 24px;
        display: block;
        height: 24px;
        position: relative;
        margin-right: 1rem;
        margin-left: 1rem;
        cursor: pointer;
        .notificationIndicator {
            width:9px;
            height: 9px;
            border-radius:9999px;
            position: absolute;
            top: 0;
            right:0;
            background: $danger;
          }  
        }
      .userContainer {
        margin-right: 30px;
        position: relative;
        .avatarContainer {
          width: 50px;
          height: 46px;
          border-radius: 9999px;
          overflow: hidden;
        }
        .statusIcon {
          width:10px;
          height: 10px;
          position: absolute;
          background: #fff;
          border-radius:9999px;
          right: 5px;
          bottom: 1px;
          display: flex;
          justify-content: center;
          align-items: center;
          &::before {
            content: " ";
            width:6px;
            height:6px;
            border-radius:9999px;
            background-color: $success;
            
          }
        }
        .dropdownIcon {
            position: absolute;
            left: 53px;
            top: 23px;
            display: inline-block;
            margin-left: .255em;
            border-top: .3em solid;
            border-right: .3em solid transparent;
            border-bottom: 0;
            border-left: .3em solid transparent;
        }
      }
      }
    }
    
  
  
// *********************************
 </style>