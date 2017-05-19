import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {ModalRegisterPage} from '../list/modal-register-page';
import {ModalListPage} from '../list/modal-list-page';
import { ModalController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListRoupa {
  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams) {
    
  }

  openModalList() {

    let modal = this.modalCtrl.create(ModalListPage);
    modal.present();
  }

   openModalRegister() {

    let modal = this.modalCtrl.create(ModalRegisterPage);
    modal.present();
  }
}