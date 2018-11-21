import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {BookCategoryEditComponent} from "../book-category-edit/book-category-edit.component";
import {BookCategoryAddComponent} from "../book-category-add/book-category-add.component";

@Component({
  selector: 'app-book-category-list',
  templateUrl: './book-category-list.component.html',
  styleUrls: ['./book-category-list.component.css']
})
export class BookCategoryListComponent implements OnInit {
  categories:any[]=[];
  tempCategories:any[]=[];
  keyword:string='';
  currentCategory:any;
  pageIndex:number=0;
  pageSize:number=10;
  totalPages:number=0;
  pages:any[]=[];
  temp:any[]=[];
  @ViewChild('categoryEditDialog')
  categoryEditDialog:BookCategoryEditComponent;
  @ViewChild('categoryAddDialog')
  categoryAddDialog:BookCategoryAddComponent;


  constructor(public categoryService:CategoryService) { }

  ngOnInit() {
    this.loadData();
  }
  // 加载数据
  loadData():void{
    this.categoryService.getCategoryList().subscribe((res:any)=>{
      if (res.Code==100){
        this.categories=res.Data;
        this.tempCategories=res.Data;
        this.createIndex(this.tempCategories);
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
    this.temp=this.tempCategories.slice(pageBegin,pageEnd);
  }

//搜索
  btnSearch_onclick():void{
    this.tempCategories=this.filterData();
    this.pages=[];
    this.createIndex(this.tempCategories);
    this.pageIndex=0;
    this.changeIndex(this.pageIndex);
  }
  filterData(){
    let result=Array.from(this.categories);
    if(this.keyword!=''){
      result=result.filter((item)=>{
        return item.Name.includes(this.keyword);
      });
    }
    return result;
  }
  btnEdit_onclick(item:any):void{
    this.currentCategory=item;
    this.categoryEditDialog.show(item);
  }


  btnCategoryEditDialog_onclick(e:any){
    this.currentCategory=e.data;
    console.log(this.currentCategory);

    this.loadData();
  }
  btnCategoryAddDialog_onclick(e:any){
    this.loadData();
  }

  btnAdd_onclick():void{
    this.categoryAddDialog.show();
  }

}
