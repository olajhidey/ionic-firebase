import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFireAuth,  } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { SelectPage } from '../select/select';
import firebase from 'firebase'

/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

   currentUser = firebase.auth().currentUser.uid
  fireData = firebase.database().ref('/users/'+this.currentUser );
   listDb : FirebaseListObservable<any[]>
  myPlayers = [];
   
   players : FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public afauth : AngularFireAuth, public afdb : AngularFireDatabase, public alertCtrl : AlertController,public toastCtrl : ToastController) {
    
   this.players = afdb.list('/users/'+this.currentUser+'/players')

   this.players.subscribe((data)=> {
     this.myPlayers = data
     console.log(this.myPlayers)
   }, (error) => {
     console.log(error.message)
   })
   
  }

  add() {
    let alert = this.alertCtrl.create({
      title: 'Enter Player details',
      inputs: [
        {
          name: 'name',
          placeholder: 'Player name'
        },{
          name: 'position',
          placeholder: 'Player position (Midfielder, etc..)',
        }
      ],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data=> {
          console.log('cancel clicked')
        } 
      }, {
        text : 'Add',
        handler: data => {
          this.addPlayer(data.name, data.position)
        } 
      }]
    })

    alert.present();

 }

addPlayer(name, position) {

    this.fireData.child("/players").push({
      name: name,
      position: position
    }).then(()=> {

      this.presentToast();

    }).catch(error=> {
      alert(error.message)
    })
}

getPlayers() {

   this.players.subscribe((data)=> {
     this.myPlayers = data
     console.log(this.myPlayers)
   }, (error) => {
     console.log(error.message)
   })
}

 myPlayer(player) {
      console.log(player)
   }




 presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Player was added successfully',
      duration: 3000
    });
    toast.present();
  }

  ionViewDidLoad() {
   
  }

  signOut() {
    this.afauth.auth.signOut().then(()=> {
      this.navCtrl.setRoot(SelectPage);
    })
  }

}
