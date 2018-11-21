import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-book-category-add',
  templateUrl: './book-category-add.component.html',
  styleUrls: ['./book-category-add.component.css']
})
export class BookCategoryAddComponent implements OnInit {

  state:boolean=false;
  newCategory:any={
    image:null,
    name:''
  }

  srcPath:string='assets/img/login-01.jpg';
  cateName:string;
  lblMessage:string='';
  images:any[]=['image/png','image/jpeg'];

  @Output()
  afterAdd:EventEmitter<any>=new EventEmitter<any>();

  constructor(public categoryService:CategoryService) { }

  ngOnInit() {
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
        this.srcPath=img.src;
      }
      img.src=e.target.result;
    }
    fileReader.readAsDataURL(file);
    this.newCategory.image=file;
  }
  show(){
    this.state=true;
  }
  btnConfirm(e:any){
    this.state=false;
    this.newCategory.name=this.cateName;
    e.data=this.newCategory;
    this.categoryService.addCategoryList(e.data).subscribe((res:any)=>{
      console.log(res);
      if(res.Code==100){
        this.afterAdd.emit(e);
      }
    });
    this.cateName='';
    this.srcPath='../assets/img/login-01.jpg';
  }
  btnCancel(){
    this.state=false;
  }
}
