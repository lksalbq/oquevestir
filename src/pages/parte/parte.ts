import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {ModalParteRegister} from '../parte/modal-parte-register';
import {ListPartePage} from '../parte/list-parte-page';


/**
 * Generated class for the Parte page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-parte',
  templateUrl: 'parte.html',
})
export class Parte {

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams) {
  }

   openList() {

      //push another page onto the history stack
      //causing the nav controller to animate the new page in
      this.navCtrl.push(ListPartePage);
  }

  openModalRegister() {

    let modal = this.modalCtrl.create(ModalParteRegister);
    modal.present();
  }

}
