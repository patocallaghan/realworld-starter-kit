import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('article', {
  sequences: {
    title: num => `My amazing article ${num}`,
    id: num => `my-amazing-article-${num}`,
  },
  default: {
    id: FactoryGuy.generate('title'),
    title: FactoryGuy.generate('id'),
    body: '### This is a h3 heading\nThis is a paragraph\n#### This is another heading',
    createdAt: '2019-04-07T20:35:06.742Z',
    updatedAt: '2019-04-07T20:35:06.742Z',
    tagList: ['marketing', 'engineering'],
    description: 'About my experience with this project',
    author: FactoryGuy.belongsTo('profile', {}),
    favorited: false,
    favoritesCount: 1,
  },
});
