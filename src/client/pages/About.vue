<template lang="pug">
	section
		div(class="mx-auto" class="container")
			div(class="grid grid-cols-3 " class="about")
				div(class="col-span-3"  class="titleContainer")
					h2(class="aboutTitle") {{ $ml.get('about').title[0] }}
						span  {{ $ml.get('about').title[1] }}
					p(lang="en") I love to code.
				div(class='flex flex-wrap col-span-3 personalInfoContainer')
					div(class="aboutmeText")
						p {{ $ml.get('about').aboutMe}}
							
					
		
		
				div(class="col-span-3")
					hr(class="aboutHr")
				h2(class="uppercase" class="skillsTitle") {{ $ml.get('about').skillsTitle }}
				div(class="skills" class="col-span-3 flex flex-wrap")
					div(class="skill" v-for="skill of skills" :key="skill.name")
						p {{ skill.name }}
						div(class="skillBar")
							div(class="skillKnowledge" :style="{width: skill.percents+'%'}")
							div(class="skillPercents" class="font-secondary") {{ skill.percents }}%
								div
				h2(class="uppercase" class="skillsTitle") {{ $ml.get('about').languagesTitle }}
				div(class="skills" class="col-span-3 flex flex-wrap")
					div(class="skill" v-for="lang of $ml.get('about').languages" :key="lang.name")
						p {{ lang.name }}
						div(class="skillBar")
							div(class="skillKnowledge" :style="{width: lang.percents+'%'}")
							div(class="skillPercents" class="font-secondary") {{ lang.percents }}%
								div
				
		changePage
</template>

<script>
import changePage from '@components/ChangePage.vue';
export default {
  components: {
    changePage
  },
  meta() {
    return {
      title: this.$ml.get('about').meta.title,
    }
  },
	data() {
    return {
      personalInfo:[
      {
        name: 'First Name',
        value: 'Andrey',
      },
      {
        name: 'Nationality',
        value: 'Ukrainian',
      },
      {
        name: 'Experience',
        value: '1 year',
      },
      {
        name: 'Email',
        value: 'ryner.no@gmail.com',
      },
      {
        name: 'Github',
        value: 'RynerNO',
      }
  
      ],
      
        skills: [{
          name: "HTML / CSS",
          percents: 80,
        },
        {
          name: "Pug / SCSS",
          percents: 65
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
          percents: 35
        },
      ]
    }
  },

	}
</script>

<style lang="sass" scoped>
.container
  +container

.titleContainer
  +title

.personalInfoContainer
  @apply col-span-3

  justify-self: center
  align-items: center
  flex-direction: column

.aboutmeText
  color: $primary_text
  width: 80%

.personalInfo
  display: flex
  flex-direction: row
  width: 50%
  padding: 0.3rem 0rem

  p
    color: $primary_text
    width: 100px
    text-align: left

  span, a
    color: $secondary
    padding-left: 15px
    width: 120px

.personalInfoEmail
  flex-direction: column

  p
    width: 100%
    padding-left: 7px

  span
    padding-left: 7px
    width: 100%

.buttonContainer
  @apply col-span-3

  @apply flex

  justify-content: center
  margin: 30px

.button
  +btn

  margin-top: 2rem
  width: max-content
  height: max-content
  border: none
  margin: 10px 15px

.aboutHr
  margin: 25px auto 25px
  background: #555
  border-top: 1px solid rgba(0, 0, 0, 0.1)

.skillsTitle
  font-size: 23px
  font-weight: 600
  color: $primary_text
  align-self: center
  margin-bottom: 50px

.skills
  color: $primary_text

  .skill
    margin-bottom: 45px
    padding: 0 10px

    p
      margin-bottom: 18px
      font-size: 16px

    .skillBar
      height: 2px
      width: 100%
      background: #555
      display: flex

      .skillKnowledge
        width: 80%
        height: 100%
        background: $secondary

      .skillPercents
        position: relative
        top: -2.5rem
        left: -23px
        color: $secondary
        font-weight: 600
        font-size: 14px
        border: 1.5px solid $secondary
        width: 46px
        height: 32px

        @apply flex

        @apply items-center

        @apply justify-center

        border-radius: 4px
        background: #222
        text-align: center

        div
          display: inline-block
          padding: 4px
          transform: translateY(33.5px) rotate(45deg) skew(3deg, 3deg) translateX(-27px)
          background: #222
          border: 1.5px solid #2196F3
          border-width: 0 1.5px 1.5px 0
          bottom: 8px
          left: 34px
          position: absolute

@media (min-width: 740px)
  .personalInfo
    ul
      li
        span
          margin: 0 25px

  .skills
    .skill
      width: 33.3333%

@media (max-width: 1340px)
  .skills
    .skill
      width: 50%

@media (max-width: 740px)
  .personalInfo
    ul
      li
        margin: 0 25px

        h6
          display: flex
          flex-direction: column
          align-items: left
          text-align: left

        span
          margin: 0

  .skills
    justify-content: center

    .skill
      width: 100%

@media (max-width: 400px)
  .about
    .titleContainer
      margin: 25px 0

      h2
        font-size: 44px

      p
        font-size: 14px

</style>