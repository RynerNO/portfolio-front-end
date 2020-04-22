<template lang="pug">
  div(:class="$style.portfolioProjectsContainer")
    div(v-show="!showModalAddProject" :class='$style.projects')
      div(:class='$style.project' v-for="(project, index) of projects" :key="index" @click="showSlide(project.name, project.tech, project.imageName, project.type, project.duration)")
        div(:class="$style.projectBar")
            h2 {{ project.name }}
            i
        img(:src="`/site_preview/${project.imageName}`")
    button(v-if="!showModalAddProject" :class='[$style.successButton, $style.addPageBtn]' @click="showModalAddProject = !showModalAddProject") New Project

    validation-observer(ref="form" v-slot="{ handleSubmit }")
      form(v-if="showModalAddProject" :class='$style.addProjectForm' @submit.prevent="handleSubmit(addProject)")
        p Add Project
        validation-provider(name="name" rules="required" v-slot="{errors}")
          input(name="name"  v-model="newProject.name" type='text' placeholder="Project name")
          span(class="text-red-600 text-align-center text-xl") {{ errors[0] }}
        validation-provider(name="tech" rules="required" v-slot="{errors}")
          input(name="tech"  v-model="newProject.tech" type='text' placeholder="Project tech")
          span(class="text-red-600 text-align-center text-xl") {{ errors[0] }}
        validation-provider(name="type" rules="required" v-slot="{errors}")
          input(name="type"  v-model="newProject.type" type='text' placeholder="Project type")
          span(class="text-red-600 text-align-center text-xl") {{ errors[0] }}
        validation-provider(name="duration" rules="required" v-slot="{errors}")
          input(name="duration"  v-model="newProject.duration" type='text' placeholder="Project duration")
          span(class="text-red-600 text-align-center text-xl") {{ errors[0] }}
        filePond(
            required="true"
            ref="projectImage"
            accepted-file-types="image/jpeg, image/png"
          labelIdle="'Drag & Drop your project preview image or <span class='filepond--label-action'> Browse </span>'"
            allow-multiple="false"
            max-files="1"
          )
        filePond(
            required="true"
            labelIdle="'Drag & Drop your project or <span class='filepond--label-action'> Browse </span>'"
            ref="projectArchive"
            allow-multiple="false"
            max-files="1"
          )
        
        button(:class='[$style.SubmitBtn, $style.successButton]' type="submit") Submit Project
    button(v-if="showModalAddProject" :class='[$style.successButton, $style.addPageBtn]' @click="showModalAddProject = !showModalAddProject") Show Projects   
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
</template>

<script>


import axios from "@utils/axios"
import { GET_PROJECTS } from "@store/projects/actions"
import { POST_ADD } from "@store/projects/actions"
import { UNSET_AUTH } from "@store/auth/actions"
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
const filePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
import {
  ValidationProvider,
  extend,
  ValidationObserver,
  localize
} from 'vee-validate';
import { required, image} from 'vee-validate/dist/rules';
import ru from 'vee-validate/dist/locale/ru.json';
extend('image', image);
extend('required', required);

localize('ru', ru);
export default {
components: {
  filePond,
  ValidationProvider,
  ValidationObserver,
},
props: {
  auth: {
    type: Object,
    required: true
  }
},
data() {
  return {
    projects: [],
    newProject: {
      name: '',
      tech: '',
      type: '',
      duration: ''
    },
    response: '',
    error: '',
    showModalAddProject: false,
    slideProps: {
					name: '',
					tech: '',
					image: '',
					type: '',
					duration: ''
        },
    infoSlideActive: true,
   
  }
},
created() {
	  this.$store.dispatch(GET_PROJECTS).then(()=> {
		this.projects = this.$store.state.projects.projects
	})
},
methods: {
  addProject() {
    let formData = new FormData();
    formData.append('projectImage', this.$refs.projectImage.getFiles()[0].file)
    formData.append('projectArchive', this.$refs.projectArchive.getFiles()[0].file)
    formData.append('projectType', this.newProject.type)
    formData.append('projectDuration', this.newProject.duration)
    formData.append('projectName', this.newProject.name)
    formData.append('projectTech', this.newProject.tech.replace(' ', '').split(','))
    this.$store.dispatch(POST_ADD, formData)
  },
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

}
</script>

<style lang="scss" module>

@mixin button {
  font-size: .9rem;
  font-weight: 500;
  padding: .375rem .75rem;
  user-select: none;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  border-radius: .25rem;
  background-color: transparent;
  color: #fff; 
  font-family: 'Hind Vadodara', sans-serif;
}
.darkButton {
  @include button;
  border-color: #32325d;
  background-color: #32325d;
  &:hover {
    color: #fff;
    border-color: #20203c;
    background-color: #252544;
  }
}
.successButton {
  @include button;
  border-color: #3ecf8e;;
  background-color: #3ecf8e;;
  &:hover {
    color: #fff;
    border-color: #2baf74;
    background-color: #2eb97b;
  }
}
.addPageBtn {
  align-self: flex-end;
  margin: 1rem 0;
}
.projects {
  width: 100%;
  margin-top: 50px;
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
}
.portfolioProjectsContainer {
    padding-top: 64px;
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
  }
  .addProjectForm {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 5px 15px;
    margin-top: 50px;
    p {
      padding-bottom: 5px;
      border-bottom: 1px solid #E6E6F2;
      margin-bottom: 15px;
    }
    input {
      display: block;
      width: 100%;
      height: calc(2em + .8rem + 2px);
      padding: .4rem 1rem;
      font-size: .875rem;
      font-weight: 400;
      line-height: 2;
      color: #82849f;
      background-color: transparent;
      background-clip: padding-box;
      border: 1px solid #e6e6f2;
      border-radius: .25rem;
      transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
      margin-bottom: 15px;
    }
  }
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
// ***************************************************************
</style>