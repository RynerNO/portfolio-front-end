<template lang="pug">
	section(class="h-full")
		div(class="mx-auto" :class="$style.container")
			div(class="grid grid-cols-3" :class="[infoSlideActive ? $style.slideOut: $style.slideInavtive]")
				div(class="col-span-3" :class="$style.titleContainer")
					h2(:class="$style.title" ) My&nbsp;
						span portfolio
					p A few coding projects.&nbsp;&nbsp;Please note these are not my designs,&nbsp;&nbsp;just the code.
				div(:class="$style.portfolioProjectsContainer" class="grid col-span-3")
					div( :class="$style.projectContainer" v-for="(project, index) of projects" :key="index" @click="showSlide(project.name, project.tech, project.imageName, project.type, project.duration)" )
						div(:class="$style.projectBar")
							h2 {{ project.name }}
							i
						div(:class="$style.project")
							img(:src="`/site_preview/${project.imageName}`")
							div(class="flex w-full h-full absolute top-0 left-0 justify-center items-center opacity-0" :class="$style.projectHover")
								div(:class="$style.hoverBg")
								span(:class="$style.viewMoreButton")
									span view more...
			
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
@import url('https://fonts.googleapis.com/css?family=Montserrat:700&display=swap');
body::-webkit-scrollbar {
  display: none;
}
.container {
	@include container;
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


	// page content
  .portfolioProjectsContainer {
		grid-template-columns: repeat(1, minmax(0, max-content));
		@media (min-width: 640px) {	
			grid-template-columns: repeat(4, minmax(0, max-content));
		}
		@media(min-width: 1280px) {
			grid-template-columns: repeat(3, minmax(0, max-content));
		}
	}
	.projectContainer {
	
		padding: 0 15px;
		overflow: hidden;
		cursor: pointer;
		margin-bottom: 30px;
		transition: all 0.5s;
		@apply col-span-1;
		@media (min-width: 640px) {	
			@apply col-span-2;
		}
		@media(min-width: 1280px) {
			@apply col-span-1;
		}
		img {
			width: 100%;
			height: auto;
		}
		.projectBar {
					background-color: #ddd;
					height: 24px;
					color: #6a6a6a;
					z-index: 10;
					width: 100%;
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: center;
					border-radius: 8px 8px 0px 0px;
					h2 {
						font-weight: 600;
						font-size: 14px;
						color: #8a8a8a;
						align-self: center;
						font-family: 'Montserrat', sans-serif;
						
					}
					@mixin circle {
							height: 12px;
    					width: 12px;
    					display: inline-block;
    					background-color: #ff5f57;
    					border-radius: 50%;
    					position: absolute;
    					top: 6px;
    					left: 10px;
						}
					i {
						@include circle;
						align-self: start;
						
						&::before {
							content: " ";
							@include circle;
    					left: 16px;
    					background-color: #ffbd2e;
    					top: 0;
						}
						&::after {
							content: " ";
							@include circle;
							left: 32px;
							background-color: #28ca41;
    					top: 0;
						}
					}
					}
		
		.project {
			overflow: hidden;
			position: relative;
			max-width: 603px;
			max-height: 339px;
			z-index: 10;
			box-shadow: 8px 8px 0 rgba(0,0,0,.15);
			border-radius: 0px 0px 8px 8px;
			@media (min-width: 640px) {	
				max-width: 415px;
    		max-height: 233px;
			}
			@media(min-width: 1280px) {
				max-width: 350px;
    		max-height: 197px;
			}
			
		}
		&:hover {
				.projectHover { 
						
						opacity: 1;
						.projectHoverSlide {
							transition-duration: 0.4s;
							transform: translateY(0);
						}	
				}
			}
		.projectHover {
			transition-duration: 0.5s;	
			
							.hoverBg {
								position: absolute;
								z-index: 2;
								top:0;
								left:0;
								width: 100%;
								height: 100%;
								background-color: rgba(10,10,10,.7);
								background-blend-mode: luminosity;
						
					}
						
				
					.viewMoreButton {
						font-weight: 500;
						font-size: 15px;
						@include btn;	
      			color: $secondary;
						background-color: initial;
						z-index: 5;
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
	// ************************************************************
	// infoSlide
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
			border-radius: 6px;
			img {
				width:100%;
				
				height: auto;
				display: block;
			}

			
    }
    .projectInfoContainer {
      position: relative;
			padding: 0 30px;
		.projectInfoTitle {
			font-size: 20px;
			margin: 0 0 22px 0;
			font-weight: 700;
			color: $secondary;
			@media(min-width: 400px) {
				font-size: 27px;
			}
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
			padding: 0 1.5rem;
			font-size: 15px;
			height: 31px;
			
			margin: 0 0 22px 0;
			transition: height, padding .5s ease-in-out;
			@media(min-width: 400px) {
			height: 36px;
			padding: 0 2rem;
			}
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
// ***************************************************************
</style>