import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  photo: string = '';
  resp_coords: any;
  latitude: any;
  longitude: any;
  accuracy:any;
  speed:any;
  map: GoogleMap;


  constructor(public navCtrl: NavController, private camera: Camera,private geolocation: Geolocation
  ) {

  }

  loadMap() {

    let api_key = 'AIzaSyB5kxJ96SiNeyfJFtxzomK16EOEqFjqtVY';
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': api_key,
      'API_KEY_FOR_BROWSER_DEBUG': api_key
    });


    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.latitude,
          lng: this.longitude
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create('map', mapOptions);
    let marker: Marker = this.map.addMarkerSync({
      title: 'Eu',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.latitude,
        lng: this.longitude
      }
    });
    marker.showInfoWindow();
  }

///aslkfjasfjsalkfjaskl
  takePicture() {
    this.photo = '';

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 100,
      targetHeight: 100
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        let base64image = 'data:image/jpeg;base64,' + imageData;
        this.photo = base64image;
      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })


  }

  ionViewDidLoad(){


    this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.resp_coords = resp.coords;
        this.latitude = this.resp_coords.latitude;
        this.longitude = this.resp_coords.longitude;

        this.accuracy = this.resp_coords.accuracy;
        this.speed = this.resp_coords.speed;
        this.loadMap();

        this.resp_coords = resp.coords;
        console.log(resp);
      }).catch((error) => {
      console.log('Erro ao recuperar sua posição');
      console.log(error);
    });

    let watch = this.geolocation.watchPosition();
    watch
      .subscribe((resp) => {
        this.resp_coords = resp.coords;
        this.latitude = this.resp_coords.latitude;
        this.longitude = this.resp_coords.longitude;

        this.speed = this.resp_coords.speed;
        this.accuracy = this.resp_coords.accuracy;
        this.loadMap();
      },(error) => {
        console.log(error);
      });

  }
}
