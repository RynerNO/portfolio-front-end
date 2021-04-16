<template lang="pug">
div(class="w-full h-full flex flex-col")
    div(class="pages-sidebar flex flex-col pt-3 w-full")
        div(class="flex")
          h1(class="text-white ml-2 text-xl")  {{ $ml.get('preview').currentPage }}
            span(class="text-white ml-2") {{ currentPage.name }}
          div(class="flex change-viewport ml-auto")
            font-awesome(
              :icon="['fas', 'tv']" 
              class="text-white text-2xl cursor-pointer hover:text-gray-600" 
              :class="{ 'text-gray-600' :  viewport == 'desktop'}"
              @click="viewport = 'desktop'"
              )

            font-awesome(
              :icon="['fas', 'tablet-alt']" 
            class="text-white text-2xl ml-3 cursor-pointer hover:text-gray-600" 
            :class="{ 'text-gray-600' :  viewport == 'tablet'}"
            @click="viewport = 'tablet'"
            )

            font-awesome(
              :icon="['fas', 'mobile']" 
              class="text-white text-2xl ml-3 mr-3 cursor-pointer hover:text-gray-600" 
              :class="{ 'text-gray-600' :  viewport == 'mobile'}"
              @click="viewport = 'mobile'"
              )

        ul(class="text-white self-center w-full mt-3 pagesNav")
          li(
          class="cursor-pointer hover:bg-gray-800 w-full text-center capitalize text-xl" 
          v-for="page in project.pages" 
          :key="page.name"
          :class="{ 'bg-gray-800': currentPage.name === page.name}"
          @click.prevent="currentPage = page"
          ) {{ page.name }}

        button(class="pt-1 pb-1 w-full focus:outline-none" @click="togglePagesNav")
          font-awesome(:icon=['fas', 'chevron-up'] v-if="pagesNavVisible" class="text-white text-2xl")
          font-awesome(:icon=['fas', 'chevron-down'] v-if="!pagesNavVisible" class="text-white text-2xl")
    div(class="w-full h-full bg-gray-600")
        iframe(:src="currentPage.link" class="w-full h-full bg-white" :class="`viewport-${viewport}`")
    

</template>

<script>
import anime from 'animejs/lib/anime.es.js';
import axios from 'axios';
import config from '@config'
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
      project: {},
      currentPage: {

      },
      viewport: "desktop"
    }
  },
  computed: {
  },
  created() {
    axios.post(`${config.API_ROUTE}/projects/get`, {
        projectID: this.$route.params.id
      
    }).then(response => {
      this.project = response.data.project
      this.currentPage = this.project.pages[0]
    })
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
iframe
  margin: 0 auto
.viewport-mobile
  width: 480px
.viewport-tablet
  width: 768px
.viewport-desktop
  width: 100%

@media (max-width: 768px)
  .change-viewport
    display: none
</style>