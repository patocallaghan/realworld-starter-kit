import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | eq', function(hooks) {
  setupRenderingTest(hooks);

  test('it works', async function(assert) {
    this.setProperties({
      a: 1,
      b: 1,
    });

    await render(hbs`{{if (eq a b) 'true' 'false'}}`);
    assert.dom().hasText('true');

    this.setProperties({
      a: 1,
      b: 2,
    });
    assert.dom().hasText('false');

    this.setProperties({
      a: '1',
      b: 1,
    });
    assert.dom().hasText('true');
  });
});
