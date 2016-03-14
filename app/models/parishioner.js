import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    city: DS.attr(),
    street: DS.attr(),
    number: DS.attr(),   
    numberSuffix: DS.attr(),
    offerings: DS.hasMany('offering'),
    
    address: Ember.computed('city','street','number', function(){
        return `${this.get('city')}, ${this.get('street')} ${this.get('number')}`;
    })
});
