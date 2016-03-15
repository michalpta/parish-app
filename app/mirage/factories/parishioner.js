import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name: function() { return faker.fake('{{name.lastName}} {{name.firstName}}'); },
  city: function() { return faker.address.city(); },
  street: function() { return faker.address.streetName(); },
  number: function() { return faker.random.number({ min: 1, max: 100 }); }
});
