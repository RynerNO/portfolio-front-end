<template lang="pug">
  section(class="flex items-center justify-center" :class="$style.home")
    div(class="z-20" :class="$style.text")
      h3(class="uppercase font-secondary") Hi there!
      h1(class="uppercase font-primary flex") 
        span i'm
        div 
          span(:class="$style.dynamicTitle" class="overflow-hidden")
            |{{ dynamicTitle }}
      p(class='font-secondary')
        |I'm a Freelance UI/UX Designer and Developer based in London,
        |England. I strives to build immersive and beautiful web applications through carefully crafted code and 
        |user-centric design
      div(class="flex my-5" :class="$style.buttons")
        router-link(to="/about" class="mx-2 " :class="[$style.btn, $style.about]")
          span
            font-awesome(icon="user" class="mx-2")
            |More About Me
        router-link(to="/portfolio" class="mx-2 " :class="[$style.btn, $style.portfolio]") 
          span
            font-awesome(icon="briefcase" class="mx-2")
            |My Projects
      
    animatedBackground
    changePage
</template>

<script>

import anime from 'animejs/lib/anime.es.js';
import animatedBackground from '@components/AnimatedBackground.vue';
import changePage from '@components/ChangePage.vue';
export default {
  data() {
    return {
      dynamicTitle: '',
      titles: ['\u00a0hdui', '\u00a0a beginner developer'],
      interval: null,
      animate: true,
    };
  },
  components: {
    animatedBackground,
    changePage
  },
  mounted() {
    this.dynamicTitle = this.titles[0]
    this.animateDynamicTitle(anime.timeline())
  },
  beforeDestroy() {
    this.animate = false
  },
  methods: {
    animateDynamicTitle(tl) {
        if(!this.animate) return
        tl.add({
              targets: '.'+this.$style.dynamicTitle,
              width: ['100%', 0],
              easing: 'easeOutQuad',
              duration: 1500,
              complete: () => {
                  let i = this.titles.indexOf(this.dynamicTitle)
                  console.log(i)
                  this.dynamicTitle = (i>=(this.titles.length-1)) ? this.titles[0] : this.titles[i+1]
              }
          })
        tl.add({ 
              targets: '.'+this.$style.dynamicTitle,
              width: [0, '100%'],
              easing: 'easeOutQuad',
              duration: 1500,
              endDelay: 400,
          })
        tl.finished.then(()=> {
          if(!this.animate) return
          tl = anime.timeline()
          this.animateDynamicTitle(tl)
          })
          }
      
  }
};
</script>
<style lang="scss" module>
@media (max-width: 600px) {
 .home {
    .text {
      margin: 0 auto;
      width: 80%;
      h3 {
        font-size: 15px;  
      };
      h1 {
          font-size: 22px;
       
          div {
            display: flex;

          }
      }
      p {
        display: none;
    }
    }
    .buttons {
        .btn {
          font-size: 14px;
        }
        justify-content: center;
        .about {
          border: none;
        }
        .portfolio {
            display: none;
          }
          
        
    }
  
    
  }
}
@media(min-width: 600px) {
  .home {
    .text {
      h3 {
        font-size: 19px;  
      };
      h1 {
          font-size: 42px;
          div {
            display: flex;

          }
      }
      p {
      font-size:16px;
    }
    }
  }
}
.home {
  width: 100vw;
  height: 100vh;
  .text {
    
    max-width: 550px;
    color: $primary_text;
    h3 {
      transition: all 0.5s ease;
    }
    h1 {
      transition: all 0.5s ease;
      font-weight: 500;
      .dynamicTitle {
        color: $secondary;
        white-space: nowrap;
        width: 100%;
      }
    }
  
  .buttons {
    .btn {
      @include btn;
    }
    .about {
      border: none;
    }
    .portfolio {
      color: $secondary;
      background-color: initial;
      &::before {
         background-color: $secondary;
      }
      &:hover {
        color: $primary_text;
        &::before {
                  background-color: $secondary;
                  width: 180%;
        }
      }
    }
  }
  }
}
</style>