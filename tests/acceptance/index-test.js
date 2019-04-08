import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { makeList, mock, mockQuery, setupFactoryGuy } from 'ember-data-factory-guy';

module('Acceptance | homepage', function(hooks) {
  setupApplicationTest(hooks);
  setupFactoryGuy(hooks);

  test('Visiting the global feed', async function(assert) {
    mock({
      url: '/tags',
    }).returns({
      tags: ['marketing', 'content', 'development'],
    });
    mockQuery('article', { limit: '10', offset: '0', tag: '' }).returns({
      models: makeList('article', 10),
    });

    await visit('/');

    assert.equal(currentURL(), '/');
    assert
      .dom('[data-test-article-preview]')
      .exists({ count: 10 }, 'The articles appear on the global feed');
    assert.dom('[data-test-tag]').exists({ count: 3 }, 'The tags appear in the sidebar');
  });
});
