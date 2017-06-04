import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Camera} from '@ionic-native/camera';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {SqlStorage} from '../../providers/sql-storage';



@Component({
  templateUrl: 'modal-register-page.html',
  providers: [[Camera]]
})


export class ModalRegisterPage {
	
  options:any;
  roupa = {};
  public base64Image: string;
  partesRoupa: Array<Object>;
  categoriasRoupa: Array<Object>;
  constructor( 
    public params: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController, 
    public navCtrl: NavController,
    private camera: Camera,
    public toastCtrl: ToastController,
    public sqlStorage: SqlStorage
    ) { 
      this.getPartes();
      this.getCategorias();
      this.base64Image = "http://images.all-free-download.com/images/graphiclarge/clothes_icon_311340.jpg";
      this.roupa["statusCesto"] = true;

	}

  public add() {
    this.sqlStorage.set(this.roupa["descricao"],this.roupa["statusCesto"],this.base64Image,this.roupa["parte"],this.roupa["categoria"]);
    this.dismiss();
    this.presentToast();
  }

   public getPartes(){
    this.sqlStorage.getAllPartes().then(data =>{
      this.partesRoupa = [];
      let hasData = data == 0 ? 0 : 1;
      if (hasData >= 1){
        for(let i = 0; i <= data.res.rows.length; i++){
          let id = data.res.rows.item(i).id;
          let nome = data.res.rows.item(i).nome;
          let descricao = data.res.rows.item(i).descricao;
          this.partesRoupa.push({
             id: id,
             nome: nome,
             descricao: descricao,
          });
        }
      }
    })
  }

  public getCategorias() {
    this.sqlStorage.getAllCategorias().then(data =>{
      this.categoriasRoupa = [];
      let hasData = data == 0 ? 0 : 1;
      if (hasData >= 1){
        for(let i = 0; i <= data.res.rows.length; i++){
          let id = data.res.rows.item(i).id;
          let nome = data.res.rows.item(i).nome;
          let descricao = data.res.rows.item(i).descricao;
          let parte = data.res.rows.item(i).parte;
          this.categoriasRoupa.push({
             id: id,
             nome: nome,
             descricao: descricao,
             parte: parte
          });
        }
      }
    })
  }

	public takePicture(){
    this.options = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.VIDEO
    }
    this.camera.getPicture(this.options)
      .then((imageData)=>{
          this.base64Image = "data:image/jpeg;base64," + imageData;
      })
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Roupa cadastrada com sucesso!',
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