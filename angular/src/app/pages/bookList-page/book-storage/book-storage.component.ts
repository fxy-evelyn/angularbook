import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BookService} from "../../../services/book.service";

@Component({
  selector: 'app-book-storage',
  templateUrl: './book-storage.component.html',
  styleUrls: ['./book-storage.component.css']
})
export class BookStorageComponent implements OnInit {
  state:boolean=false;
  storageCount:number=0;
currentBook:any={};
  storage:any={};
  @Output()
  afterStorage:EventEmitter<any>=new EventEmitter<any>();

  constructor(public bookService:BookService) { }
  ngOnInit() {
  }
  show(item:any){
    this.currentBook=item;
    console.log(item);
    this.state=true;
  }
  btnConfirm(e:any):void{
    this.state=false;
    this.storage.count=this.storageCount;
    this.storage.bookId=this.currentBook.Book.Id;
    this.storage.libraryId='2778563a-9ed3-11e7-9297-002522cc5ae9';
    e.data=this.storage;
    this.bookService.storageBook(e.data).subscribe((res:any)=>{
     if (res.Code==100){
       this.state=false;
       this.afterStorage.emit(e);
       this.storageCount=0;
     }
    });
  }
  btnCancel():void{
    this.state=false;
  }
}
