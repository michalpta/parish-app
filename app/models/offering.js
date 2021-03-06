import DS from 'ember-data';

export default DS.Model.extend({
  value: DS.attr('number'),
  date: DS.attr(),
  parishioner: DS.belongsTo('parishioner', { async: true })
});
