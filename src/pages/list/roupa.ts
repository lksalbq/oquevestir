import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {ModalRegisterPage} from '../list/modal-register-page';
import {ListPage} from '../list/list-page';
import { ModalController, NavParams } from 'ionic-angular';

@Component({
  selector: 'roupa',
  templateUrl: 'roupa.html'
})
export class Roupa {

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams) {
    
  }

  openList() {

      //push another page onto the history stack
      //causing the nav controller to animate the new page in
      this.navCtrl.push(ListPage);
  }

  openModalRegister() {

    let modal = this.modalCtrl.create(ModalRegisterPage);
    modal.present();
  }
}