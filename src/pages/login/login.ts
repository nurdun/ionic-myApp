import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(
       public navCtrl: NavController,
       public events: Events,
       public storage: Storage
    ){  
  }
  // login:{
  //   userName:'' ,
  //   passWord:''
  // }
  isShow = false;

  onlogin(userName:HTMLInputElement,passWord:HTMLInputElement){
    let validator:RegExp = /^[A-Za-z0-9]{6,32}$/;
    let userValid = validator.test(userName.value);
    if(userValid){
      console.log(userName.value);
      this.isShow = false;
      this.storage.set('token', userName.value).then(()=>{
        console.log('Stored token: ' + userName.value);
      }); 
      this.events.publish('user:login', {
        //token: 'succed'
      });
    }else{
      this.isShow = true; 
    }
  }
  onSubmit(form) {
    //debugger
    console.log(form.value);  // { first: '', last: '' }
    //console.log(form.valid);  // false
  }
  
}
