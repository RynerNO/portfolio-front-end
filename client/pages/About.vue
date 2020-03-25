<template>
  <div class="about justify-center flex flex-wrap">
    <div class="content z-10 flex flex-col">
          <div class="title">
              <h1>About</h1>  
              <div class="slide_animate"></div>
              </div>
              <div class="flex flex-row flex-col items-end ">
                    <div class="text-secondary text text-2xl">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis aut repellendus consequuntur ipsam quibusdam, dicta ducimus neque autem iusto doloribus distinctio quo at eligendi repudiandae atque ad perferendis officia quod!</p>
                    </div>
                    <div class="second_title">
                      <h2>My Skills</h2>
                      <div class="slide_animate"></div>
              
                    </div>
                    <div class="skills mx-20">
                      <div class="skill text-white" v-for="skill in skills" :key="skill.name">
                        
                        <div class="bar-fill" ref="items">
                          <div class="skill_name">
                              {{ skill.name }}
                          </div>
                        </div>
                          <span class="px-4">{{ skill.percents }}%</span>
                      </div>
                    </div>
          </div>
      </div>
      <nextPage :page="'about'"/>
  </div>
</template>

<script>
import nextPage from '@components/NextPage.vue';
import anime from 'animejs/lib/anime.es.js';
export default {
components: {
  nextPage
},
data() {
  return {
    skills: [
      {
        name: "HTML/CSS",
        percents: 80,
      },
       {
        name: "SCSS",
        percents: 70
      },
       {
        name: "JavaScript",
        percents: 60
      },
      {
        name: "Git",
        percents: 50
      },
       {
        name: "Vue.js",
        percents: 40
      },
      {
        name: "Node.js",
        percents: 40
      },
    ]
  }
},
mounted() {
  var tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 300
});

  this.skills.forEach((skill, i) => {
    let elem = this.$refs.items[i]
   tl.add({
      targets: elem,
      width: `${skill.percents}%`,
    }, 200)
  })

}

}
</script>
