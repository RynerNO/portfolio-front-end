<template lang="pug">
div(class="w-full h-full flex flex-col")
    div(class="pages-sidebar flex flex-col pt-3 w-full")
        h1(class="text-white ml-2")  {{ $ml.get('preview').currentPage }}
        ul(class="text-white self-center w-full mt-3 pagesNav")
          li(class="cursor-pointer hover:bg-gray-800 w-full text-center") About
          li(class="cursor-pointer hover:bg-gray-800 w-full text-center") Search
          li(class="cursor-pointer hover:bg-gray-800 w-full text-center") Test
          li(class="cursor-pointer hover:bg-gray-800 w-full text-center") About
          li(class="cursor-pointer hover:bg-gray-800 w-full text-center") Search
          li(class="cursor-pointer hover:bg-gray-800 w-full text-center") Test
          li(class="cursor-pointer hover:bg-gray-800 w-full text-center") About
          li(class="cursor-pointer hover:bg-gray-800 w-full text-center") Search
          li(class="cursor-pointer hover:bg-gray-800 w-full text-center") Test
        button(class="pt-1 pb-1 w-full focus:outline-none" @click="togglePagesNav")
          font-awesome(:icon=['fas', 'chevron-up'] v-if="pagesNavVisible" class="text-white text-2xl")
          font-awesome(:icon=['fas', 'chevron-down'] v-if="!pagesNavVisible" class="text-white text-2xl")
    div(class="w-full h-full")
        iframe(:src="previewPageLink" class="w-full h-full")
    

</template>

<script>
import anime from 'animejs/lib/anime.es.js';
export default {
  meta: {
    title: 'Preview',
    meta: [
      {name: 'robots', content: 'noindex, nofollow'},
    ]
  },
  data() {
    return {
      pagesNavVisible: false,
    }
  },
  computed: {
	  previewPageLink() {
		  return `https://ruiner.xyz/site_previews/${this.$route.params.id}`
	  }
  },
  methods: {
    togglePagesNav() {
      if(this.pagesNavVisible) {
          anime({
                targets: '.pagesNav',
                maxHeight: ['0px'],
                easing: 'easeInOutQuad',
                duration: 100,
          })
          this.pagesNavVisible = false
      } else {

         anime({
          targets: '.pagesNav',
          maxHeight: '1000px',
          easing: 'easeInOutQuad',
          duration: 100,
          })
          
          this.pagesNavVisible = true

      }
  },

}
}
</script>
<style lang="sass" >
body
    background: none
.pages-sidebar 
    background: #222
.pagesNav
  overflow: hidden
  max-height: 0px
</style>