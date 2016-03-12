import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    init: function() {
        this._super(arguments);        
        let parishioners = this.get('store').findAll('parishioner');
        this.set('parishioners', parishioners);
        this.setDefaultOffering();
    },
    didInsertElement: function() {
        this.$('select').chosen({ max_selected_options: 1 });
    },
    didUpdate: function() {
        this.$('select').trigger('chosen:updated');   
    },
    actions: {
        selectParishioner: function(id) {
            let parishioner = null;
            if (id != 0)   
                parishioner = this.get('store').findRecord('parishioner', id)
            this.set('offering.parishioner', parishioner);
            this.focusValueInput();
        },
        addOffering: function() {
            let offering = this.get('store').createRecord('offering', this.get('offering'));
            offering.save();
            this.resetChosen();
            this.setDefaultOffering();
            this.focusParishionerInput();
        }
    },
    setDefaultOffering: function() {
        this.set('offering', { date: moment().format() });
    },
    focusParishionerInput: function(){
        this.$('select').trigger('chosen:activate');    
    },
    focusValueInput: function() {
        this.$('#offering-value').focus();    
    },
    resetChosen: function() {
        this.$('option:selected').removeAttr('selected');
        this.$('select').trigger('chosen:updated');
    }
});
