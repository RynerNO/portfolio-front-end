<template lang="pug">
  section(class="flex items-center justify-center home")
    div(class="absolute right-0 top-0 mr-8 mt-8 z-50 pointer-events-auto flex align-items-center")
      button(class="flex m-1 p-2 text-xs md:text-md md:p-3 text-white rounded-md text-center outline-none capitalize focus:outline-none select-none" v-for="lang in $ml.list" :key="lang" @click="changeLang(lang)" v-text="lang" :class="{ 'bg-gray-700': $ml.current !== lang, 'bg-r-blue': $ml.current === lang }" )
    div(class="z-20 text")
      h3(class="uppercase font-secondary") {{ $ml.get('home').greeting }}
      h1(class="uppercase font-primary flex changing-title") 
        span {{ $ml.get('home').me }}
        div 
          span(class="dynamicTitle overflow-hidden")
            |{{ dynamicTitle }}
      p(class='font-secondary') {{ $ml.get('home').aboutMe}}
      div(class="flex my-5 buttons")
        button(@click="$refs.animateProgress.animateLoadBar('about')" class="mx-2 btn about")
          span
            font-awesome(icon="user" class="mx-2")
            |{{ $ml.get('home').buttons.aboutMe }}
        button(@click="$refs.animateProgress.animateLoadBar('portfolio')" class="mx-2 btn portfolio") 
          span
            font-awesome(icon="briefcase" class="mx-2")
            |{{ $ml.get('home').buttons.projects}}
        
    animatedBackground
    changePage(ref="animateProgress")
    


</template>

<script>

import anime from 'animejs/lib/anime.es.js';

import animatedBackground from '@components/AnimatedBackground.vue';
import changePage from '@components/ChangePage.vue';


export default {
    meta() {
      return {
        title: this.$ml.get('home').meta.title,
      }
      

  },
  data() {
    return {
      dynamicTitle: '',
      interval: null,
      animate: true,
    };
  },
  components: {
    animatedBackground,
    changePage
  },
 
  mounted() {
    this.dynamicTitle = this.$ml.get('home').titles[0]
    this.animateDynamicTitle(anime.timeline())
    this.testRo = () => {
      console.log(this.$route)
    }
  },
  beforeDestroy() {
    this.animate = false
  },
  methods: {
    changeLang(lang) {
      if(lang === this.$ml.current) return
      this.$ml.change(lang)
      const params = (this.$defaultLang === lang) ? {} : {lang: lang}
      this.$router.push({ name: 'home', params: params})
      
      
    },
    animateDynamicTitle(tl) {
        if(!this.animate) return
        tl.add({
              targets: '.dynamicTitle',
              width: ['100%', 0],
              easing: 'easeOutQuad',
              duration: 1500,
              complete: () => {
                  let i = this.$ml.get('home').titles.indexOf(this.dynamicTitle)
                  this.dynamicTitle = (i>=(this.$ml.get('home').titles.length-1)) ? this.$ml.get('home').titles[0] : this.$ml.get('home').titles[i+1]
              }
          })
        tl.add({ 
              targets: '.dynamicTitle',
              width: [0, '100%'],
              easing: 'easeOutQuad',
              duration: 1500,
              endDelay: 400,
          })
        tl.finished.then(()=> {
          if(!this.animate) return
          tl = anime.timeline()
          this.animateDynamicTitle(tl)
          })
          }
      
  }
};
</script>
<style lang="sass" scoped>
@media (max-width: 600px)
  .home
    .text
      margin: 0 auto
      width: 80%

      h3
        font-size: 15px

      h1
        font-size: 22px

        div
          display: flex

      p
        display: none     

@media (min-width: 600px)
  .home
    .text
      h3
        font-size: 19px

      h1
        font-size: 42px

        div
          display: flex

      p
        font-size: 16px

.home
  width: 100vw
  height: 100vh
  .changing-title
    width: 550px
  .text
    max-width: 550px
    color: $primary_text

    h3
      transition: all 0.5s ease

    h1
      transition: all 0.5s ease
      font-weight: 500

      .dynamicTitle
        color: $secondary
        white-space: nowrap
        width: 100%

    .buttons
      .btn
        +btn

      .about
        border: none

      .portfolio
        color: $secondary
        background-color: initial

        &::before
          background-color: $secondary

        &:hover
          color: $primary_text

          &::before
            background-color: $secondary
            width: 180%
    @media (max-width: 600px)
       .buttons
        display: flex
        flex-wrap: wrap
        .btn
          font-size: 14px
          margin-top: 15px
          width: 90%
          @media (max-width: 320px)
            padding-right: 0px
            padding-left: 0px
        justify-content: center

        .about
          border: none
</style>