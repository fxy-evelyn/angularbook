import { Component, OnInit } from '@angular/core';
import {ReaderService} from "../../../services/reader.service";

@Component({
  selector: 'app-reader-list',
  templateUrl: './reader-list.component.html',
  styleUrls: ['./reader-list.component.css']
})
export class ReaderListComponent implements OnInit {
  reader:any[]=[];
  tempReaders:any[]=[];
  keyword:string='';
  pageIndex:number=0;
  pageSize:number=10;
  totalPages:number=0;
  pages:any[]=[];
  temp:any[]=[];
  constructor(public readerService:ReaderService) { }

  ngOnInit() {
    this.readerService.getRaderList().subscribe((res:any)=>{
      if (res.Code==100){
        this.reader=res.Data;
        this.tempReaders=res.Data;
        this.createIndex(this.tempReaders);
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
    this.temp=this.tempReaders.slice(pageBegin,pageEnd);
  }

  //筛选
  btnSearch_onclick():void{
    this.tempReaders=this.filterData();
    this.pages=[];
    this.createIndex(this.tempReaders);
    this.pageIndex=0;
    this.changeIndex(this.pageIndex);
  }

  filterData(){
    let result=Array.from(this.reader);
    if(this.keyword!=''){
      result=result.filter((item)=>{
        return item.Name.includes(this.keyword);
      });
    }
    return result;
  }
}
