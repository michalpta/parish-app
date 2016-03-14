import Ember from 'ember';

export default Ember.Component.extend({
    sortParams: ['id:desc'],
    sortedOfferings: Ember.computed.sort('model','sortParams'),
    searchableOfferings: Ember.computed('sortedOfferings', 'quickSearch', function() {
        let offerings = this.get('sortedOfferings');
        let filter = this.get('quickSearch');
        if (filter) {
            offerings = offerings.filter(function(offering) {
                    return offering.get('parishioner.name').toLowerCase().indexOf(filter.toLowerCase()) !== -1;
                });
        }
        return offerings;
    }),
    sumOfOfferings: Ember.computed('searchableOfferings.@each', function() {
        let sum = 0;
        this.get('searchableOfferings').forEach(function(offering) {
            sum += Number(offering.get('value'));
        });
        return sum.toFixed(2);
    })
});
