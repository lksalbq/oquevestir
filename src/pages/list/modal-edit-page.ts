import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Camera} from '@ionic-native/camera';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {SqlStorage} from '../../providers/sql-storage';



@Component({
  templateUrl: 'modal-edit-page.html',
  providers: [[Camera]]
})


export class ModalEditPage {
	
  options:any;
  private roupa = {};
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
    public sqlStorage: SqlStorage,
    ) {
    
    this.getPartes();
    this.getCategorias();
    this.roupa = this.params.get("roupa");
  }

  public update(){
    this.sqlStorage.update(this.roupa["id"],this.roupa["descricao"],this.roupa["statusCesto"],this.roupa["imgRoupa"]);
    this.dismiss();
    this.presentToast();
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
          this.roupa["imgRoupa"] = "data:image/jpeg;base64," + imageData;
      })
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
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Roupa atualizada com sucesso!',
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