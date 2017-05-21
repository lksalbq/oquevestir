import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {ModalCategoriaRegister} from '../categoria/modal-categoria-register';
/**
 * Generated class for the Categoria page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class Categoria {

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }

  // openList() {

  //     //push another page onto the history stack
  //     //causing the nav controller to animate the new page in
  //     this.navCtrl.push(ListPartePage);
  // }

  openModalRegister() {

    let modal = this.modalCtrl.create(ModalCategoriaRegister);
    modal.present();
  }


}
