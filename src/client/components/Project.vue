<template lang="pug">
        div( class="project" @click="$emit('click', props )")
          div(class="project__bar")
            h2 {{ name }}
            i
          div(class="project__content")
            img(:src="`${linkComputed}/poster.webp`")
            picture
              source(:srcset="`${linkComputed}.webp`" type="image/webp")
              img(:src="`${linkComputed}.png`" alt="insert alt text here")
            

            div(class="project__hover")
              div(class="project__bg")
              span(class="project__view-more-btn" )
                span {{ btnText }}
</template>
<script>

export default {
  props: {
    name: {
      type: String,
      required: true
      },
    description: {
      type: String,
      required: false
    },
    tech: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    link: {
      type: String,
      
    },
    btnText: {
      type: String,
      default: 'view more...'
    }
  },
  data() {
    return {
     
    }
  },
  computed: {
    linkComputed() {
      return this.link || `public/${name.title}`
    }
  },

}
</script>
<style lang="sass" scoped>
// page content


.project
  overflow: hidden
  cursor: pointer
  transition: all 0.5s
  img
    width: 100%
    height: auto

  &__bar
    background-color: #ddd
    height: 24px
    color: #6a6a6a
    z-index: 10
    width: 100%
    position: relative
    display: flex
    flex-direction: column
    justify-content: center
    border-radius: 8px 8px 0px 0px

    h2
      font-weight: 600
      font-size: 14px
      color: #8a8a8a
      align-self: center
      font-family: 'Montserrat', sans-serif

    =circle
      height: 12px
      width: 12px
      display: inline-block
      background-color: #ff5f57
      border-radius: 50%
      position: absolute
      top: 6px
      left: 10px

    i
      +circle

      align-self: start

      &::before
        content: " "

        +circle

        left: 16px
        background-color: #ffbd2e
        top: 0

      &::after
        content: " "

        +circle

        left: 32px
        background-color: #28ca41
        top: 0

  &__content
    overflow: hidden
    position: relative
    max-width: 603px
    max-height: 339px
    z-index: 10
    box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.15)
    border-radius: 0px 0px 8px 8px

    @media (min-width: 640px)
      max-width: 415px
      max-height: 233px

    @media (min-width: 1280px)
      max-width: 350px
      max-height: 197px

  &:hover &__hover
      opacity: 1

  &__hover
    @apply flex
    @apply w-full 
    @apply h-full 
    @apply absolute 
    @apply top-0 
    @apply left-0 
    @apply justify-center
    @apply items-center
    @apply opacity-0 
    transition-duration: 0.5s

  &__bg
      position: absolute
      z-index: 2
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: rgba(10, 10, 10, 0.7)
      background-blend-mode: luminosity

  &__view-more-btn
      font-weight: 500
      font-size: 15px

      +btn

      color: $secondary
      background-color: initial
      z-index: 5

      &::before
        background-color: $secondary

      &:hover
        color: $primary_text

        &::before
          background-color: $secondary
          width: 180%

// ************************************************************
</style>