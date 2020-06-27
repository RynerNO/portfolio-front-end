<template lang="pug">
  div.projects
    div.projects__list
      project.project__single-project(v-for="(project, index) of projects" :key="index" :btnText="'Редактировать'")
    validation-observer(ref="form" v-slot="{ handleSubmit }")
      form(class='projects__form' @submit.prevent="handleSubmit(addProject)")
        p Add Project
        validation-provider(name="title" rules="required" v-slot="{errors}")
          input(name="title"  v-model="newProject.title" type='text' placeholder="Project title")
          span() {{ errors[0] }}
        validation-provider(name="description" rules="required" v-slot="{errors}")
          input(name="description"  v-model="newProject.description" type='text' placeholder="Project description")
          span() {{ errors[0] }}
        validation-provider(name="tech" rules="required" v-slot="{errors}")
          input(name="tech"  v-model="newProject.tech" type='text' placeholder="Project tech")
          span() {{ errors[0] }}
        validation-provider(name="type" rules="required" v-slot="{errors}")
          input(name="type"  v-model="newProject.type" type='text' placeholder="Project type")
          span() {{ errors[0] }}
        validation-provider(name="duration" rules="required" v-slot="{errors}")
          input(name="duration"  v-model="newProject.duration" type='text' placeholder="Project duration")
          span() {{ errors[0] }}
        validation-provider(name="gitLink" rules="required" v-slot="{errors}")
          input(name="gitLink"  v-model="newProject.gitLink" type='text' placeholder="Project git")
          span() {{ errors[0] }}
        validation-provider(name="indexLocation" rules="required" v-slot="{errors}")
          input(name="indexLocation"  v-model="newProject.indexLocation" type='text' placeholder="Project Index File Location")
          span() {{ errors[0] }}
        filePond(
            required="true"
            ref="projectPoster"
            accepted-file-types="image/webp"
          labelIdle="'Drag & Drop your project preview image or <span class='filepond--label-action'> Browse </span>'"
            allow-multiple="false"
            max-files="1"
          )
        button(class='SubmitBtn successButton' type="submit") Submit Project
    
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
import Project from '@components/Project.vue'
extend('image', image);
extend('required', required);

localize('ru', ru);
export default {
components: {
  Project,
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
      title: '',
      description: '',
      tech: '',
      type: '',
      duration: '',
      gitLink: '',
      indexLocation: '',
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
    const formData = new FormData();
    formData.append('Poster', this.$refs.projectPoster.getFiles()[0].file)
    formData.append('Type', this.newProject.type)
    formData.append('Duration', this.newProject.duration)
    formData.append('Title', this.newProject.title)
    formData.append('Desctiption', this.newProject.description)
    formData.append('Git', this.newProject.gitLink)
    formData.append('Index', this.newProject.indexLocation)
    formData.append('Tech', this.newProject.tech.replace(' ', '').split(','))
    this.$store.dispatch(POST_ADD, formData)
  },
	showSlide({name, tech, type, duration}) {
    tech = tech.split(',').join(', ');
    this.slideProps = {
      name: title,
      tech: tech, 
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

<style lang="sass" scoped>

=button
  font-size: .9rem
  font-weight: 500
  padding: .375rem .75rem
  user-select: none
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out
  text-align: center
  vertical-align: middle
  border: 1px solid transparent
  border-radius: .25rem
  background-color: transparent
  color: #fff
  font-family: 'Hind Vadodara', sans-serif

.darkButton
  +button

  border-color: #32325d
  background-color: #32325d

  &:hover
    color: #fff
    border-color: #20203c
    background-color: #252544

.successButton
  +button

  border-color: #3ecf8e
  background-color: #3ecf8e

  &:hover
    color: #fff
    border-color: #2baf74
    background-color: #2eb97b

.addPageBtn
  align-self: flex-end
  margin: 1rem 0
.projects
  padding-top: 80px
  @apply grid
  @apply grid-cols-1
  @media (min-width: 640px)
    @apply grid-cols-3
  @media (min-width: 1280px)
    @apply grid-cols-4
  &__list
    @apply col-span-1
    @apply grid
    @apply grid-cols-1
    @media (min-width: 640px)
      @apply grid-cols-2
      @apply col-span-2
    @media (min-width: 1280px)
      @apply grid-cols-3
      @apply col-span-3
    padding: 5px 15px
  &__single-project
    margin-bottom: 30px
    padding: 0 15px
    @apply col-span-1
  &__form
    @apply col-span-1
    @media (min-width: 640px)
      @apply col-span-1
    margin: 0 auto
    display: flex
    flex-direction: column
    background: #fff
    padding: 5px 15px
    p
      padding-bottom: 5px
      border-bottom: 1px solid #E6E6F2
      margin-bottom: 15px

    input
      display: block
      width: 100%
      height: calc(2em + .8rem + 2px)
      padding: .4rem 1rem
      font-size: .875rem
      font-weight: 400
      line-height: 2
      color: #82849f
      background-color: transparent
      background-clip: padding-box
      border: 1px solid #e6e6f2
      border-radius: .25rem
      transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out
      margin-bottom: 15px
    span
      @apply text-red-600 
      @apply text-base
      
</style>