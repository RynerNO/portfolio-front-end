<template lang="pug">
  div.projects
    div.projects__list
      project.project__single-project(v-for="(project, index) of projects" :key="index" :btnText="'Edit'" v-bind="project" @click="editProject(project)")
    validation-observer(ref="form" v-slot="{ handleSubmit }" v-show="!showEditor")
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
        validation-provider(name="indexLocation" v-slot="{errors}")
          input(name="indexLocation"  v-model="newProject.index" type='text' placeholder="Project Index File Location")
          span() {{ errors[0] }}
        validation-provider(name="link" v-slot="{errors}")
          input(name="link" v-model="newProject.link" type='text' placeholder="Project Direct Link")
          span() {{ errors[0] }}
        filePond(
            required="true"
            ref="projectPoster"
            accepted-file-types="image/png"
          labelIdle="'Drag & Drop your project preview image or <span class='filepond--label-action'> Browse </span>'"
            allow-multiple="false"
            max-files="1"
          )
        button(class='btn successButton' type="submit") Submit Project
    validation-observer(ref="formEdit" v-slot="{ handleSubmit }" v-show="showEditor")
      form(class='projects__form' @submit.prevent="handleSubmit(sumbitEdit)")
        p Edit Project
        validation-provider(name="title" rules="required" v-slot="{errors}")
          input(name="title"  v-model="editor.title" type='text' placeholder="Project title")
          span() {{ errors[0] }}
        validation-provider(name="description" rules="required" v-slot="{errors}")
          input(name="description"  v-model="editor.description" type='text' placeholder="Project description")
          span() {{ errors[0] }}
        validation-provider(name="tech" rules="required" v-slot="{errors}")
          input(name="tech"  v-model="editor.tech" type='text' placeholder="Project tech")
          span() {{ errors[0] }}
        validation-provider(name="type" rules="required" v-slot="{errors}")
          input(name="type"  v-model="editor.type" type='text' placeholder="Project type")
          span() {{ errors[0] }}
        validation-provider(name="duration" rules="required" v-slot="{errors}")
          input(name="duration"  v-model="editor.duration" type='text' placeholder="Project duration")
          span() {{ errors[0] }}
        validation-provider(name="gitLink" rules="required" v-slot="{errors}")
          input(name="gitLink"  v-model="editor.gitLink" type='text' placeholder="Project git")
          span() {{ errors[0] }}
        validation-provider(name="indexLocation" v-slot="{errors}")
          input(name="indexLocation"  v-model="editor.index" type='text' placeholder="Project Index File Location")
          span() {{ errors[0] }}
        validation-provider(name="link" v-slot="{errors}")
          input(name="link" v-model="editor.link" type='text' placeholder="Project Direct Link")
          span() {{ errors[0] }}
        filePond(
            required="false"
            ref="editProjectPoster"
            accepted-file-types="image/png"
          labelIdle="'Drag & Drop new project preview image or <span class='filepond--label-action'> Browse </span>'"
            allow-multiple="false"
            max-files="1"
          )
        button(class='btn successButton' type="submit") Edit
        button(class='btn successButton' @click.prevent="updateProject") Update 
        button(class='btn errorButton' @click.prevent="deleteProject") Delete
        button(class='btn warningButton' @click.prevent="cancelEdit") Cancel
</template>

<script>



import { GET_PROJECTS } from "@store/projects/actions"
import { POST_ADD, POST_EDIT, POST_DELETE, POST_UPDATE} from "@store/projects/actions"
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
      index: '',
      link: ''
    },
    response: '',
    error: '',
    showModalAddProject: false,
    showEditor: false,
    editor: {
      title: '',
      description: '',
      tech: '',
      type: '',
      duration: '',
      gitLink: '',
      index: '',
      link: '',
      projectFolder: '',
      oldGit: ''
    },

    infoSlideActive: true,
   
  }
},
computed: {
  link() {
    return `site_previews/${this.editor.projectFolder}`
  }
},
created() {
	  this.updateProjects()
},
methods: {
  updateProjects() {
    this.$store.dispatch(GET_PROJECTS).then(()=> {
		this.projects = this.$store.state.projects.projects
	})
  },
  addProject() {
    const formData = new FormData();
    formData.append('Poster', this.$refs.projectPoster.getFiles()[0].file)
    formData.append('Type', this.newProject.type)
    formData.append('Duration', this.newProject.duration)
    formData.append('Title', this.newProject.title)
    formData.append('Description', this.newProject.description)
    formData.append('Git', this.newProject.gitLink)
    formData.append('Index', this.newProject.index)
    formData.append('Link', this.newProject.link)
    formData.append('Tech', this.newProject.tech.replace(' ', '').split(','))
    this.$store.dispatch(POST_ADD, formData).then(() => {
      this.updateProjects()
      this.newProject = {
                          title: '',
                          description: '',
                          tech: '',
                          type: '',
                          duration: '',
                          gitLink: '',
                          link: '',
                          indexLocation: '',
                        }
    })
    
  },
  sumbitEdit() {
    const formData = new FormData();
    if(this.$refs.editProjectPoster.getFiles()[0]) {
      formData.append('Poster', this.$refs.editProjectPoster.getFiles()[0].file)
    }
    
    formData.append('Type', this.editor.type)
    formData.append('Duration', this.editor.duration)
    formData.append('Title', this.editor.title)
    formData.append('Description', this.editor.description)
    formData.append('Git', this.editor.gitLink)
    formData.append('OldGit', this.editor.oldGit)
    formData.append('Index', this.editor.index)
    formData.append('Link', this.editor.link)
    formData.append('Tech', this.editor.tech.replace(' ', '').split(','))
    this.$store.dispatch(POST_EDIT, formData).then(() => {
      this.updateProjects()
      this.showEditor = false
      this.editor = null
    })
  },
	showSlide({title, tech, type, duration}) {
    tech = tech.split(',').join(', ');
    this.slideProps = {
      title: title,
      tech: tech, 
      type: type, 
      duration: duration,
    }
    this.infoSlideActive = true;
  },
  closeSlide() {
    this.infoSlideActive = false;
  },
  editProject(project) {
    this.showEditor = true
    this.editor = {
      ...project,
      oldGit: project.gitLink
    }
  },
  deleteProject() {
    this.showEditor = false
    const formData = new FormData();
    formData.append('git', this.editor.oldGit)
    formData.append('Test', 'ttttttttttttt')
    console.log(this.editor.oldGit)
    this.$store.dispatch(POST_DELETE, formData).then(() => {
      this.updateProjects()
      this.editor = null
    })
    
  },
  updateProject() {
    const formData = new FormData();
    formData.append('git', this.editor.oldGit)
    
    this.$store.dispatch(POST_UPDATE, formData).then(() => {
      this.updateProjects()
      this.editor = null
    })
  },
  cancelEdit() {
  this.showEditor = false
  this.editor = null
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
  margin: 0.3rem
  background-color: transparent
  color: #fff
  outline: none
  font-family: 'Hind Vadodara', sans-serif

.btn
  +button

.darkButton
  border-color: #32325d
  background-color: #32325d

  &:hover
    color: #fff
    border-color: #20203c
    background-color: #252544

.successButton
  border-color: #3ecf8e
  background-color: #3ecf8e

  &:hover
    color: #fff
    border-color: #2baf74
    background-color: #2eb97b
  &:focus
    box-shadow: 0 0 0 0.2rem rgba(72,180,97,.5)
    color: #fff
    background-color: #1e7e34
    border-color: #1c7430
  &:active
    color: #fff
    background-color: #1e7e34
    border-color: #1c7430


.errorButton
  background-color: #dc3545
  border-color: #dc3545

  &:hover
    color: #fff
    background-color: #c82333
    border-color: #bd2130
  &:focus
    color: #fff
    background-color: #c82333
    border-color: #bd2130
    box-shadow: 0 0 0 0.2rem rgba(225,83,97,.5)

.warningButton
  color: #212529
  background-color: #ffc107
  border-color: #ffc107

  &:hover
    color: #212529
    background-color: #e0a800
    border-color: #d39e00
  &:active
    color: #212529
    background-color: #d39e00
    border-color: #c69500

  &:focus
    box-shadow: 0 0 0 0.2rem rgba(222,170,12,.5)
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
.fade-enter-active, .fade-leave-active 
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0
</style>