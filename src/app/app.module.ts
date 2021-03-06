import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { Roupa } from '../pages/list/roupa';
import { ListPage} from '../pages/list/list-page';
import {ModalRegisterPage} from '../pages/list/modal-register-page';
import {ModalEditPage} from '../pages/list/modal-edit-page';

import { Parte } from '../pages/parte/parte';
import {ModalParteRegister} from '../pages/parte/modal-parte-register';
import {ListPartePage} from '../pages/parte/list-parte-page';
import {ModalEditParte} from '../pages/parte/modal-edit-parte';

import { Categoria } from '../pages/categoria/categoria';
import {ModalCategoriaRegister} from '../pages/categoria/modal-categoria-register';
import {ListCategoriaPage} from '../pages/categoria/list-categoria-page';
import {ModalEditCategoria} from '../pages/categoria/modal-edit-categoria';

import {ModalOpcaoRegister} from '../pages/opcao/modal-opcao-register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { SqlStorage } from '../providers/sql-storage';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Roupa,
    Parte,
    ListPage,
    ModalRegisterPage,
    ModalEditPage,
    ModalParteRegister,
    ListPartePage,
    ModalEditParte,
    Categoria,
    ModalCategoriaRegister,
    ListCategoriaPage,
    ModalEditCategoria,
    ModalOpcaoRegister
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Roupa,
    Parte,
    ListPage,
    ModalRegisterPage,
    ModalEditPage,
    ModalParteRegister,
    ListPartePage,
    ModalEditParte,
    Categoria,
    ModalCategoriaRegister,
    ListCategoriaPage,
    ModalEditCategoria,
    ModalOpcaoRegister
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite, 
    SqlStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]

})

export class AppModule {}
