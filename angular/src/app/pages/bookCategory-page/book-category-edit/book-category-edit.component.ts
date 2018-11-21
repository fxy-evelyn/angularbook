import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-book-category-edit',
  templateUrl: './book-category-edit.component.html',
  styleUrls: ['./book-category-edit.component.css']
})
export class BookCategoryEditComponent implements OnInit {
  currentCategory:any={
    id:'',
    image:'',
    name:''
  };

  srcPath:any;
  cateName:any;

  lblMessage:string='';
  images:any[]=['image/png','image/jpeg'];
  state:boolean=false;
  @Output()
  afterEdit:EventEmitter<any>=new EventEmitter<any>();

  constructor(public categoryService:CategoryService) { }

  ngOnInit() {
  }
  //显示
  show(item:any):void{
    this.state=true;

    this.currentCategory.image=item.Image;
    this.currentCategory.name=item.Name;
    this.currentCategory.id=item.Id;

    this.cateName=this.currentCategory.name;
    this.srcPath=this.currentCategory.image;
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
    this.currentCategory.image=file;
  }


  btnConfirm(e:any){
    this.state=false;
    this.currentCategory.name=this.cateName;
    e.data=this.currentCategory;
    this.categoryService.updateCategoryList(e.data).subscribe((res:any)=>{
      if(res.Code==100){
        this.afterEdit.emit(e);
      }
    });
  }
  btnCancel(){
    this.state=false;
  }
}
