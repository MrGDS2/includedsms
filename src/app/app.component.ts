import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyB7T0k9S0hEkPm9b61A6-brgXVE3WxvnkA",
  authDomain: "includedsms.firebaseapp.com",
  databaseURL: "https://includedsms.firebaseio.com",
  projectId: "includedsms",
  storageBucket: "includedsms.appspot.com",
  messagingSenderId: "829950231053"
};
firebase.initializeApp(config);

  }
}

