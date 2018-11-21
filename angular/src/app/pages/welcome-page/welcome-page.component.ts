import { Component, OnInit } from '@angular/core';
import {WelcomeService} from "../../services/welcome.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
data:any={
  phone:'',
  password:''
};
  lblPhone:string='';
  lblPassword:string='';

  constructor(public welcomeService:WelcomeService,public router:Router) { }

  ngOnInit() {
  }
  checkPhone():boolean{
    let pattern=/^1[3578]\d{9}$/;
    if(this.data.phone.length==0){
      this.lblPhone='手机号不能为空';
      return false;
    }
    if(!pattern.test(this.data.phone)){
      this.lblPhone='手机号格式不正确，请输入有效手机号';
      return false;
    }
    this.lblPhone='';
    return true;
  }
  // 密码有误，请输入正确密码
  checkPassword():boolean{
    let pattern=/^\d{4}$/;
    if(this.data.password.length==0){
      this.lblPassword='密码不能为空';
      return false;
    }
    if(!pattern.test(this.data.password)){
      this.lblPassword='密码格式不正确，请输入有效密码';
      return false;
    }
    this.lblPassword='';
    return true;
  }
  btnLogin_onclick(){
    this.checkPhone();
    this.checkPassword();
    if(this.checkPhone()&&this.checkPassword()){

      this.welcomeService.getLogin(this.data).subscribe((res:any)=>{
        console.log(res);
          if (res.Code==100){
            sessionStorage.setItem('pwd',this.data.password);
            sessionStorage.setItem('user',JSON.stringify(res.Data));
            this.lblPhone='';
            this.lblPassword='';
            this.router.navigate(['main']);
          }
          else{
            this.lblPassword='信息不匹配';
          }
      });
    }
  }
}
