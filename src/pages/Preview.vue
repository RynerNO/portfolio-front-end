<template lang="pug">
div(class="w-full h-full flex flex-col")
    div(class="pages-sidebar flex flex-col pt-3 w-full")
        h1(class="text-white ml-2 text-xl")  {{ $ml.get('preview').currentPage }}
          span(class="text-white ml-2") {{ currentPage.name }}
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
    div(class="w-full h-full")
        iframe(:src="currentPage.link" class="w-full h-full")
    

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

      }
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
</style>