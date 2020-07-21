<template lang="pug">
  main(class="font-primary main h-full")
    transition(   v-bind:css="false"   
                  v-on:enter="enter"
                  v-on:leave="leave"
                  
  )               
      router-view
</template>
<script>
import anime from 'animejs/lib/anime.es.js';

export default {
  meta() {
    return {
      htmlAttrs: {
          lang: this.$ml.current     
      },
      titleTemplate: (titleChunk) => {
          return titleChunk ? `${titleChunk} | Junior Front-End Developer` : 'Junior Front-End Developer';
      }  
    }
  },
  data() {
    return {
      transitionName: '',
      pages: ['home', 'about', 'portfolio', 'contact'],
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
          const indexTo = this.pages.indexOf(to.path.replace('/', ''));
          const indexFrom = this.pages.indexOf(from.path.replace('/', ''));
          if (indexFrom > indexTo) {
                this.transitionName = 'slide-right'
          } else {
                this.transitionName = 'slide-left'
				  }
      next();
    });
  },
  methods: {
   enter(el, done) {
     if(this.transitionName === 'slide-right') {
        anime({
          targets: el,
          translateX: ['-50%', 0],
          opacity:[0, 1],
          duration: 400,
          delay: 300,
          easing: 'easeOutQuad',
          complete: done
        })
     } else if(this.transitionName === 'slide-left') {
        anime({
          targets: el,
          translateX: ['50%', 0],
          opacity:[0, 1],
          duration: 400,
          delay: 300,
          easing: 'easeOutQuad',
          complete: done
        })
     }
    },
    leave(el, done) {
       if(this.transitionName === 'slide-right') {
            anime({
                targets: el,
                translateX: [0, '100%'],
                opacity:[1, 0],
                duration: 400,
                easing: 'easeOutQuad',
                complete: done
              })
     } else if(this.transitionName === 'slide-left') {
            anime({
                targets: el,
                translateX: [0, '-100%'],
                opacity:[1, 0],
                duration: 400,
                easing: 'easeOutQuad',
                complete: done
              })
     }
        
    }
  }
}
</script>
