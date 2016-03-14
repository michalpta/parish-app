import Ember from 'ember';
import {faker} from 'ember-cli-mirage';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    init: function() {
        this._super(arguments);
        this.setDefaultParishioner();
    },
    actions: {
        addParishioner: function() {
            let newParishioner = this.get('parishioner');
            newParishioner = this.get('store').createRecord('parishioner', newParishioner);
            newParishioner.save();
            this.setDefaultParishioner();
        }
    },
    setDefaultParishioner: function() {
        this.set('parishioner', { name: faker.name.findName(), city: faker.address.city() });
    },
});
