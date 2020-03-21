<template>
  <div class="flex items-center justify-center home">
    <div class="home_text z-10 text-xl flex flex-col">
        <h1 class="text-center text-white font-semibold text-4-5xl py-3">Hello, I'am <span class="text-pink-600">hhhh</span>. <span class="block">I'm a begginer front-end developer</span></h1>
      <router-link to="/portfolio" class="border-gray-100 border-2 self-center p-24 py-6 text-white flex items-center justify-center hover:bg-blue-400 cursor-pointer" >View my work <i class="material-icons px-3">arrow_forward</i></router-link>
    </div>
    <animatedBackground class="absolute left-0 top-0 " />
    <nextPageArrow/>
  </div>
</template>

<script>
import animatedBackground from '@components/AnimatedBackground.vue';
import nextPageArrow from '@components/NextPageArrow.vue';
export default {
components: {
  animatedBackground,
  nextPageArrow
}
}
</script>

<style>

</style>