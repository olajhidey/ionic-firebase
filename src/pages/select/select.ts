import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { DashboardPage } from '../dashboard/dashboard';

import { AngularFireDatabase } from'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';

import firebase from 'firebase';

/**
 * Generated class for the SelectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select',
  templateUrl: 'select.html',
})
export class SelectPage {

  fireData = firebase.database().ref('/users')

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public afdb : AngularFireDatabase, public afauth : AngularFireAuth, public alertCtrl: AlertController,
  public loadCtrl : LoadingController, public toastCtrl : ToastController) {
   
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPage');
  }


  gotoDash(email, pass) {
    let toastMsg =  this.toastCtrl.create({
      message: "Email or Password field cant be empty",
      duration: 3000
    })
    if(email == null && pass == null) {
      toastMsg.present();
    }else if(email == null || pass == null) {
      toastMsg.present()
    }else {
      let loadStart = this.loadCtrl.create({
      content: "Loading"
    })

    loadStart.present();
    this.afauth.auth.signInWithEmailAndPassword(email, pass).then((data)=> {
     
     loadStart.dismiss()
      this.navCtrl.setRoot(DashboardPage);
     
    }, (error)=> {

      loadStart.dismiss()
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: error.message,
        buttons: ['OK']
      })

      alert.present()
    })
    }

    
  }
  
  signWithFacebook() {
    this.afauth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res=> {
      console.log(res);
    })
  }

  fgtPass() {
    console.log("i am clicked!!");
  }

  gotoRegister() {
    this.navCtrl.push(RegisterPage)
  }
}
