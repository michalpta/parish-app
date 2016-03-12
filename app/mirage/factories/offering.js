import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  value: faker.finance.amount,
  date: '2016-03-10',
  parishioner_id: 1
});
