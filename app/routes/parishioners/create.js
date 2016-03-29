import Ember from 'ember';
import {faker} from 'ember-cli-mirage';

export default Ember.Route.extend({
  model() {
    let parishioner = {
      name: faker.fake('{{name.lastName}} {{name.firstName}}'),
      city: faker.address.city(),
      street: faker.address.streetName(),
      streetNumber: faker.random.number({ min: 1, max: 100 }),
      streetNumberSuffix: '',
      notes: '',
    };
    return this.store.createRecord('parishioner', parishioner);
  }
});
