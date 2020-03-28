<template>
	<div class="changePage pointer-events-none">
		<div class="pageLoadBar">

		</div>
		<!-- <nav class="topNav flex items-center justify-center">
    <ul class="flex justify-center uppercase cursor-pointer">
    <li :class="{ active: page === 'home'}">Home</li>
    <li :class="{ active: page === 'about'}">About</li>
    <li>Potfolio</li>
    <li>Contact</li>
    </ul>
  </nav> -->
		<div
			class="arrow-container previousPage"
			:class="{nextPageAnimate: animate}"
			@click="previousPage"
			v-if="pagePrevious"
		>
			<span>
				<span>{{ pagePrevious }}</span>
			</span>
		</div>
		<div
			class="arrow-container nextPage"
			:class="{nextPageAnimate: animate}"
			@click="nextPage"
			v-if="pageNext"
		>
			<span>
				<span>{{ pageNext }}</span>
			</span>
		</div>

	</div>
</template>

<script>
	import anime from 'animejs/lib/anime.es.js';
	export default {

		data: () => {
			return {
				animate: false,
				pages: ['home', 'about', 'portfolio'],
			}
		},
		computed: {
			pagePrevious() {
				const index = this.pages.indexOf(this.$route.path.replace('/', ''));
				if (index !== -1 && index !== 0) {
					return this.pages[index - 1]
				} else {
					return false;
				}
			},
			pageNext() {
				console.log(this.$route.path)
				const index = this.$route.path === '/' ? 0 : this.pages.indexOf(this.$route.path.replace('/', ''));
				if (index !== -1 && index !== this.pages.length - 1) {
					return this.pages[index + 1]
				} else {
					return false;
				}
			}
		},
		methods: {
			animateLoadBar(route) {
				anime({
					targets: '.pageLoadBar',
					width: '100%',
					easing: 'easeInOutQuad',
					duration: 700,
					complete: () => {
						this.$router.push(`/${route}`)
						this.animate = false;
						anime({
							targets: '.pageLoadBar',
							width: '0%',
							easing: 'easeInOutQuad',
							duration: 0,
						})
					}
				})
			},
			animatePageChangeArrows() {
				this.animate = !this.animate;
				anime({
					targets: '.nextPage',
					translateX: 250,
					easing: 'easeInOutQuad',
					delay: 300,
					duration: 100
				})
				anime({
					targets: '.previousPage',
					translateX: -250,
					easing: 'easeInOutQuad',
					delay: 300,
					duration: 100
				})
			},
			nextPage: function() {
				this.animatePageChangeArrows()
				this.animateLoadBar(this.pageNext)

			},
			previousPage() {
				this.animatePageChangeArrows()
				this.animateLoadBar(this.pagePrevious)

			},
			scroll(e) {
				const delta = e.wheelDeltaY;
				if (!this.animate) {
					if (delta > 0) {
						if (this.pagePrevious) {
							document.getElementsByClassName('main')[0].removeEventListener('wheel', this.scroll);
							this.previousPage()

						}
					} else {
						if (this.pageNext) {
							document.getElementsByClassName('main')[0].removeEventListener('wheel', this.scroll);
							this.nextPage()


						}

					}
				}
			}
		},
		destroyed() {
			document.getElementsByClassName('main')[0].removeEventListener('wheel', this.scroll);
		},
		mounted() {

			this.$nextTick(function() {
				document.getElementsByClassName('main')[0].addEventListener('wheel', this.scroll);
				anime({
					targets: '.nextPage',
					translateX: [250, 0],
					easing: 'easeInOutQuad',
					delay: 200,
					duration: 300
				})

				anime({
					targets: '.previousPage',
					translateX: [-250, 0],
					easing: 'easeInOutQuad',
					delay: 200,
					duration: 300
				})
			})

		}
	}
</script>

<style>

</style>