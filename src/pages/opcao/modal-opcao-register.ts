import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {SqlStorage} from '../../providers/sql-storage';
import { LoadingController } from 'ionic-angular';

@Component({
  templateUrl: 'modal-opcao-register.html',
})


export class ModalOpcaoRegister {
	
  opcoes = {};
  roupas: Array<Object>;
  constructor( 
    public params: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController, 
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public sqlStorage: SqlStorage,
    public loadingCtrl: LoadingController
    ) { 
    this.presentLoading();
    this.getRoupas();
	}
  public add() {
    // console.log(this.categoria["nome"]+ " | " +this.categoria["descricao"] + " | "+this.categoria["parte"])
    // this.sqlStorage.setCategoria(this.categoria["nome"],this.categoria["descricao"],this.categoria["parte"]);
    // this.dismiss();
    // this.presentToast();
  }

  public getRoupas(){
      this.sqlStorage.getAll().then(data =>{
      this.roupas = [];
      let hasData = data == 0 ? 0 : 1;
      if (hasData >= 1){
        for(let i = 0; i <= data.res.rows.length; i++){

          let id = data.res.rows.item(i).id;
          let descricao = data.res.rows.item(i).value.toString();
          let statusCesto = data.res.rows.item(i).status_cesto;
          let imgRoupa = data.res.rows.item(i).img_roupa;
          let status;
          let color;
          if(statusCesto === "true"){
            status = "Sujo";
            color = 'danger'
          }else{
            status = "Limpo";
            color = 'secondary'
          }

          this.roupas.push({
             id: id,
             descricao: descricao,
             statusCestoDescription: status,
             statusCesto: statusCesto,
             imgRoupa: imgRoupa,
             color_status: color,
             can_use: status === 'Sujo' ? 'true' : 'false'
          });
          
        }
      }
    })
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      duration: 4000
    });
    loader.present();
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