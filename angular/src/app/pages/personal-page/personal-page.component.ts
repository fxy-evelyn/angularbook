import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.css']
})
export class PersonalPageComponent implements OnInit {
  oldPassword:any='';
  newPassword:any='';
  confirmPassword:any='';
  lblOldMessage:string='';
  lblNewMessage:string='';
  lblConfirmMessage:string='';
  // lblOldMessage:string='旧密码输入不正确';
  // lblNewMessage:string='新密码格式不对';
  // lblConfirmMessage:string='两次密码输入不一致';
  constructor() { }

  ngOnInit() {

  }

  checkOldPassword(){
    let pwd=JSON.parse(sessionStorage.getItem('pwd'));
    if(this.oldPassword.length==0){
      this.lblOldMessage='旧密码不能为空';
      return false;
    }
    if(pwd!=this.oldPassword){
      this.lblOldMessage='旧密码输入不正确';
      return false;
    }
    this.lblOldMessage='';
    return true;
  }
  checkNewPassword(){
    let pattern=/^\d{4}$/;
    if(this.newPassword.length==0){
      this.lblNewMessage='新密码不能为空';
      return false;
    }
    if(!pattern.test(this.newPassword)){
      this.lblNewMessage='新密码格式不对,新密码为四位有效数字';
      return false;
    }
    this.lblNewMessage='';
    return true;
  }
  checkConfirmPassword(){
    if(this.confirmPassword.length==0){
      this.lblConfirmMessage='确认密码不能为空';
      return false;
    }
    if(this.confirmPassword!=this.newPassword){
      this.lblConfirmMessage='两次密码输入不一致';
      return false;
    }
    this.lblConfirmMessage='';
    return true;
  }

  btnConfirm_onclick():void{
    this.checkOldPassword();
    this.checkNewPassword();
    this.checkConfirmPassword();

    if(this.checkOldPassword() && this.checkNewPassword() && this.checkConfirmPassword()){
      this.lblOldMessage='';
      this.lblNewMessage='';
      this.lblConfirmMessage='';
    }
  }
  btnCancel_onclick():void{
    this.oldPassword='';
    this.newPassword='';
    this.confirmPassword='';
  }
}
