import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {
  constructor(public http:HttpClient) { }
   //root='http://192.168.7.100/htmlprojectwebapi/';
 root='http://101.200.58.3/htmlprojectwebapi/';
  getLogin(user:any):Observable<any>{
    return this.http.post(this.root+'account/login',user);
  }
}
