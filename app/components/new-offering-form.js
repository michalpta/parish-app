import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    init: function() {
        this._super(arguments);
        let parishioners = this.get('store').findAll('parishioner');
        this.set('parishioners', parishioners);
        this.set('offering', { date: '2016-10-03' });
    },
    didInsertElement: function() {
        this.$('select').chosen({ max_selected_options: 1 });
        console.log(this.$('select option').length)  
    },
    didRender: function() {
        this.$('select').trigger('chosen:updated');
    },
    actions: {
        selectParishioner: function(id) {
            let parishioner = null;
            if (id != 0)   
                parishioner = this.get('store').findRecord('parishioner', id)
            this.set('offering.parishioner', parishioner);
        },
        addOffering: function() {
            let offering = this.get('store').createRecord('offering', this.get('offering'));
            offering.save();
        }
    }
});
