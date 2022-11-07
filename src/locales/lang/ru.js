import { MLanguage } from 'vue-multilanguage';
export default new MLanguage('ru').create({
  home: {
    titles: ['\u00a0Андрей', '\u00a0начинающий разработчик'],
    aboutMe: `Я Junior Front-End Developer.
    Профессионально занимаюсь веб-разработкой на протяжении 1 года.`,
    me: 'Я',
    greeting: 'Привет!',
    buttons: {
      aboutMe: 'Обо мне',
      projects: 'Мои проекты',
    },
    meta: {
      title: 'Главная',
    },
  },
  about: {
    title: ['Обо', 'мне'],
    aboutMe: `Я Junior Front-End Developer.
    Проффессионально занимаюсь веб-разработкой на протяжении 1 года.
    Стремлюсь учлучшать свои навыки. Хорошо организован, быстро обучаюсь, внимателен к деталям.`,
    skillsTitle: 'Навыки',
    languagesTitle: 'Языки',
    languages: [
      {
        name: 'Английский',
        percents: 45,
      },
      {
        name: 'Русский',
        percents: 90,
      },
    ],
    buttons: {
      resume: 'Мое резюме',
    },
    meta: {
      title: 'Обо мне',
    },
  },
  portfolio: {
    title: ['Мое', 'Портфолио'],
    buttons: {
      viewMore: 'подробнее...',
      close: 'закрыть',
      preview: 'предпросмотр',
    },
    slide: {
      project: 'Проект',
      duration: 'Продолжительность',
      tech: 'Использованные технологии',
    },
    meta: {
      title: 'Портфолио',
    },
  },
  contact: {
    title: ['Связаться', 'со мной'],
    description: `Если у вас есть проект или предложение о работе, пожалуйста, заполните форму ниже, и я отвечу вам в ближайшее время.`,
    buttons: {
      sendMessage: 'Отправить',
    },
    placeholders: {
      name: 'Имя',
      email: 'Почта',
      message: 'Сообщение',
    },
    meta: {
      title: 'Контакты',
    },
  },
  preview: {
    currentPage: 'Текущая страница:'
  },
  '404': {
    text: 'Страница не найдена',
  },
});
