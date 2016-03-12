import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    city: DS.attr(),
    street: DS.attr(),
    number: DS.attr(),   
    numberSuffix: DS.attr(),
    offerings: DS.hasMany('offering')
});
