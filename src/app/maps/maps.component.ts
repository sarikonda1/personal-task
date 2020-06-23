/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

declare let google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom:number;
  constructor(public mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    this.setCurrentLocation();
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    if (this.gmapElement) {
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }
  }
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  placeMarker($event){
    console.log($event.coords.lat);
    console.log($event.coords.lng);
    this.getCurrentLocation($event.coords.lat, $event.coords.lng);
  }
  getCurrentLocation(latitude, longitude) {
    this.mapsAPILoader.load().then(() => {
      let geocoder = new google.maps.Geocoder;
      let latlng = {lat: latitude, lng: longitude};
      let that = this;
      geocoder.geocode({'location': latlng}, function(results) {
          if (results[0]) {
            that.zoom = 11;
            // that.currentLocation = results[0].formatted_address;
            console.log(results[0].formatted_address);
          } else {
            alert('You must enable Billing on the Google Cloud Project');
          }
      });
    });
  }

}
