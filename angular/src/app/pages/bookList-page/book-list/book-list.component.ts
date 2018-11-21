import {Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from "../../../services/book.service";
import {CategoryService} from "../../../services/category.service";
import {Router} from "@angular/router";
import {BookStorageComponent} from "../book-storage/book-storage.component";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books:any[]=[];
  publishers:any[]=[];
  categories:any[]=[];
  tempBook:any[]=[];

  filters:any={
    publisherId:0,
    categoryId:0,
    keyword:'',
  };
  pageIndex:number=0;
  pageSize:number=10;
  totalPages:number=0;
  pages:any[]=[];
  temp:any[]=[];

  @ViewChild('storageDialog')
  storageDialog:BookStorageComponent;

  constructor(public bookService:BookService,public categoryService:CategoryService,public router:Router) { }

  ngOnInit() {
    this.loadBookList();
    this.bookService.getPublisherList().subscribe((res:any)=>{
      if (res.Code==100){
        res.Data.unshift({Id:0,Name:'全部出版社'});
        this.publishers=res.Data;
      }
    });
    this.categoryService.getCategoryList().subscribe((res:any)=>{
      if (res.Code==100){
        res.Data.unshift({Id:0,Name:'全部图书分类'});
        this.categories=res.Data;
      }
    });
  }
  loadBookList(){
    this.bookService.getBookList().subscribe((res:any)=>{
      if (res.Code==100){
        this.books=res.Data;
        this.tempBook=res.Data;
        this.createIndex(this.tempBook);
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
    this.temp=this.tempBook.slice(pageBegin,pageEnd);
  }

  //筛选
  btnSearch_onclick():void{
    this.tempBook=this.filterData();
    this.pages=[];
    this.createIndex(this.tempBook);
    this.pageIndex=0;
    this.changeIndex(this.pageIndex);
  }

  filterData(){
    let result=Array.from(this.books);
    if(this.filters.keyword!=''){
      result=result.filter((item:any)=>{
        return item.Book.Name.includes(this.filters.keyword);
      });
    }
    if (this.filters.categoryId!=0){
      result=result.filter((item:any)=>{
        return item.Book.Category.Id==this.filters.categoryId;
      });
    }
    if (this.filters.publisherId!=0){
      result=result.filter((item:any)=>{
        return item.Book.Publisher.Id==this.filters.publisherId;
      });
    }
    return result;
  }


  btnAddBook_onclick():void{
    this.router.navigateByUrl('main/bookAdd');
  }
  btnDetail_onclick(item:any):void{
    this.router.navigateByUrl('main/bookDetail');
    sessionStorage.setItem('bookDetail',JSON.stringify(item));
  }
  btnEdit_onclick(item:any):void{
    this.router.navigateByUrl('main/bookEdit');
    sessionStorage.setItem('bookEdit',JSON.stringify(item));
  }

  btnStorage_onclick(item:any):void{
    this.storageDialog.show(item);
  }
  btnStorageDialog_onclick(){
    this.loadBookList();
  }
}
