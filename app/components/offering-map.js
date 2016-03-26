import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    let geocoder = new google.maps.Geocoder();
    this.set('geocoder', geocoder);
    this.initMap();
  },
  initMap() {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 50.0464284, lng: 19.7246942},
      zoom: 10
    });
    this.set('map', map);
    this.get('model').forEach((offering) => this.codeOffering(offering))
  },
  mapInitializer: Ember.observer('model', function() { this.initMap() }),

  codeOffering(offering) {
    let address = offering.get('parishioner.address');
    if (!offering.get('isNew')) {
      this.codeAddress(
        address,
        `${offering.get('parishioner.name')} - ${offering.get('parishioner.address')}`,
        `<b>${offering.get('parishioner.name')}</b><br />
         ${offering.get('parishioner.address')}<br />
         ${offering.get('parishioner.offeringsTotal')}`
      );
    }
  },
  codeAddress(address, title, content) {
    let map = this.get('map');
    let geocoder = this.get('geocoder');
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            title: title
        });
        var infoWindow = new google.maps.InfoWindow({
          content: content
        });
        marker.addListener('click', function() {
          infoWindow.open(map, marker);
        });
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
  }
});
