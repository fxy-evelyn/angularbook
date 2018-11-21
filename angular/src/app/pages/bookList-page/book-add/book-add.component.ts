import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {BookService} from "../../../services/book.service";
import {CategoryService} from "../../../services/category.service";
import {ReaderService} from "../../../services/reader.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  book:any={
    srcPath:'assets/img/login-01.jpg',
    name:'',
    isbn:'',
    publishDate:'',
    categoryId:'',
    publisherId:'',
    authorId:'',
    introduce:''
  }
  publishers:any[]=[];
  categories:any[]=[];
  authors:any[]=[];
  lblMessage:string;
  images:any[]=['image/png','image/jpeg'];
  currentBook:any={
    isbn:'',
    name:'',
    publishDate:'',
    categoryId:'',
    publisherId:'',
    authorId:'',
    introduce:'',
    image:null
  };
  constructor(public location:Location,public bookService:BookService,public categoryService:CategoryService,public readService:ReaderService,public router:Router) {}

  ngOnInit() {
    this.bookService.getPublisherList().subscribe((res:any)=>{
      if (res.Code==100){
        this.publishers=res.Data;
      }
    });
    this.categoryService.getCategoryList().subscribe((res:any)=>{
      if (res.Code==100){
        this.categories=res.Data;
      }
    });
    this.readService.getAuthorList().subscribe((res:any)=>{
      if (res.Code==100){
        this.authors=res.Data;
      }
    });
  }
  fileChange(e:any){
    this.lblMessage='';
    let file:File=e.target.files[0];
    console.log(file);
    if (!this.images.includes(file.type)){
      this.lblMessage='文件格式不正确，只能为.png和.jpg';
      return;
    }

    if (file.size>=200*1024){
      this.lblMessage='文件大小不能超过200KB';
      return;
    }

    let fileReader:FileReader=new FileReader();
    fileReader.onload=(e:any)=>{
      let img:any=new Image();
      img.onload=(ev:any)=>{
        if(img.width!==img.height){
          this.lblMessage='图片比例1:1';
          return;
        }
        this.book.srcPath=img.src;
      }
      img.src=e.target.result;
    }
    fileReader.readAsDataURL(file);
    this.currentBook.image=file;
  }

  btnSave_onclick(e:any){
    this.currentBook.name=this.book.name;
    this.currentBook.isbn=this.book.isbn;
    this.currentBook.publishDate=this.book.publishDate;
    this.currentBook.publisherId=this.book.publisherId;
    this.currentBook.categoryId=this.book.categoryId;
    this.currentBook.authorId=this.book.authorId;
    this.currentBook.introduce=this.book.introduce;
    e.data=this.currentBook;
    this.bookService.addBook(e.data).subscribe((res:any)=>{
      if (res.Code==100){
        this.router.navigateByUrl('main/bookList');
      }
    });
    this.book={
      srcPath:'assets/img/login-01.jpg',
      name:'',
      isbn:'',
      publishDate:'',
      categoryId:'',
      publisherId:'',
      authorId:'',
      introduce:''
    };
  }
}
