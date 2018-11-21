import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-book-delivery',
  templateUrl: './book-delivery.component.html',
  styleUrls: ['./book-delivery.component.css']
})
export class BookDeliveryComponent implements OnInit {
  list:any[]=[];
  pageIndex:number=0;
  pageSize:number=10;
  totalPages:number=0;
  pages:any[]=[];
  temp:any[]=[];
  constructor(public orderService:OrderService) { }

  ngOnInit() {
    this.loadOrderData();
  }
  loadOrderData(){
    this.orderService.getOrderList().subscribe((res:any)=>{
      if (res.Code==100){
        for(let i=0;i<res.Data.length;i++){
          if (res.Data[i].State==1){
            this.list.push(res.Data[i]);
          }
        }
        this.createIndex(this.list);
        this.changeIndex(this.pageIndex);
      }
    });
  }

  createIndex(data:any){
    this.totalPages=Math.ceil(data.length/this.pageSize);
    for(let i=0;i<this.totalPages;i++){
      this.pages.push(i);
    }
  }
//页面点击切换
  changeIndex(page:number):void{
    this.pageIndex=page;
    let pageBegin=this.pageSize*this.pageIndex;
    let pageEnd=this.pageSize*(this.pageIndex+1);
    this.temp=this.list.slice(pageBegin,pageEnd);
  }

  getState(state:number){
    if(state==1){
      return '已提交';
    }
    if (state==2){
      return '已配送';
    }
    if (state==3){
      return '已确认';
    }
    if (state==4){
      return '已归还';
    }
  }

  btnSend_onclick(item:any,index){
    this.orderService.sendOrder(item.Id).subscribe((res:any)=>{
      if (res.Code==100){
        // let index = this.list.findIndex((listItem:any) => listItem.Id === item.Id);
        this.temp.splice(index ,1);
      }
    });
  }
}
