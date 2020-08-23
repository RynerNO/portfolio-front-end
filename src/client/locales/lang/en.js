import { MLanguage } from 'vue-multilanguage';
export default new MLanguage('en').create({
  home: {
    titles: ['\u00a0Andrey', '\u00a0a beginner developer'],
    aboutMe: `I'm a beginner Front-End Developer based in Ukraine. 
    Professionally connected with the web development industry and information
    technology for 1 year.`,
    me: "I'm",
    greeting: 'Hi there!',
    buttons: {
      aboutMe: 'More About Me',
      projects: 'My Projects',
    },
    meta: {
      title: 'Home',
    },
  },
  about: {
    title: ['About', 'Me'],
    aboutMe: `I'm a beginner developer based in Ukraine. 
    Professionally connected with the web development industry and information
    technology for 1 year. 
    Aiming to leverage my abilities to successfully fit the developer 
    role in your company. Well-organised person, problem solver with high attention to detail.`,
    skillsTitle: 'Skills',
    languagesTitle: 'Languages',
    languages: [
      {
        name: 'English',
        percents: 45,
      },
      {
        name: 'Russian',
        percents: 90,
      },
    ],
    buttons: {
      resume: 'My CV',
    },
    meta: {
      title: 'About me',
    },
  },
  portfolio: {
    title: ['My', 'Portfolio'],
    buttons: {
      viewMore: 'view more...',
      close: 'close',
      preview: 'preview',
    },
    slide: {
      project: 'Project',
      duration: 'Duration',
      tech: 'Technology',
    },
    meta: {
      title: 'Portfolio',
    },
  },
  contact: {
    title: ['Get', 'In touch'],
    description: `If you have any project or job offer, please fill out the form below and I will reply you shortly.`,
    buttons: {
      sendMessage: 'send message',
    },
    placeholders: {
      name: 'Your name',
      email: 'Your email',
      message: 'Your message',
    },
    meta: {
      title: 'Contacts',
    },
  },
  '404': {
    text: 'Page not found',
  },
});
