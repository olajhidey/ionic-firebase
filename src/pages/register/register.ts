import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  details = {};

  fireData = firebase.database().ref('/users')

  constructor(public navCtrl: NavController, public navParams: NavParams, public afauth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onSignUp(email, pass) {

    this.afauth.auth.createUserWithEmailAndPassword(email, pass).then((result)=>{
      
      this.fireData.child(this.afauth.auth.currentUser.uid).set({
        uid: this.afauth.auth.currentUser.uid,
      }).then((data)=> {
        console.log(data)
      })

    }).catch((error)=> {
      console.log(error)
    })

  }

}
