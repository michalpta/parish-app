import Ember from 'ember';

export default Ember.Controller.extend({
    isNewParishionerFormVisible: false,
    actions: {
        toggleShowNewParishionerForm: function() {
            this.toggleProperty('isNewParishionerFormVisible');
        }
    }
});
