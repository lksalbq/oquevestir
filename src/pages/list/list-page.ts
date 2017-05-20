import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {Platform, NavParams, ViewController,ModalController } from 'ionic-angular';
import {SqlStorage} from '../../providers/sql-storage';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {ModalEditPage} from '../list/modal-edit-page';

@Component({
  templateUrl: 'list-page.html'
})

export class ListPage {
  // selectedItem: any;
  // icons: string[];
  private roupas: Array<Object>;

  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public sqlStorage: SqlStorage,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
   
    // this.selectedItem = navParams.get('roupa');

    // // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // // 'american-football', 'boat', 'bluetooth', 'build'];
    // var roupasSize = this.getLastId()
    // this.roupas = [];
    // for (let i = 0; i <= roupasSize; i++) {
    //   this.getDataList(i);
    //   this.roupas.push({
    //     descricao: "this.roupa[0].descricao",
    //     id: i.toString(),
    //   });
    // }
     this.getDataList()
     this.presentLoading()
  }

  //  itemTapped(event, roupa) {
  //   // That's right, we're pushing to ourselves!
  //   this.navCtrl.push(ModalListPage, {
  //     roupa: roupa
  //   });
  // }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      duration: 3000
    });
    loader.present();
  }
  public getDataList() {
    this.sqlStorage.getAll().then(data =>{
      this.roupas = [];
      if (data.res.rows.length >= 1){
        for(let i = 0; i <= data.res.rows.length; i++){

          let id = data.res.rows.item(i).id;
          let descricao = data.res.rows.item(i).value.toString();
          let statusCesto = data.res.rows.item(i).status_cesto;
          let imgRoupa = data.res.rows.item(i).img_roupa;
          let status;

          if(statusCesto === "true"){
            status = "Roupa limpa.";
          }else{
            status = "Roupa suja.";
          }

          this.roupas.push({
             id: id,
             descricao: descricao,
             statusCestoDescription: status,
             statusCesto: statusCesto,
             imgRoupa: imgRoupa
          });
          
        }
      }else{
        this.warningToast();
      }
    })
  }

  public remove(id){
    this.sqlStorage.remove(id);
    this.removeToast();
    this.getDataList();
  }

  public updateModal(roupa){
    let modal = this.modalCtrl.create(ModalEditPage, {"roupa": roupa});
    modal.present();
  }

  removeConfirm(id) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar Exclusão',
      message: 'Você realmente deseja excluir essa roupa?',
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelado');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.remove(id);
          }
        }
      ]
    });
    alert.present();
  }

  public warningToast() {
    let toast = this.toastCtrl.create({
      message: 'Não existem roupas cadastradas!',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    toast.present();
  }

  public removeToast(){
    let toast = this.toastCtrl.create({
      message: 'Roupa Excluida com sucesso!',
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

