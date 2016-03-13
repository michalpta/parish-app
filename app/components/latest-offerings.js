import Ember from 'ember';

export default Ember.Component.extend({
    searchableOfferings: Ember.computed('model', 'quickSearch', function() {
        let offerings = this.get('model');
        let filter = this.get('quickSearch');
        if (filter) {
            offerings = offerings.filter(function(offering) {
                    return offering.get('parishioner.name').toLowerCase().indexOf(filter.toLowerCase()) != -1;
                });
        }
        return offerings;
    }),
    sumOfOfferings: Ember.computed('searchableOfferings.@each', function() {
        let sum = 0;
        this.get('searchableOfferings').forEach(function(offering) {
            sum += offering.get('value')*1;
        })
        return sum;
    })
});
