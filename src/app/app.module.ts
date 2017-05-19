import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListRoupa } from '../pages/list/list';
import { ModalListPage} from '../pages/list/modal-list-page';
import {ModalRegisterPage} from '../pages/list/modal-register-page';
import { Parte } from '../pages/parte/parte';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { SqlStorage } from '../providers/sql-storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListRoupa,
    Parte,
    ModalListPage,
    ModalRegisterPage
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
    ListRoupa,
    Parte,
    ModalListPage,
    ModalRegisterPage
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
