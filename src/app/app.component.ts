import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { JPush } from 'ionic3-jpush';
import { Push, PushObject, PushOptions } from '@ionic-native/push';



import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  token:string;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public storage: Storage,
    public events:Events,
    public jPush: JPush
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
      //jPush推送消息部分
      if(this.platform.is('ios')){
        this.initPushNotification();
      }else if(this.platform.is('android')){

      }else{

      }

      this.jPush.init()
      .then(res => console.log(res))
      
      this.jPush.getRegistrationID()
      .then(res => console.log(res))
      
      this.jPush.openNotification()
      .subscribe( res => {
        console.log('收到推送');
        console.log(res)
      });

      this.jPush.receiveNotification()
        .subscribe( res => {
          console.log('收到推送');
          console.log(res)
      });

      this.jPush.receiveMessage()
        .subscribe( res => {
          console.log('收到推送');
          console.log(res)
      });
    });



    this.jPush.getRegistrationID().then(regid => {
      console.log(regid)
    })

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
    let push = PushNotification.init({
      android: {
      },
        browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        },
      ios: {
        alert: "true",
        badge: true,
        sound: 'false'
      },
      windows: {}
    });

    push.on('registration', (data) => {
      console.log(data.registrationId);
    });
    
    push.on('notification', (data) => {
      console.log(data.message);
      console.log(data.title);
      console.log(data.count);
      console.log(data.sound);
      console.log(data.image);
      console.log(data.additionalData);
    });
    
    push.on('error', (e) => {
      console.log(e.message);
    });

  }
  initPushNotification() {
    
        if(!this.platform.is('cordova')) {
          console.warn('Push notifications only work on a real device');
          return;
        }
    
    const options: PushOptions = {
      ios: {
      alert: true,
      badge: true,
      sound: true
    }
  };
}
