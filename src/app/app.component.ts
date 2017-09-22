import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';


import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  token:string;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    storage: Storage,
    public events:Events
  ){
    //当storage准备就绪之后，从storage中读取token
    //如果token存在的话直接跳到主页面中
    //如果token不存在的话进入登录页面
    storage.ready().then(()=>{
      storage.get('token').then(
        (token:string)=>{
          if(token!=null){
            console.log('token:'+token);
            this.rootPage = TabsPage;
          }else{
            console.log('token undefined');
            this.rootPage = LoginPage;
          }
        }
      );
    });

    //真机调试必要代码
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //ionic.Platform.setPlatform('ios');
    });
    //当用户的操作为user:login时rootPage的取值为TabsPage
    this.events.subscribe('user:login', (params) => {
      console.log('User logged in - Changing to tabs page');
      this.rootPage = TabsPage;
    });
    //当用户的操作为user:logout时rootPage的取值为LoginPage
    this.events.subscribe('user:logout', (params) => {
      console.log('User logout');
      this.rootPage = LoginPage;
    });
  }
}
