import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('profile', {
  default: {
    username: 'somerandomer',
    bio:
      'Engineer in science computer, software engineering. Stock Trader, Political and Economic Analyst.',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/sillyleo/128.jpg',
    following: false,
  },
});
