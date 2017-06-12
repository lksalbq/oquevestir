import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import {ModalOpcaoRegister} from '../opcao/modal-opcao-register';
import {SqlStorage} from '../../providers/sql-storage';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
	options: string = "optionsList";
	opcoes = []
	loading : any;
	constructor(public platform: Platform,
				public navCtrl: NavController,
				public sqlStorage: SqlStorage,
				public toastCtrl: ToastController,
				public loadingCtrl: LoadingController,
				private alertCtrl: AlertController,) {

		this.navCtrl = navCtrl;
		//this.initialize();
	}
	
	ionViewCanEnter() {
	    // Starts the process
	    this.opcoes = [] 
	    this.initialize();
  	}


	initialize(){
		this.opcoes = [] 

	  	this.presentLoading();
	}

	Opcao(){
	    //push another page onto the history stack
	    //causing the nav controller to animate the new page in
	    this.navCtrl.push(ModalOpcaoRegister);
	}

	presentLoading() {
	    let loader = this.loadingCtrl.create({
	      content: "Aguarde..."
	    });
	    loader.present();

	    this.getAsyncData(loader)
  	}

  private getAsyncData(loader) {

    setTimeout(() => {

    	let roupas_opcoes = []

    	this.sqlStorage.getAllOpcoes().then(data =>{
	      let hasData = data == 0 ? 0 : 1;
	      if (hasData >= 1){

	        for(let i = 0; i < data.res.rows.length; i++){
    	  	  

	          let id_opcao = data.res.rows.item(i).id;
	          let roupasIds = data.res.rows.item(i).roupas_id.toString();
	          let statusUso = data.res.rows.item(i).status_uso;

	          var id_roupa = roupasIds.split(",");

	          roupas_opcoes = this.getRoupas(id_roupa)
	          this.opcoes.push({
	          	id: id_opcao,
	          	status: statusUso === 'true' ? 'true' : null,
	          	uso: statusUso === 'true' ? 'Em uso' : "Usar", 
	          	return: statusUso === 'true' ? null : "true", 
	          	roupas: roupas_opcoes
	          })
	        }
	      }
		})
		loader.dismiss();
    }, 6500);
  }

  public getRoupas(id_roupa){
  	let roupas = []
  	for(var j = 0; j<id_roupa.length;j++){
		this.sqlStorage.getOpcaoRoupas(id_roupa[j]).then(data_option =>{
	      	let hasDataOption = data_option == 0 ? 0 : 1;

	      	if (hasDataOption >= 1){
	      	 	for(let k = 0; k < data_option.res.rows.length; k++){
	      	 		let id_roupa = data_option.res.rows.item(k).id;
					let descricao = data_option.res.rows.item(k).value.toString();
					let statusCesto = data_option.res.rows.item(k).status_cesto;
					let imgRoupa = data_option.res.rows.item(k).img_roupa;
					let status;
					let color;

					if(statusCesto === "true"){
						status = "Sujo";
						color = 'danger';
					}else{
						status = "Limpo";
						color = 'secondary'
					}

					roupas.push({
						id_roupa: id_roupa,
						descricao: descricao,
						statusCestoDescription: status,
						statusCesto: statusCesto,
						imgRoupa: imgRoupa,
						color_status: color
					});
	  
	      	 	}

	      	}
	    })
	}

	return roupas
  }

  public use(id){  	
  	this.sqlStorage.useOpcao(id).then(data =>{
  		this.initialize();
  	});

  }

  useConfirm(id){
    let alert = this.alertCtrl.create({
      title: 'Usar opção de roupa',
      message: 'Você deseja usar essa opção?',
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
          text: 'Usar',
          handler: () => {
            this.use(id);
          }
        }
      ]
    });
    alert.present();
  }


  public remove(id){
    this.sqlStorage.removeOpcao(id);
    this.removeToast();
    this.initialize();
  }

  removeConfirm(id) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar Exclusão',
      message: 'Você realmente deseja excluir essa opcao?',
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

  public removeToast(){
    let toast = this.toastCtrl.create({
      message: 'Opcao Excluida com sucesso!',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    toast.present();
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
