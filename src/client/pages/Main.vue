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
      meta: [
        {name: 'description', content: this.$ml.get('about').aboutMe},
        {name:"author", content:"RynerNO"}
      ],
      link: [
        {rel: 'canonical', href: `https://ruiner.xyz${this.$route.path}`},
        {rel: 'alternate', href: this.engRoute, hreflang: 'en'},
        {rel: 'alternate', href: this.engRoute, hreflang: 'x-default'},
        {rel: 'alternate', href: this.rusRoute, hreflang: 'ru'}
      ],
      titleTemplate: (titleChunk) => {
          return titleChunk ? `${titleChunk} | Junior Front-End Developer` : 'Junior Front-End Developer';
      }  
    }
  },
  computed: {
    engRoute() {
      const path = (this.$route.params.lang !== undefined) 
      ? this.$route.path.replace(`/${this.$route.params.lang}`, '') 
      : this.$route.path
      return `https://ruiner.xyz${path}`
    },
    rusRoute() {
      const path = (this.$route.params.lang !== undefined) 
      ? this.$route.path.replace(`${this.$route.params.lang}`, 'ru') 
      : `/ru${this.$route.path}`
      return `https://ruiner.xyz${path}`
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
          const indexTo = this.pages.indexOf(to.path.replace(/\//g, '').replace(to.params.lang, ''));
          const indexFrom = this.pages.indexOf(from.path.replace(/\//g, '').replace(from.params.lang, ''));
          if (indexFrom > indexTo) {
                this.transitionName = 'slide-right'
          } else {
                this.transitionName = 'slide-left'
          }
      next();
    });
    
   
    
  },
  updated() {
     if(!!this.$route.params.lang) {
      this.$ml.change(this.$route.params.lang)
    }
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
