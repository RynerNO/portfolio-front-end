<template lang="pug">
	section(class="h-full overflow-x-hidden")
		div(class="mx-auto" class="container")
			div(class="grid grid-cols-3" :class="{slideOut: infoSlideActive}")
				div(class="col-span-3" class="titleContainer")
					h2(class="title" ) {{ $ml.get('portfolio').title[0] }}&nbsp;
						span {{ $ml.get('portfolio').title[1] }}
					p(lang="en") A few coding projects.&nbsp;&nbsp;Please note these are not my designs,&nbsp;&nbsp;just the code.
				div(class="projects grid").col-span-3
					project.col-span-1(v-for="(project, index) of projects" :key="index" v-bind="project" @click="showSlide($event, project)" :btnText="$ml.get('portfolio').buttons.viewMore")
			
		div(class="projectInfo" :class="{projectInfoActive: infoSlideActive}")
			div(class="projectInfoContainer" class="grid grid-cols-3")
				div(class="col-span-3" class="projectInfoImage")
					picture
						source(:srcset="`${slideProps.filesLink}/poster.webp`" type="image/webp")
						img(:src="`${slideProps.filesLink}/poster.png`" alt="Project preview image")
				div(class="col-span-3 flex justify-between items-center")
					h3(class="projectInfoTitle") {{ slideProps.title }}
					button(class="closeButton" @click="closeSlide")
						span
							font-awesome(icon="times")
							|&nbsp;{{ $ml.get('portfolio').buttons.close }}
				div(class="projectInfoText" class="col-span-3")
					ul
						li 
							font-awesome(icon='file-alt')
							span
								|{{ $ml.get('portfolio').slide.project }}:&nbsp;{{ slideProps.type }}
						li 
							font-awesome(icon='hourglass')
							span
								|{{ $ml.get('portfolio').slide.duration }}:&nbsp;{{ slideProps.duration }}
						li 
							font-awesome(icon="file-code")
							span
								|{{ $ml.get('portfolio').slide.tech }}&nbsp;{{ slideProps.tech	}}
						li
							font-awesome(:icon=['fab', 'github'])
							span
								|Github:&nbsp;
								a(:href="slideProps.gitLink" target="_blank" rel="noopener noreferrer" class="underline hover:text-blue-500") {{ slideProps.title}}
					a(class="previewButton" target="_blank" rel="noopener noreferrer" :href="`${slideProps.link}`")
						span
							font-awesome(icon="external-link-alt") 
							| {{ $ml.get('portfolio').buttons.preview }}
		div(class="projectInfoOverlay" :class="{projectInfoOverlayActive: infoSlideActive}" @click="closeSlide")
		change-page
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
  meta() {
    return {
      title: this.$ml.get('portfolio').meta.title,
    }
  },
  data() {
    return {
        projects: [],
      infoSlideActive: false,
      slideProps: {
      }
    }
      },
  methods: {
      showSlide({previewLink, filesLink}, project) {
      this.slideProps = {
        ...project,
        link: previewLink,
        filesLink
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
  grid-template-columns: repeat(1, minmax(0, 1fr))
  grid-gap: 1rem
  @media (min-width: 700px)
    grid-template-columns: repeat(2, minmax(0, 1fr))

  @media (min-width: 1400px)
    grid-template-columns: repeat(3, minmax(0, 1fr))


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
    display: flex
    img
      width: 100%
      height: 100%
      object-fit: scale-down

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