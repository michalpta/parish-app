import Ember from 'ember';

export default Ember.Component.extend({
    searchableOfferings: function() {
        let filter = this.get('quickSearch');
        if (!filter)
            return this.get('model');
        else
            return this.get('model').filter(function(offering) {
                return offering.get('parishioner.name').toLowerCase().indexOf(filter.toLowerCase()) != -1;
            });
    }.property('model','quickSearch')
});
