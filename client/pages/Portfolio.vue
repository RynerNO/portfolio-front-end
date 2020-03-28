<template>
	<div class="portfolio flex flex-col">
		<div class='title '>
			<h1>Portfolio</h1>
			<div class="underline"></div>
		</div>
		<div class='projects flex flex-wrap'>
			<div
				class='project-container m-5 flex justify-center relative'
				v-for="(project, index) in projects"
				:key="index"
                ref="projectElements"
			>
				<div class="hover-content"></div>
               
				<div class="project-tech">
					<span
						v-for="tech of project.techs"
						:key="tech"
					>{{ tech }}</span>
				</div>
				<router-link
					to="ss"
					class="project-link text-white text-center border-2 opacity-0 absolute p-2  uppercase text-tiny"
				>
					View Project
				</router-link>
			</div>

		</div><!-- #86eaea -->
		<changePage />
	</div>
</template>

<script>
    import anime from 'animejs/lib/anime.es.js';
	import changePage from '@components/ChangePage.vue'
	export default {
		components: {
			changePage
		},
		data() {
			return {
				projects: [{
					image: '',
					name: '',
					link: '',
					techs: ['Vue.js', 'Express.js', 'SCSS', 'HUITA']
                },
                {
					image: '',
					name: '',
					link: '',
					techs: ['Vue.js', 'Express.js', 'SCSS', 'HUITA']
                },
                {
					image: '',
					name: '',
					link: '',
					techs: ['Vue.js', 'Express.js', 'SCSS', 'HUITA']
                },
                {
					image: '',
					name: '',
					link: '',
					techs: ['Vue.js', 'Express.js', 'SCSS', 'HUITA']
				}]
			}
        },
        mounted() {
            const tl = anime.timeline({
				easing: 'easeOutExpo',
				duration: 300
			});
            this.$refs.projectElements.forEach((element, i) => {
                tl.add({ 
                    
                })
            })
        }
	}
</script>