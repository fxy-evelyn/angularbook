import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  userName:string="管理员";
  constructor(public router:Router) { }

  ngOnInit() {
    let user=JSON.parse(sessionStorage.getItem('user'));
    this.userName=user.TrueName;
  }
  btnClear_onclick(){
    this.router.navigateByUrl('welcome');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('pwd');
    this.userName="管理员";
  }
}
