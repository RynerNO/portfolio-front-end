<template lang="pug">
	section
		div(class="mx-auto" :class="$style.container")
			div(class="grid grid-cols-3" :class="[infoSlideActive ? $style.slideOut: $style.slideInavtive]")
				div(class="col-span-3" :class="$style.titleContainer")
					h2(:class="$style.title" ) My&nbsp;
						span portfolio
					p A few coding projects.&nbsp;&nbsp;Please note these are not my designs.&nbsp;&nbsp;Just the code.
				div(:class="$style.projects" class="col-span-3 flex flex-wrap")
					div(:class="$style.projectContainer" v-for="(project, index) of projects" :key="index" @click="showSlide(project.name, project.tech, project.imageName, project.type, project.duration)")
						div(:class="$style.project")
							img(:src="`/site_preview/${project.imageName}`")
							div(class="flex w-full h-full absolute top-0 left-0 justify-center items-center invisible" :class="$style.projectHover")
								span {{ project.name }}
				button(:class="['rounded-full col-start-2 col-end-3', $style.button]") 
					span Load More
			div(:class="[$style.projectInfo, infoSlideActive ? $style.projectInfoActive: '']")
				div(:class="$style.projectInfoContainer" class="grid grid-cols-3")
					div(class="col-span-3" :class="$style.projectInfoImage")
						img( :src="`/site_preview/${slideProps.image}`" )
					div(class="col-span-3 flex justify-between items-center")
						h3(:class="$style.projectInfoTitle") {{ slideProps.name }}
						button(:class="$style.closeButton" @click="closeSlide")
							span
								font-awesome(icon="times")
								|&nbsp;close
					div(:class="$style.projectInfoText" class="col-span-3")
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
									
						a(:class="$style.previewButton" :href="`/site_preview/${slideProps.name.toLowerCase().replace(' ', '_')}/index.html`")
							span
								font-awesome(icon="external-link-alt") 
								| Prewiew
			div(:class="[$style.projectInfoOverlay, infoSlideActive ? $style.projectInfoOverlayActive : '']" @click="closeSlide")
		changePage
</template>

<script>
  import anime from 'animejs/lib/anime.es.js';
	import changePage from '@components/ChangePage.vue';
	import { GET_PROJECTS } from "@store/projects/actions"
export default {

		components: {
			changePage,
		},
		data() {
			return {
				projects: {},
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
			 showSlide(name, tech, image, type, duration) {
				 tech = tech.split(',').join(', ');
				this.slideProps = {
					name: name, 
					tech: tech, 
					image: image, 
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

<style lang="scss" module>
.container {
	@include container;
	overflow-x:hidden;
}
.slideOut {
	transform: translateX(-760px);
	transition: transform .4s ease-in-out;
}
.slideInavtive {
	transition: transform .4s ease-in-out;
}
	.titleContainer {
		@include title;
	
	}

	.projectContainer {
		max-width: 100%;
		padding: 0 15px;
		overflow: hidden;
		cursor: pointer;
		margin-bottom: 30px;
		transition: all 0.5s;
		@media (min-width: 640px) {
			max-width: 50%;
		}
		@media(min-width: 1280px) {
			max-width: 33%;
		}
		img {
			max-width: 100%;
			height: auto;
		}
		.project {
			overflow: hidden;
			position: relative;
			max-width: 854px;
    	max-height: 400px;

		}
		&:hover {
				.projectHover { 
						visibility: visible;
				}
			}
		.projectHover {
			background: $secondary;
	
			span {
					color: $primary_text;
					font-weight: 500;
					font-size: 20px;
				}
			
		}
	}
	.button {
				@include btn;
				margin-top: 2rem;
				padding: 1rem;
				padding-left: 2.5rem;
				padding-right: 2.5rem;
				width: max-content;
				height: max-content;
				border:none;
				justify-self: center;
	}
	 .projectInfo {
    width: 100%;
    height: 100%;
    color: $primary_text;
    position: fixed;
    top: 0;
		z-index: 17;
		background: #333;
		right: -100%;
		transition: all .4s ease-in-out;
		visibility: hidden;
		@media(min-width: 1024px) {
			width: 760px;
		}
    .projectInfoImage {
			margin: 30px 0;
			overflow: hidden;
			max-height: 400px;
			img {
				width:100%;
				height: 100%;
				display: block;
			}

			
    }
    .projectInfoContainer {
      position: relative;
			padding: 0 30px;
		.projectInfoTitle {
			font-size: 34px;
			margin: 0 0 22px 0;
			font-weight: 700;
			color: $secondary;
		}
		.projectInfoText {
			justify-items: center;
			
			ul {
				margin-bottom: 20px;
				li {
					width: 100%;
					margin-bottom: 20px;
					svg {
						margin-right: 15px;
						
					}
				}
			}
		}
		.closeButton {
			@include btn;
			background-color: initial;
			padding: 0 2rem;
			font-size: 15px;
			height: 36px;
			margin: 0 0 22px 0;
			transition: height, padding .5s ease-in-out;
			@media(min-width: 640px) {
				height: 46px;
				padding: 0 3rem;
		}
			
			color: $secondary;
			&::before {
				background-color: $secondary;
			}
			&:hover {
				color: $primary_text;
			}
		}
    }
   
		.previewButton {
			@include btn;
			display: inline-block;
			border: none;
		}
	}
	 .projectInfoOverlay {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.78);
			z-index: 16;
			display: none;
		}
	.projectInfoOverlayActive {
			display: none;
			@media(min-width: 1024px) {
				display: inherit;
			}
			
	}
	.projectInfoActive {
		visibility: visible;
		right: 0;
		transition: right .4s ease-in-out;
		
	}

</style>