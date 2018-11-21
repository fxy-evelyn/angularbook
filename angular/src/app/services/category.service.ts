import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryInfo} from "../infos/category-info";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //root='http://192.168.7.100/librarywebapi/';
  root='http://101.200.58.3/librarywebapi/';
  constructor(public http:HttpClient) { }

  getCategoryList():Observable<any>{
    return this.http.get(this.root+'category/list');
  }

  addCategoryList(addcategory:any):Observable<any>{
    let formData=new FormData();
    formData.append('name',addcategory.name);
    formData.append('icon',addcategory.image);
    return this.http.post(this.root+'category/create',formData);
  }

  updateCategoryList(category:any):Observable<any>{
    let formData=new FormData();
    formData.append('id',category.id);
    formData.append('name',category.name);
    formData.append('icon',category.image);
    return this.http.post(this.root+'category/update',formData);
    // return this.http.post(this.root+'category/update',category);
  }
}
