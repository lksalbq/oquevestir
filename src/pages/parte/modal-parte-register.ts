import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {SqlStorage} from '../../providers/sql-storage';



@Component({
  templateUrl: 'modal-parte-register.html',
})


export class ModalParteRegister {
	
  parte = {};

  constructor( 
    public params: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController, 
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public sqlStorage: SqlStorage
    ) { 


	}

  public add() {
    this.sqlStorage.setParte(this.parte["nome"],this.parte["descricao"]);
    this.dismiss();
    this.presentToast();
  }
  

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Parte cadastrada com sucesso!',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    toast.present();
  }

	dismiss() {
	  this.viewCtrl.dismiss();
	}
}