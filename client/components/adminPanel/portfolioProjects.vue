<template lang="pug">
  div
    div(:class='$style.projects')
      div(:class='$style.project')
        img
    button(:class='$style.addPageBtn' @click="addProject") New Project
    validation-observer(ref="form" v-slot="{ handleSubmit }")
      form(:class='$style.addProjectForm' @submit.prevent="handleSubmit(addProject)")
        p New Project
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
       
        button(:class='$style.SubmitBtn' type="submit") Submit Project
      
</template>

<script>


import axios from "@utils/axios"
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
    sites: {

    },
    newProject: {
      name: '',
      tech: '',
      type: '',
      duration: ''
    },
    response: '',
    error: ''
   
  }
},
mounted() {

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
  }
}
}
</script>

<style lang="scss" module>
  .sites {

  }
  .site {

  }
  .addProjectForm {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 5px 15px;
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
</style>