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