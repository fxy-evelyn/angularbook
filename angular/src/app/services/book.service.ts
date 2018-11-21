import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  //root='http://192.168.7.100/librarywebapi/';
  root="http://101.200.58.3/librarywebapi/";
  constructor(public http:HttpClient) { }
  getBookList():any{
    return this.http.get(this.root+'book/list');
  }
  getPublisherList():any{
    return this.http.get(this.root+'publisher/list');
  }

  addBook(book:any):Observable<any>{
    let formData=new FormData();
    formData.append('isbn',book.isbn);
    formData.append('name',book.name);
    formData.append('publishDate',book.publishDate);
    formData.append('categoryId',book.categoryId);
    formData.append('publisherId',book.publisherId);
    formData.append('authorId',book.authorId);
    formData.append('introduce',book.introduce);
    formData.append('image',book.image);
    return this.http.post(this.root+'book/create',formData);
  }
  updateBook(book:any):Observable<any>{
    let formData=new FormData();
    formData.append('id',book.Book.Id);
    formData.append('isbn',book.Book.ISBN);
    formData.append('name',book.Book.Name);
    formData.append('publishDate',book.Book.PublishDate);
    formData.append('categoryId',book.Book.Category.Id);
    formData.append('publisherId',book.Book.Publisher.Id);
    formData.append('authorId',book.Book.Author.Id);
    formData.append('introduce',book.Book.Introduce);
    formData.append('image',book.Book.Image);
    return this.http.post(this.root+'book/update',formData);
  }

  storageBook(book:any):Observable<any>{
    let formData=new FormData();
    formData.append('bookId',book.bookId);
    formData.append('count',book.count);
    formData.append('libraryId',book.libraryId);
    return this.http.post(this.root+'book/putaway',formData);
  }
}
