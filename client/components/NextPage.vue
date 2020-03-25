<template>
  <div class="text-white nextPage">
      <div class="pageLoadBar  z-10 ">

  </div>
  <!-- <nav class="topNav flex items-center justify-center">
    <ul class="flex justify-center uppercase cursor-pointer">
    <li :class="{ active: page === 'home'}">Home</li>
    <li :class="{ active: page === 'about'}">About</li>
    <li>Potfolio</li>
    <li>Contact</li>
    </ul>
  </nav> -->
  <div class="arrow-container cursor-pointer  z-10 " :class="{changePage: animate}" @click="nextPage">
    <span>
    <span>About</span>
    </span>
  </div>
   
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
export default {
props: {
  page: {
    type: String,
    required: true,
    default: 'home'
  }
},
data: ()=>{
  return {
    animate: false
  }
},
methods: {
  nextPage: function() {
    this.animate = !this.animate;
    setTimeout(() => {
       anime({
          targets: '.arrow-container',
          translateX: 250,
          duration: 500
  })}, 300

    )
    anime({
        targets: '.pageLoadBar',
        width: '100%',
         easing: 'easeInOutQuad',
        duration: 1000
      })
 setTimeout(()=>{
   this.$router.push('/about')
 }, 1000)
  }
}
}
</script>

<style>

</style>