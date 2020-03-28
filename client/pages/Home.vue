<template>
  <div class="home">
    <div class="home_text z-20 cursor-default">
        <h1>
          <span v-SplitText class="text-container">Hello, I'am </span><span class="text-pink text-container" v-SplitText>huirrwaeaw.</span> <span class="block text-container" v-SplitText>I'm a beginer front-end developer</span>   
        
           </h1>
      <router-link to="/portfolio" 
      class="home_router-link" >
      View my work
      <i class="material-icons px-3">arrow_forward</i></router-link>
    </div>
     <changePage  />
  </div>
</template>

<script>
import changePage from '@components/ChangePage.vue';
import SplitText from '@directives/splitText.js'
import anime from 'animejs/lib/anime.es.js';
export default {
  components: {
  changePage
},
directives: {
 SplitText
},
mounted() {
   anime({ 
                targets: '.home_router-link',
                easing: 'easeOutQuad',
                opacity: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                delay: 700,
                duration: 400,
              })
},
methods: {
  

      
    
  
}
}
</script>
