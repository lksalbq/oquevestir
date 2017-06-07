import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import {ModalOpcaoRegister} from '../opcao/modal-opcao-register';
import {SqlStorage} from '../../providers/sql-storage';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
	options: string = "optionsList";
	private roupas: Array<Object>;

	constructor(public platform: Platform,
				public navCtrl: NavController,
				public sqlStorage: SqlStorage,
				public toastCtrl: ToastController,
				public loadingCtrl: LoadingController) {
		this.initialize();
	}
	
	ionViewWillEnter() { 
       return this.getDataList();
    }

	initialize(){
	  	this.presentLoading();
	}

	Opcao(){
	    //push another page onto the history stack
	    //causing the nav controller to animate the new page in
	    this.navCtrl.push(ModalOpcaoRegister);
	}

	presentLoading() {
	    let loader = this.loadingCtrl.create({
	      duration: 3000
	    });
	    loader.present();
  	}

	public getDataList() {
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
	          console.log(statusCesto)
	          if(statusCesto === "true"){
	            status = "Sujo";
	            color = 'danger';
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
	             color_status: color
	          });
	          
	        }
	      }else{
	        this.warningToast();
	      }
    })
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


	
}
