import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book:any={};
  constructor(public location:Location) { }

  ngOnInit() {
    this.book=JSON.parse(sessionStorage.getItem('bookDetail'));
  }
}
