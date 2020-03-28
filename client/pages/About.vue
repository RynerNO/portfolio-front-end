<template>
	<div class="about flex flex-col pointer-events-none">

		<div class="title">
			<h1>About</h1>
			<div class="underline"></div>
		</div>
		<div class="flex flex-col">
			<div class="text-secondary text text-2xl">
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis aut repellendus consequuntur ipsam quibusdam, dicta ducimus neque autem iusto doloribus distinctio quo at eligendi repudiandae atque ad perferendis officia quod!</p>
			</div>
			<div class="second_title">
				<h2>My Skills</h2>
				<div class="underline"></div>
			</div>
			<div class="skills mx-20">
				<div
					class="skill text-white"
					v-for="skill in skills"
					:key="skill.name"
				>

					<div
						class="bar-fill"
						ref="items"
					>
						<div class="skill_name">
							{{ skill.name }}
						</div>
					</div>
					<span class="px-4">{{ skill.percents }}%</span>
				</div>
			</div>
		</div>

		<changePage />
	</div>
</template>

<script>
	import changePage from '@components/ChangePage.vue';
	import anime from 'animejs/lib/anime.es.js';
	export default {
		components: {
			changePage
		},
		data() {
			return {
				skills: [{
						name: "HTML/CSS",
						percents: 80,
					},
					{
						name: "SCSS",
						percents: 70
					},
					{
						name: "JavaScript",
						percents: 60
					},
					{
						name: "Git",
						percents: 50
					},
					{
						name: "Vue.js",
						percents: 40
					},
					{
						name: "Node.js",
						percents: 40
					},
				]
			}
		},
		mounted() {
			const tl = anime.timeline({
				easing: 'easeOutExpo',
				duration: 300
			});
			// tl.add({ 
			//   targets: '.title h1',
			//   translateX: ['-200%', 0],
			//   easing: 'easeOutQuad',
			//   delay: 300,
			// })
			// tl.add({ 
			//   targets: '.title div',
			//   translateX: ['-200%', 0],
			//   easing: 'easeOutQuad',
			//   delay: 300,
			// })

			this.skills.forEach((skill, i) => {
				let elem = this.$refs.items[i]
				tl.add({
					targets: elem,
					width: `${skill.percents}%`,
				}, 200)
			})

		}

	}
</script>