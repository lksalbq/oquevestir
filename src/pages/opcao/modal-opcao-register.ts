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
  selectedRoupas = []
  selected: any;
  opcoes = {};
  roupas = [];

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
    //this.selectedItem = params.get('roupa');
	}
  public add() {
    // console.log(this.categoria["nome"]+ " | " +this.categoria["descricao"] + " | "+this.categoria["parte"])
    // this.sqlStorage.setCategoria(this.categoria["nome"],this.categoria["descricao"],this.categoria["parte"]);
    // this.dismiss();
    // this.presentToast();
  }

  public getRoupas(){
      this.sqlStorage.getAll().then(data =>{
      
      let hasData = data == 0 ? 0 : 1;
      if (hasData >= 1){
        for(let i = 0; i <= data.res.rows.length; i++){

          let id = data.res.rows.item(i).id;
          let descricao = data.res.rows.item(i).value.toString();
          let statusCesto = data.res.rows.item(i).status_cesto;
          let imgRoupa = data.res.rows.item(i).img_roupa;
          let parte = data.res.rows.item(i).parte;
          let categoria = data.res.rows.item(i).categoria;
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
             cant_use: status === 'Sujo' ? 'true' : 'false',
             parte: parte,
             categoria: categoria
          });
          
        }
      }
    })
  }

  disableSamePartes(roupa){
    var hasRoupa = false;
    var hasDisabled = false;

    if(this.selectedRoupas.length > 0){
      var selectedSize = this.selectedRoupas.length;
      for (var i =0; i < selectedSize; i++){
        
        if (this.selectedRoupas[i].id === roupa.id) {
          for(var j=0; j < this.selectedRoupas.length; j++){
               for(var k = 0; k <  this.roupas.length; k++){
                   if((this.selectedRoupas[j].categoria === this.roupas[k].categoria) && (this.selectedRoupas[j].id !== this.roupas[k].id)){
                      this.roupas[k].cant_use = false;
                   }
               }      
          }

          this.selectedRoupas.splice(i,1);
          hasRoupa = true;
          hasDisabled = true;
          break;
        }
      }
      if (!hasRoupa){
        this.selectedRoupas.push({
          id: roupa.id,
          parte: roupa.parte,
          categoria: roupa.categoria
        })
      }
    }else{
      this.selectedRoupas.push({
        id: roupa.id,
        parte: roupa.parte,
        categoria: roupa.categoria
      })
    }

    if(!hasDisabled){
      for(var i=0; i < this.selectedRoupas.length; i++){
           for(var j = 0; j <  this.roupas.length; j++){ 
               if((this.selectedRoupas[i].categoria === this.roupas[j].categoria) && (this.selectedRoupas[i].id !== this.roupas[j].id)){
                  this.roupas[j].cant_use = true;
               }
           }      
      }
    }
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