import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  //root='http://192.168.7.100/librarywebapi/';
  root="http://101.200.58.3/librarywebapi/";
  constructor(public http:HttpClient) { }

  getOrderList():Observable<any>{
    return this.http.get(this.root+'Transaction/GetAllBorrowRecords');
  }
  sendOrder(param:any):Observable<any>{
    return this.http.get(this.root+'Transaction/Distribution?orderId='+param);
  }
  returnOrder(param:any):Observable<any>{
    return this.http.get(this.root+'Transaction/ReturnBook?',{ params : param });
  }
}
