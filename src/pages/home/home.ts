import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

   numberForm:FormGroup;

   client:any;
  
   clientName:String;

  constructor(public navCtrl: NavController,
     private db:AngularFireDatabase,
    private fb : FormBuilder) {}

    ngOnInit() {
      this.buildForm()
    this.client= this.db.object('/Client/client0');
      
    }


    buildForm() {
      this.numberForm = this.fb.group({
        country: this.validateMinMax(1, 2),
        area:    this.validateMinMax(3, 3),
        prefix:  this.validateMinMax(3, 3),
        line:    this.validateMinMax(4, 4)
      });
    }
    updateClientInfo() {
      this.client.update({ phoneNumber: this.e164 })
    //  this.client.update({name:{clientName}})
  }


    
  /// helper to add validations to form based on min/max length
  validateMinMax(min, max) {
    return ['', [
      Validators.required,
      Validators.minLength(min),
      Validators.maxLength(max),
      Validators.pattern('[0-9]+')  // validates input is digit
    ]]
  }

 /// converts the current form values to E164
 get e164() {
  const form = this.numberForm.value
  const num = form.country + form.area + form.prefix + form.line
  return `+${num}`
}

}