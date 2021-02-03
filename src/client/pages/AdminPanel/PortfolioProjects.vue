<template lang="pug">
  div.projects
    div.projects__list
      project.project__single-project(v-for="(project, index) of projects" :key="index" :btnText="'Edit'" v-bind="project" @click="editProject(project)")
    validation-observer(ref="form" v-slot="{ handleSubmit }")
      form(class='projects__form' @submit.prevent="handleSubmit(addProject)")
        p(v-if="!editing") Add Project
        p(v-if="editing") Edit Project
        validation-provider(name="title" rules="required" v-slot="{errors}")
          input(name="title"  v-model="project.title" type='text' placeholder="Project title")
          span() {{ errors[0] }}
        validation-provider(name="tech" rules="required" v-slot="{errors}")
          input(name="tech"  v-model="project.tech" type='text' placeholder="Project tech")
          span() {{ errors[0] }}
        validation-provider(name="git" rules="required" v-slot="{errors}")
          input(name="git"  v-model="project.git" type='text' placeholder="Project git")
          span() {{ errors[0] }}
        validation-provider(name="pages" v-slot="{errors}")
          div
            h4(class="text-gray-900") Pages:
            div(v-for="page in project.pages" :key="page.name" class="flex flex-col ml-3") 
              h5(class="text-gray-900") Name: {{ page.name }}
              h5(class="text-gray-900") Link: {{ page.link }}
          input(name="page" type='text' ref="pageName" placeholder="Page name")
          input(name="page" type='text' ref="pageLink" placeholder="Page Link")
          button(class='btn successButton' @click.prevent="addPage") Add

        validation-provider(name="link" v-slot="{errors}")
          input(name="link" v-model="project.link" type='text' placeholder="Project Direct Link")
          span() {{ errors[0] }}
        button(class='btn successButton' type="submit") Submit
        button(class='btn errorButton' v-if="editing" @click.prevent="deleteProject") Delete
        button(class='btn errorButton' v-if="editing" @click.prevent="cancelEdit") Cancel
</template>

<script>



import { GET_PROJECTS } from "@store/projects/actions"
import { POST_ADD, POST_EDIT, POST_DELETE, POST_UPDATE} from "@store/projects/actions"
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
    project: {
      title: '',
      tech: '',
      git: '',
      link: '',
      pages: []
    },
    response: '',
    error: '',
    editing: false,
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
  addPage() {
    this.project.pages.push({
      name: this.$refs.pageName.value,
      link: this.$refs.pageLink.value
    })
  },
  updateProjects() {
    this.$store.dispatch(GET_PROJECTS).then(()=> {
		this.projects = this.$store.state.projects.items
	})
  },
  addProject() {
    this.project.pages.unshift({
      name: 'Home',
      link: this.project.link
    })
    if(!Array.isArray(this.project.tech)) this.project.tech = this.project.tech.replace(' ', '').split(',')
    this.$store.dispatch(POST_ADD, {
      Title: this.project.title,
      Git: this.project.git,
      Link: this.project.link,
      Pages: this.project.pages,
      Tech: this.project.tech,
      projectID: this.project.projectID
    }).then(() => {
      this.updateProjects()
      this.project = {
                          title: '',            
                          tech: '',          
                          git: '',
                          link: '',  
                          pages: []  
                        }
    })
    
  },
  sumbitEdit() {
    const formData = new FormData(); 
    formData.append('Title', this.editor.title)
    formData.append('Git', this.editor.git)
    formData.append('Link', this.editor.link)
    formData.append('Tech', this.editor.tech.replace(' ', '').split(','))
    this.$store.dispatch(POST_EDIT, formData).then(() => {
      this.updateProjects()
      this.editor = null
    })
  },
  editProject(project) {
    this.editing = true
    this.project = {
      ...project
    }
    if(this.project.pages[0].name === "Home") {
      this.project.pages.shift()
    }
  },
  deleteProject() {
    this.$store.dispatch(POST_DELETE, {
      projectID: this.project.projectID
    }).then(() => {
      this.updateProjects()
      this.editing = false,
      this.project = {}
    })
    
  },
  cancelEdit() {
  this.project = {

  }
  this.editing = false
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