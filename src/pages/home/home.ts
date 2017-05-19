import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListRoupa } from '../list/list';
import { Parte } from '../parte/parte';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController) {
	  	
	}

 	ListRoupa(){
	    //push another page onto the history stack
	    //causing the nav controller to animate the new page in
	    this.navCtrl.push(ListRoupa);
	}


 	Parte(){
	    //push another page onto the history stack
	    //causing the nav controller to animate the new page in
	    this.navCtrl.push(Parte);
	}
}
