import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {SqlStorage} from '../../providers/sql-storage';



@Component({
  templateUrl: 'modal-edit-parte.html'
})


export class ModalEditParte {
	

  private parte = {};


  constructor( 
    public params: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController, 
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public sqlStorage: SqlStorage
    ) { 
    this.parte = this.params.get("parte");
  }

  public update(){
    this.sqlStorage.updateParte(this.parte["id"],this.parte["nome"],this.parte["descricao"]);
    this.dismiss();
    this.presentToast();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Parte atualizada com sucesso!',
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