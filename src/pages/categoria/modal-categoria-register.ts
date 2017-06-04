import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {SqlStorage} from '../../providers/sql-storage';


@Component({
  templateUrl: 'modal-categoria-register.html',
})


export class ModalCategoriaRegister {
	
  categoria = {};
  partesCategoria: Array<Object>;
  constructor( 
    public params: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController, 
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public sqlStorage: SqlStorage,
    ) { 

    this.getPartes();
	}
  public add() {
    console.log(this.categoria["nome"]+ " | " +this.categoria["descricao"])
    this.sqlStorage.setCategoria(this.categoria["nome"],this.categoria["descricao"]);
    this.dismiss();
    this.presentToast();
  }

  public getPartes(){
    this.sqlStorage.getAllPartes().then(data =>{
      this.partesCategoria = [];
      let hasData = data == 0 ? 0 : 1;
      if (hasData >= 1){
        for(let i = 0; i <= data.res.rows.length; i++){
          let id = data.res.rows.item(i).id;
          let nome = data.res.rows.item(i).nome;
          let descricao = data.res.rows.item(i).descricao;
          this.partesCategoria.push({
             id: id,
             nome: nome,
             descricao: descricao
          });
        }
      }
    })
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Categoria cadastrada com sucesso!',
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