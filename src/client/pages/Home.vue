<template lang="pug">
  section(class="flex items-center justify-center home")
    div(class="z-20 text")
      h3(class="uppercase font-secondary") {{ $ml.get('home').greeting }}
      h1(class="uppercase font-primary flex") 
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

import { MLBuilder } from 'vue-multilanguage'

export default {
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
  created() {
    this.$ml.change('ru')
  },
  mounted() {
    this.dynamicTitle = this.$ml.get('home').titles[0]
    this.animateDynamicTitle(anime.timeline())
    
  },
  beforeDestroy() {
    this.animate = false
  },
  methods: {
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

    .buttons
      .btn
        font-size: 14px

      justify-content: center

      .about
        border: none

      .portfolio
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

</style>