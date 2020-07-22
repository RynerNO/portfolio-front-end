<template lang="pug">
div(class='changePage pointer-events-none')
  div(class='pageLoadBar')
  nav(class="flex flex-col topNav" )
    button(class="pointer-events-auto navButton" @click='navOpen = !navOpen' :class="{navButtonActive : navOpen}")
      span
    ul(class="flex flex-col uppercase cursor-pointer" :class="{ ulShow: navOpen   }")
      li(:class="currentPage  === 'home' ? 'active' : ''" @click.once="animateLoadBar('home')")
        a
          font-awesome(icon="home")
          span {{ $ml.get('home').meta.title }}
          
      li(:class="currentPage  === 'about' ? 'active' : ''" @click.once="animateLoadBar('about')")
        a
          font-awesome(icon="user" )
          span {{ $ml.get('about').meta.title }}
        li(:class="currentPage  === 'portfolio' ? 'active' : ''" @click.once="animateLoadBar('portfolio')") 	
          a
            font-awesome(icon="briefcase")
            span {{ $ml.get('portfolio').meta.title }}
        li(:class='currentPage  === "contact" ? "active" : ""' @click.once="animateLoadBar('contact')") 	
          a
            font-awesome(icon="comments")
            span {{ $ml.get('contact').meta.title }}
    span( class="navBg" :class='navOpen ? "navBgShow" : ""' )
  nav(class="flex flex-col pointer-events-auto topNav" )
    button(@click="navOpen = !navOpen" class="navButton" :class="{navButtonActive: navOpen}")
      span
    span(class="navBg" :class="{ navBgShow: navOpen }")
  div(class="arrowContainer previousPage" :class="{nextPageAnimate:animate }" @click.once='previousPage' v-if='pagePrevious')
    span
      span {{ $ml.get(pagePrevious).meta.title }}
  div(class="arrowContainer nextPage" :class="{ nextPageAnimate: animate }" @click.once='nextPage' v-if='pageNext')
    span
      span {{ $ml.get(pageNext).meta.title }}


</template>

<script>
  import anime from 'animejs/lib/anime.es.js';
  export default {

    data: () => {
      return {
        animate: false,
        pages: ['home', 'about', 'portfolio', 'contact'],
        navOpen: false,
      }
    },
    computed: {
      currentPage() {
        const index = this.$route.path === '/' ? 0 : this.pages.indexOf(this.$route.path.replace(/\//g, '').replace(this.$route.params.lang, ''));
        return this.pages[index]
      },
      pagePrevious() {
        const index = this.pages.indexOf(this.$route.path.replace(/\//g, '').replace(this.$route.params.lang, ''));
        if (index !== -1 && index !== 0) {
          return this.pages[index - 1]
        } else {
          return false;
        }
      },
      pageNext() {
        const index = this.$route.path === '/' ? 0 : this.pages.indexOf(this.$route.path.replace(/\//g, '').replace(this.$route.params.lang, ''));
        if (index !== -1 && index !== this.pages.length - 1) {
          return this.pages[index + 1]
        } else {
          return false;
        }
      }
    },
    methods: {
      animateLoadBar(route) {
        if(route === this.currentPage) {
          return;
          }
        anime({
          targets: '.pageLoadBar',
          width: '100%',
          easing: 'easeInOutQuad',
          duration: 300,
          complete: () => {
            this.$router.push(`/${this.$ml.current}/${route}`)
            this.animate = false;
            anime({
              targets: '.pageLoadBar',
              width: '0%',
              easing: 'easeInOutQuad',
              duration: 0,
            })
          }
        })
      },
      animatePageChangeArrows() {
        this.animate = !this.animate;
        anime({
          targets: '.nextPage',
          translateX: 250,
          opacity: 0,
          easing: 'easeInOutQuad',
          delay: 300,
          duration: 100
        })
        anime({
          targets: '.previousPage',
          translateX: -250,
          opacity: 0,
          easing: 'easeInOutQuad',
          delay: 300,
          duration: 100
        })
      },
      nextPage() {
        if(!this.pageNext) return;
        this.animatePageChangeArrows()
        this.animateLoadBar(this.pageNext)

      },
      previousPage() {
        if(!this.pagePrevious) return;
        this.animatePageChangeArrows()
        this.animateLoadBar(this.pagePrevious)

      },
    },
  }
</script>

<style lang="sass" scoped>
.changePage
  @apply fixed
  pointer-events: none
  width: 100%
  height: 100%
  z-index: 15
  top: 0
  left: 0

  .topNav
    position: fixed
    top: 15px
    left: 15px

    .navButton
      width: 50px
      height: 50px
      outline: none
      z-index: 2

      span
        position: absolute
        top: 24px
        left: 17px
        width: 16px
        height: 2px
        background: $primary_text

        &::before
          content: ''
          position: absolute
          top: -6px
          left: 0
          width: 16px
          height: 2px
          background: $primary_text
          transition: transform .2s ease-in-out

        &::after
          content: ''
          position: absolute
          left: 0
          top: 6px
          width: 16px
          height: 2px
          background: $primary_text
          transition: transform .2s ease-in-out

    .navButtonActive
      span
        background: transparent
        transition: background .3s ease-in-out

        &::after
          transform: rotate(45deg)
          top: 0
          transition: transform .2s ease-in-out

        &::before
          transform: rotate(-45deg)
          top: 0
          transition: transform .2s ease-in-out

    .navBg
      background: #333
      position: absolute
      left: 0
      top: 0
      width: 50px
      height: 50px
      border-radius: 43px
      transition: height .3s ease-in-out
      outline: none

      &.navBgShow
        height: 100%
        transition: height .3s ease-in-out

    ul
      z-index: 2
      padding-top: 0
      opacity: 0

      &.ulShow
        height: auto
        opacity: 1
        transition: opacity 0.5s ease-in-out
        padding-top: 6px
        pointer-events: auto

        a
          span
            animation: slideIn 0.55s backwards
            transform: translateX(0)
            transition: transform 0.2s
            width: 50px
            opacity: 1
            display: none
            white-space: nowrap
            @media (min-width: 1024px)
              display: initial

        .active
          a
            &::before
              transform: scaleY(1)
              transition: transform 0.7s ease-in-out

      li
        a
          display: flex
          color: rgba(255, 255, 255, 0.9)
          cursor: pointer
          justify-content: center
          padding-top: 12px
          padding-bottom: 12px
          position: relative

          @media (min-width: 1024px)
            padding-left: 70px

          svg
            opacity: .6

            @media (min-width: 1024px)
              position: absolute
              left: 16px

          span
            opacity: 0
            transform: translateX(-25px)
            display: block

          &:hover
            color: $secondary
            transition: all 0.15s ease-in-out

            svg
              opacity: 1

          &::before
            content: ''
            width: 5px
            height: 24px
            background: $secondary
            position: absolute
            left: 0
            top: 8px
            transform: scaleY(0)

            @media (min-width: 1024px)
              left: 45px

      .active
        a
          color: $secondary

          svg
            opacity: 1

  .pageLoadBar
    position: fixed
    top: 0
    height: 3px
    width: 0
    background: $secondary

    @apply z-10

  .arrowContainer
    @apply absolute

    @apply cursor-pointer

    @apply pointer-events-auto

    width: 3.5rem
    height: 3.5rem
    right: 0
    top: 50vh
    display: none

    @media (min-width: 1024px)
      display: flex

    span
      @apply block

      @apply absolute

      top: 20%
      right: 55%
      width: 8.8rem
      height: 3rem
      overflow: hidden

      span
        @apply invisible

        @apply uppercase

        @apply absolute

        @apply font-semibold

        @apply text-xl

        @apply text-right

        right: 0
        top: 0
        transform: translateX(60px)
        transition: transform .3s ease-in-out
        color: $primary_text

    &::before
      content: ''

      +arrow

      transform: rotateZ(140deg) translateX(25px)
      top: 39.14%

    &::after
      content: ''

      +arrow

      transform: rotateZ(220deg) translateX(25px)
      top: 40.7%

    &:hover
      span
        span
          @apply visible

          transform: translateX(-15px)
          transition: transform .3s ease-in-out
          color: $secondary

      &::before
        transform: rotateZ(130deg) translateX(25px)
        background-color: $secondary

      &::after
        transform: rotateZ(230deg) translateX(25px)
        background-color: $secondary

      @apply visible

    &.nextPageAnimate
      span
        span
          transition: transform 0.1s linear
          transform: translateX(118px)

      &::before
        transform: rotateZ(180deg) translateX(25px)
        background-color: $secondary

      &::after
        transform: rotateZ(180deg) translateX(25px)
        background-color: $secondary

  .nextPage
    //just for anime.js
    z-index: 5

  .previousPage
    left: 0

    span
      left: 71%
      overflow: hidden

      span
        @apply text-left

        transform: translateX(-70px)
        left: 0

    &::before
      transform: rotateZ(40deg) translateX(25px)

    &::after
      transform: rotateZ(320deg) translateX(25px)

    &:hover
      span
        span
          transform: translateX(3px)

      &::before
        transform: rotateZ(50deg) translateX(25px)

      &::after
        transform: rotateZ(310deg) translateX(25px)

    &.nextPageAnimate
      span
        span
          transition: transform 0.1s linear
          transform: translateX(-118px)

      &::before
        transform: rotateZ(0deg) translateX(25px)
        background-color: $secondary

      &::after
        transform: rotateZ(360deg) translateX(25px)
        background-color: $secondary

@keyframes slideIn
  from
    opacity: 0
    -webkit-transform: translateX(-25px)
    -moz-transform: translateX(-25px)
    -ms-transform: translateX(-25px)
    -o-transform: translateX(-25px)
    transform: translateX(-25px)

  to
    opacity: 1
    -webkit-transform: translateX(0)
    -moz-transform: translateX(0)
    -ms-transform: translateX(0)
    -o-transform: translateX(0)
    transform: translateX(0)

</style>