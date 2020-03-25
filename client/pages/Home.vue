<template>
  <div class="home">
    <div class="home_text z-20">
        <h1>
          Hello, I'am <span class="text-pink">huirrwaeaw</span>. <span class="block">I'm a beginer front-end developer</span></h1>
      <router-link to="/portfolio" 
      class="home_router-link" >
      View my work
      <i class="material-icons px-3">arrow_forward</i></router-link>
    </div>
    <animatedBackground />
    <nextPage :page="'home'"/>
  </div>
</template>

<script>

import nextPage from '@components/NextPage.vue';
export default {
components: {
  nextPage
}
}
</script>
