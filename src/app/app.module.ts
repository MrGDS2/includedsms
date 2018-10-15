import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ReactiveFormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import firebase from 'firebase';
//import { AngularFireDatabaseModule } from 'angularfire2/database';
 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyB7T0k9S0hEkPm9b61A6-brgXVE3WxvnkA",
  authDomain: "includedsms.firebaseapp.com",
  databaseURL: "https://includedsms.firebaseio.com",
  projectId: "includedsms",
  storageBucket: "includedsms.appspot.com",
  messagingSenderId: "829950231053"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    ReactiveFormsModule // <-- here
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
