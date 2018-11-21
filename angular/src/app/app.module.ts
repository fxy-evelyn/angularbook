import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ReaderListComponent } from './pages/reader-page/reader-list/reader-list.component';
import { BookListComponent } from './pages/bookList-page/book-list/book-list.component';
import { BookCategoryListComponent } from './pages/bookCategory-page/book-category-list/book-category-list.component';
import { BookOrderListComponent } from './pages/bookOrder-page/book-order-list/book-order-list.component';
import { PersonalPageComponent } from './pages/personal-page/personal-page.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { BookCategoryEditComponent } from './pages/bookCategory-page/book-category-edit/book-category-edit.component';
import { BookCategoryAddComponent } from './pages/bookCategory-page/book-category-add/book-category-add.component';
import { BookAddComponent } from './pages/bookList-page/book-add/book-add.component';
import { BookDetailComponent } from './pages/bookList-page/book-detail/book-detail.component';
import { BookEditComponent } from './pages/bookList-page/book-edit/book-edit.component';
import { BookStorageComponent } from './pages/bookList-page/book-storage/book-storage.component';
import { BookDeliveryComponent } from './pages/bookOrder-page/book-delivery/book-delivery.component';
import { BookRestoreComponent } from './pages/bookOrder-page/book-restore/book-restore.component';
import { BookOtherComponent } from './pages/bookOrder-page/book-other/book-other.component';

const ROUTES : Routes=[
  {path:'',redirectTo:'welcome',pathMatch:'full'},
  {path:'welcome',component:WelcomePageComponent},
  {path:'main',component:MainPageComponent,children:[
      {path:'',redirectTo:'bookReader',pathMatch:'full'},
      {path:'bookReader',component:ReaderListComponent},
      {path:'bookCategory',component:BookCategoryListComponent},
      {path:'bookList',component:BookListComponent},
      {path:'bookAdd',component:BookAddComponent},
      {path:'bookDetail',component:BookDetailComponent},
      {path:'bookEdit',component:BookEditComponent},
      {path:'bookOrder',component:BookOrderListComponent,children:[
        {path:'',redirectTo:'bookDelivery',pathMatch:'full'},
        {path:'bookDelivery',component:BookDeliveryComponent},
        {path:'bookRestore',component:BookRestoreComponent},
        {path:'bookOther',component:BookOtherComponent}
      ]},
      {path:'personal',component:PersonalPageComponent},
    ]},
  {path:'**',component:NotFoundPageComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ReaderListComponent,
    BookListComponent,
    BookCategoryListComponent,
    BookOrderListComponent,
    PersonalPageComponent,
    NotFoundPageComponent,
    WelcomePageComponent,
    BookCategoryEditComponent,
    BookCategoryAddComponent,
    BookAddComponent,
    BookDetailComponent,
    BookEditComponent,
    BookStorageComponent,
    BookDeliveryComponent,
    BookRestoreComponent,
    BookOtherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
