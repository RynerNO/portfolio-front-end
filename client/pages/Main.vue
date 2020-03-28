<template >
  <div class="font-primary main">

    <router-view></router-view>
    <keep-alive>
    <animatedBackground/>
    </keep-alive>
 
 
  </div>
</template>

<script>

import animatedBackground from '@components/AnimatedBackground.vue';
export default {

components: {
  animatedBackground
}
}
</script>
