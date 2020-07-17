import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
 
Vue.use(MLInstaller)
 
export default new MLCreate({
  initial: 'en',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('en').create({
      home: {
        titles: ['\u00a0Andrdey', '\u00a0a beginner developer'],
        aboutMe: `I'm a beginner Front-End Developer based in ***REMOVED***, Ukraine. 
        Professionally connected with the web development industry and information
        technology for 1 year.`,
        me: 'I\'m',
        greeting: 'Hi there!',
        buttons: {
          aboutMe: 'More About Me',
          projects: 'My Projects'
        }
      },
      about: {
        title: ['About', 'Me'],
        aboutMe: `I'm a beginner developer based in ***REMOVED***, Ukraine. 
        Professionally connected with the web development industry and information
        technology for 1 year. 
        Aiming to leverage my abilities to successfully fit the developer 
        role in your company. Well-organised person, problem solver with high attention to detail.`,
        skillsTitle: 'Skills',
        languagesTitle: 'Languages',
        languages: [	{
					name: 'English',
					percents: 45,
				}, 
				{
					name: 'Russian',
					percents: 90
				},
			
				],
        buttons: {
          resume: 'My CV'
        }
      },
      portfolio: {
        title: ['My', 'Portfolio'],
        buttons: {
          viewMore: 'view more...',
          close: 'close',
          preview: 'preview'
        },
        slide: {
          project: 'Project',
          duration: 'Duration',
          tech: 'Technology',
        }
      }
    }),
 
    new MLanguage('ru').create({
      home: {
        titles: ['\u00a0Андрей', '\u00a0начинающий разработчик'],
        aboutMe: `Я Junior Front-End Developer из ***REMOVED***а, Украина.
        Профессионально занимаюсь веб-разработкой на протяжении 1 года.`,
        me: 'Я',
        greeting: 'Привет!',
        buttons: {
          aboutMe: 'Обо мне',
          projects: 'Мои проекты'
        }
      },
      about: {
        title: ['Обо', 'мне'],
        aboutMe: `Я Junior Front-End Developer из ***REMOVED***а, Украина.
        Проффессионально занимаюсь веб-разработкой на протяжении 1 года.
        Стремлюсь учлучшать свои навыки. Хорошо организован, быстро обучаюсь, внимателен к деталям.`,
        skillsTitle: 'Навыки',
        languagesTitle: 'Языки',
        languages: [	{
					name: 'Английский',
					percents: 45,
				}, 
				{
					name: 'Русский',
					percents: 90
				},
			
				],
        buttons: {
          resume: 'Мое резюме'
        }
      },
      portfolio: {
        title: ['Мое', 'Портфолио'],
        buttons: {
          viewMore: 'подробнее...',
          close: 'закрыть',
          preview: 'предпросмотр'
        },
        slide: {
          project: 'Проект',
          duration: 'Продолжительность',
          tech: 'Использованные технологии',
        }
      }

    })
  ]
})
