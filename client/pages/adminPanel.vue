<template lang="pug">
  div(:class="$style.adminPanelContainer")
    header
    aside
    section
    component(v-bind:is='currentComponent')


</template>
<script>
import portfolioProjects from '@components/adminPanel/portfolioProjects.vue';
import { mapState } from 'vuex';
export default {
   computed: {
        ...mapState({
            auth: state => state.auth,
        }),

    },
  components: {
    portfolioProjects

  },
  mounted() {
    if(!this.auth.status) {
      this.$router.push('/login')
    }
  },
  data() {
    return {
      showMenu: false,
      pageName: 'test',
      currentComponent: 'portfolioProjects'
    }
  }
}
</script>
<style lang="scss" module>
  .adminPanelContainer {
    display: grid;
    
  }
 </style>