import DS from 'ember-data';

export default DS.Model.extend({
    value: DS.attr(),
    date: DS.attr(),
    parishioner: DS.belongsTo('parishioner')
});
