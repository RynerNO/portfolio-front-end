<template >
  <div class="font-primary">
    <router-view></router-view>
    <animatedBackground/>
  </div>
</template>

<script>
import animatedBackground from '@components/AnimatedBackground.vue';
export default {
components: {
  animatedBackground,
}
}
</script>
