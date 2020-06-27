<template lang="pug">
	section(class="h-full")
		div(class="mx-auto" class="container")
			div(class="grid grid-cols-3" :class="{slideOut: infoSlideActive}")
				div(class="col-span-3" class="titleContainer")
					h2(class="title" ) My&nbsp;
						span portfolio
					p A few coding projects.&nbsp;&nbsp;Please note these are not my designs,&nbsp;&nbsp;just the code.
				div(class="projects grid")
					project(@click="showSlide" v-for="(project, index) of projects" :key="index" v-bind="project")
			
			div(class="projectInfo" :class="{projectInfoActive: infoSlideActive}")
				div(class="projectInfoContainer" class="grid grid-cols-3")
					div(class="col-span-3" class="projectInfoImage")
						img( :src="`/site_preview/${slideProps.image}`" )
					div(class="col-span-3 flex justify-between items-center")
						h3(class="projectInfoTitle") {{ slideProps.name }}
						button(class="closeButton" @click="closeSlide")
							span
								font-awesome(icon="times")
								|&nbsp;close
					div(class="projectInfoText" class="col-span-3")
						ul(class="")
							li 
								font-awesome(icon='file-alt')
								span
									|Project:&nbsp;{{ slideProps.type }}
							li 
								font-awesome(icon='hourglass')
								span
									|Duration:&nbsp;{{ slideProps.duration }}
							li 
								font-awesome(icon="file-code")
								span
									|Technologies:&nbsp;{{ slideProps.tech}}
									
						a(class="previewButton" :href="`/site_preview/${slideProps.name.toLowerCase().replace(' ', '_')}/index.html`")
							span
								font-awesome(icon="external-link-alt") 
								| Prewiew
			div(class="projectInfoOverlay" :class="{projectInfoOverlayActive: infoSlideActive}" @click="closeSlide")
		changePage
</template>

<script>
	import { GET_PROJECTS } from "@store/projects/actions";
  import anime from 'animejs/lib/anime.es.js';
	import changePage from '@components/ChangePage.vue';
	import Project from '@components/Project.vue';
export default {

		components: {
			changePage,
			Project
		},
		data() {
			return {
				 projects: [],
				infoSlideActive: false,
				slideProps: {
					name: '',
					tech: '',
					image: '',
					type: '',
					duration: ''
				}
			}
        },
		methods: {
			 showSlide({name, tech, imageName, type, duration}) {
				 tech = tech.split(',').join(', ');
				this.slideProps = {
					name: name, 
					tech: tech, 
					image: imageName, 
					type: type, 
					duration: duration,
				}
				this.infoSlideActive = true;
			},
			closeSlide() {
				this.infoSlideActive = false;
			}
		},
  created() {
		this.$store.dispatch(GET_PROJECTS).then(()=> {
		this.projects = this.$store.state.projects.projects

	})
	}
}
</script>

<style lang="sass" scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:700&display=swap")

body::-webkit-scrollbar
  display: none

.container
  +container

.slideOut
  transform: translateX(-760px)
  transition: transform .4s ease-in-out

.titleContainer
  +title



.projects
  grid-template-columns: repeat(1, minmax(0, max-content))

  @media (min-width: 640px)
    grid-template-columns: repeat(4, minmax(0, max-content))

  @media (min-width: 1280px)
    grid-template-columns: repeat(3, minmax(0, max-content))




// infoSlide
.projectInfo
  width: 100%
  height: 100%
  color: $primary_text
  position: fixed
  top: 0
  z-index: 17
  background: #333
  right: -100%
  transition: all .4s ease-in-out
  visibility: hidden

  @media (min-width: 1024px)
    width: 760px

  .projectInfoImage
    margin: 30px 0
    overflow: hidden
    max-height: 400px
    border-radius: 6px

    img
      width: 100%
      height: auto
      display: block

  .projectInfoContainer
    position: relative
    padding: 0 30px

    .projectInfoTitle
      font-size: 20px
      margin: 0 0 22px 0
      font-weight: 700
      color: $secondary

      @media (min-width: 400px)
        font-size: 27px

    .projectInfoText
      justify-items: center

      ul
        margin-bottom: 20px

        li
          width: 100%
          margin-bottom: 20px

          svg
            margin-right: 15px

    .closeButton
      +btn

      background-color: initial
      padding: 0 1.5rem
      font-size: 15px
      height: 31px
      margin: 0 0 22px 0
      transition: height, padding .5s ease-in-out

      @media (min-width: 400px)
        height: 36px
        padding: 0 2rem

      @media (min-width: 640px)
        height: 46px
        padding: 0 3rem

      color: $secondary

      &::before
        background-color: $secondary

      &:hover
        color: $primary_text

  .previewButton
    +btn

    display: inline-block
    border: none

.projectInfoOverlay
  width: 100%
  height: 100%
  position: fixed
  top: 0
  left: 0
  background: rgba(0, 0, 0, 0.78)
  z-index: 16
  display: none

.projectInfoOverlayActive
  display: none

  @media (min-width: 1024px)
    display: inherit

.projectInfoActive
  visibility: visible
  right: 0
  transition: right .4s ease-in-out

// ***************************************************************

</style>