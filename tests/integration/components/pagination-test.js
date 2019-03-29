import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | pagination', function(hooks) {
  setupRenderingTest(hooks);

  const TEMPLATE = hbs`
    <Pagination
      @total={{total}}
      @perPage={{perPage}}
      @current={{current}}
      @existingParams={{existingParams}}
    />
  `;

  const SELECTORS = {
    pageItem: '[data-test-page-item]',
    nthPageItem: n => `[data-test-page-item="${n}"]`,
  };

  test('it shows the correct amount of pages for evenly divisible numbers', async function(assert) {
    this.setProperties({
      total: 500,
      perPage: 10,
      current: 1,
    });
    await render(TEMPLATE);
    assert.dom(SELECTORS.pageItem).exists({ count: 50 }, 'There are 50 page items');
  });

  test('it shows the correct amount of pages for non-evenly divisible numbers', async function(assert) {
    this.setProperties({
      total: 22,
      perPage: 10,
      current: 1,
    });
    await render(TEMPLATE);
    assert.dom(SELECTORS.pageItem).exists({ count: 3 }, 'There are 3 page items');
  });

  test('it shows the correct active class', async function(assert) {
    this.setProperties({
      total: 150,
      perPage: 10,
      current: 7,
    });
    await render(TEMPLATE);
    assert.dom(SELECTORS.nthPageItem(7)).hasClass('active');
  });
});
