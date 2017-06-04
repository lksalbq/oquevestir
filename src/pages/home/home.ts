import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { Roupa } from '../list/roupa';
// import { Parte } from '../parte/parte';
// import { Categoria } from '../categoria/categoria';
import {ModalOpcaoRegister} from '../opcao/modal-opcao-register';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

	constructor(public navCtrl: NavController) {
	  	
	}

 // 	ListRoupa(){
	//     //push another page onto the history stack
	//     //causing the nav controller to animate the new page in
	//     this.navCtrl.push(Roupa);
	// }


 // 	Parte(){
	//     //push another page onto the history stack
	//     //causing the nav controller to animate the new page in
	//     this.navCtrl.push(Parte);
	// }

	// Categoria(){
	//     //push another page onto the history stack
	//     //causing the nav controller to animate the new page in
	//     this.navCtrl.push(Categoria);
	// }

	Opcao(){
	    //push another page onto the history stack
	    //causing the nav controller to animate the new page in
	    this.navCtrl.push(ModalOpcaoRegister);
	}
}
