<template lang="pug">
	section
		div(class="mx-auto" :class="$style.container")
			div(class="grid grid-cols-3 " :class="$style.about")
				div(class="col-span-3"  :class="$style.titleContainer")
					h2(:class="$style.aboutTitle") about
						span  me
					p FGGGGG
				div(:class="[$style.personalInfo, 'col-span-3']")
					div
						ul
							li(v-for="info of personalInfoColLeft" :key='info.name') 
								h6 {{ info.name }}:
									span  {{ info.value }}
					div
						ul
							li(v-for="info of personalInfoColRight" :key='info.name') 
								h6 {{ info.name }}:
									span  {{ info.value }}
				
				button(:class="$style.button") 
					span Download CV
				div(class="col-span-3")
					hr(:class="$style.aboutHr")
				h2(class="uppercase" :class="$style.skillsTitle") Skills
				div(:class="$style.skills" class="col-span-3 flex flex-wrap")
					div(:class="$style.skill" v-for="skill of skills" :key="skill.name")
						p {{ skill.name }}
						div(:class="$style.skillBar")
							div(:class="$style.skillKnowledge" :style="{width: skill.percents+'%'}")
							div(:class="$style.skillPercents" class="font-secondary") {{ skill.percents }}%
								div
		changePage
</template>

<script>
import changePage from '@components/ChangePage.vue';
export default {
  components: {
    changePage
  },
		data() {
			return {
				personalInfoColRight:[{
					name: 'First Name',
					value: 'Hui',
				},
				{
					name: 'Last Name',
					value: 'Hui',
				},
				{
					name: 'Birthdate',
					value: '21.10.1998',
				},
				{
					name: 'Nationality',
					value: 'Ukrainian',
				},
				{
					name: 'Experience',
					value: '1 year',
				}
				,
				{
					name: 'Address',
					value: 'Zalupensk',
				}
				],
				personalInfoColLeft:[{
					name: 'First Name',
					value: 'Hui',
				},
				{
					name: 'Last Name',
					value: 'Hui',
				},
				{
					name: 'Birthdate',
					value: '21.10.1998',
				},
				{
					name: 'Nationality',
					value: 'Ukrainian',
				},
				{
					name: 'Experience',
					value: '1 year',
				}
				,
				{
					name: 'Address',
					value: 'Zalupensk',
				}
				],
				skills: [{
						name: "HTML / CSS",
						percents: 80,
					},
					{
						name: "Pug / SCSS",
						percents: 65
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
						percents: 35
					},
				]
			}
		},

	}
</script>

<style lang="scss" module>
		.container {
			@include container;
		}
		.titleContainer {
			@include title;
		}
		.personalInfo {
			display: flex;
			justify-content: center;
			align-items: center;
			div {
				display: flex;
				justify-content: center;
				align-items: center;
			}
				ul {
						
						width: 100%;
					
						li {
							color: $primary_text;
							h6 {
								margin: 15px 0;
							}
							span {
								color: $secondary;
							}
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
		@apply col-span-3;
	}
	.aboutHr {
		margin: 72px auto 50px;
		background: #555;
		border-top: 1px solid rgba(0,0,0,.1);
	}
	.skillsTitle {
		font-size: 23px;
		font-weight: 600;
		color: $primary_text;
		align-self:center;
		margin-bottom: 50px;
	}
	.skills {
		color: $primary_text;
		
		.skill {
			margin-bottom: 45px;
			padding: 0 15px;
			p {
				margin-bottom: 18px;
				font-size:16px;
			}
			.skillBar {
				height: 2px;
				width: 100%;
				background: #555;
				display: flex;
				.skillKnowledge {
					width: 80%;
					height: 100%;
					background: $secondary;
				}
				.skillPercents {
					position: relative;
					top:-2.5rem;
					left: -23px;
					color: $secondary;
					font-weight: 600;
					font-size: 14px;
					border: 1.5px solid $secondary;
					width: 46px;
					height: 32px;
					@apply flex;
					@apply items-center;
					@apply justify-center;
					border-radius: 4px;
					background: #222;
					text-align: center;
				  div {
						display: inline-block;
						padding: 4px;
						transform: translateY(33.5px) rotate(45deg) skew(3deg, 3deg) translateX(-27px);
						background: #222;
						border: 1.5px solid #2196F3;
						border-width: 0 1.5px 1.5px 0;
						bottom: 8px;
						left: 34px;
						position: absolute;
					}
					}
			}
		}
	}

	
@media(min-width: 740px) {
			.personalInfo {
				ul {
						li {			
							span {
								margin: 0 25px;
							}
						}
					}
					
		}
		.skills {
		
			.skill { 
				width: 380px;
			}
		}
	}
	@media (max-width: 1340px) {
			.skills {
		
			.skill { 
				width: 50%;
			}
		}
	}
@media(max-width: 740px) {
		.personalInfo {
				ul {
						li {
							margin: 0 25px;
							h6 {
								display: flex;
								flex-direction: column;
								align-items: left;
								text-align: left;
							}
							span {
								margin: 0;
							}
						}
					}
		}
		.skills {
			justify-content: center;
			.skill { 
				width: 100%;
			}
		}
	}
@media (max-width:400px) {
	.about {
		.titleContainer {
			margin: 25px 0;
			h2 {
				font-size: 44px;
			}
			p {
				font-size: 14px;
			}
		}
	}
}
</style>