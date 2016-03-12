import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('latest-offerings', 'Integration | Component | latest offerings', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{latest-offerings}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#latest-offerings}}
      template block text
    {{/latest-offerings}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
