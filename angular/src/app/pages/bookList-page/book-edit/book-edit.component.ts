import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {BookService} from "../../../services/book.service";
import {CategoryService} from "../../../services/category.service";
import {ReaderService} from "../../../services/reader.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  publishers:any[]=[];
  categories:any[]=[];
  authors:any[]=[];
  currentBook:any={};
  book:any={
    image:null,
    name:'',
    isbn:'',
    publisherDate:'',
    categoryId:'',
    publisherId:'',
    authorId:'',
    introduce:''
  };
  images:any[]=['image/png','image/jpeg'];
  lblMessage:string='';
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

    this.currentBook=JSON.parse(sessionStorage.getItem('bookEdit'));
    this.book.image=this.currentBook.Book.Image;
    this.book.name=this.currentBook.Book.Name;
    this.book.isbn=this.currentBook.Book.ISBN;
    this.book.publisherDate=this.currentBook.Book.PublishDate;
    this.book.publisherId=this.currentBook.Book.Publisher.Id;
    this.book.categoryId=this.currentBook.Book.Category.Id;
    this.book.authorId=this.currentBook.Book.Author.Id;
    this.book.introduce=this.currentBook.Book.Introduce;
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
        this.book.image=img.src;
      }
      img.src=e.target.result;
    }
    fileReader.readAsDataURL(file);
    this.currentBook.Book.Image=file;
  }


  btnSave_onclick(e:any):void{
    this.currentBook.Book.Name=this.book.name;
    this.currentBook.Book.PublishDate=this.book.publisherDate;
    this.currentBook.Book.Publisher.Id=this.book.publisherId;
    this.currentBook.Book.Category.Id=this.book.categoryId;
    this.currentBook.Book.Author.Id=this.book.authorId;
    this.currentBook.Book.Introduce=this.book.introduce;
    console.log(this.currentBook);
    e.data=this.currentBook;
    this.bookService.updateBook(e.data).subscribe((res:any)=>{
      if (res.Code==100){
        this.router.navigateByUrl('main/bookList');
      }
    });
  }
}
