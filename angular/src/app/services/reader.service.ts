import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReaderService {
  //root='http://192.168.7.100/librarywebapi/';
  root='http://101.200.58.3/librarywebapi/';
  constructor(public http:HttpClient) { }

  getRaderList():Observable<any>{
     return this.http.get(this.root+'member/list');
  }
  getAuthorList():Observable<any>{
    return this.http.get(this.root+'author/list');
  }
}
