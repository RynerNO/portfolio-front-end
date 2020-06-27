<template lang="pug">
  section(class="flex items-center justify-center home")
    div(class="z-20 text")
      h3(class="uppercase font-secondary") Hi there!
      h1(class="uppercase font-primary flex") 
        span i'm
        div 
          span(class="dynamicTitle overflow-hidden")
            |{{ dynamicTitle }}
      p(class='font-secondary')
        |I'm a beginner Front-End Developer based in ***REMOVED***, Ukraine. 
        |Professionally connected with the web development industry and information
        |technology for 1 year. 
      div(class="flex my-5 buttons")
        button(@click="$refs.animateProgress.animateLoadBar('about')" class="mx-2 btn about")
          span
            font-awesome(icon="user" class="mx-2")
            |More About Me
        button(@click="$refs.animateProgress.animateLoadBar('portfolio')" class="mx-2 btn portfolio") 
          span
            font-awesome(icon="briefcase" class="mx-2")
            |My Projects
      
    animatedBackground
    changePage(ref="animateProgress")
</template>

<script>

import anime from 'animejs/lib/anime.es.js';
import animatedBackground from '@components/AnimatedBackground.vue';
import changePage from '@components/ChangePage.vue';
export default {
  data() {
    return {
      dynamicTitle: '',
      titles: ['\u00a0Andrey', '\u00a0a beginner developer'],
      interval: null,
      animate: true,
    };
  },
  components: {
    animatedBackground,
    changePage
  },
  mounted() {
    this.dynamicTitle = this.titles[0]
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
                  let i = this.titles.indexOf(this.dynamicTitle)
                  this.dynamicTitle = (i>=(this.titles.length-1)) ? this.titles[0] : this.titles[i+1]
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