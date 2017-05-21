import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {Platform, NavParams, ViewController,ModalController } from 'ionic-angular';
import {SqlStorage} from '../../providers/sql-storage';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
//import {ModalEditParte} from '../parte/modal-edit-parte';

@Component({
  templateUrl: 'list-categoria-page.html'
})

export class ListCategoriaPage {

  private categorias: Array<Object>;

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

     this.getDataList()
     this.presentLoading()
  
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      duration: 1000
    });
    loader.present();
  }
  public getDataList() {
    this.sqlStorage.getAllCategorias().then(data =>{
      this.categorias = [];
      let hasData = data == 0 ? 0 : 1;
      if (hasData >= 1){
        for(let i = 0; i <= data.res.rows.length; i++){
          let id = data.res.rows.item(i).id;
          let nome = data.res.rows.item(i).nome;
          let descricao = data.res.rows.item(i).descricao;
          this.categorias.push({
             id: id,
             nome: nome,
             descricao: descricao
          });
        }
      }else{
        this.warningToast();
      }
    })
  }

  // public remove(id){
  //   this.sqlStorage.removeParte(id);
  //   this.removeToast();
  //   this.getDataList();
  // }

  // public updateModal(parte){
  //   let modal = this.modalCtrl.create(ModalEditParte, {"parte": parte});
  //   modal.present();
  // }

  removeConfirm(id) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar Exclusão',
      message: 'Você realmente deseja excluir essa parte?',
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
            //this.remove(id);
          }
        }
      ]
    });
    alert.present();
  }

  public warningToast() {
    let toast = this.toastCtrl.create({
      message: 'Não existem categorias cadastradas!',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    toast.present();
    this.dismiss();
  }

  public removeToast(){
    let toast = this.toastCtrl.create({
      message: 'Categoria Excluida com sucesso!',
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

