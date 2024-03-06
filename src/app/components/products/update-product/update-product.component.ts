import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductService } from 'src/app/services/product.service';
declare var iziToast: any;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  public product : any = {};
  public config: any = {};
  public imgSelect : any| ArrayBuffer;
  public loadBtn = false;
  public id: any;
  public token: any;
  public url: any;
  public file: File | undefined = undefined;


  constructor(
    private _route : ActivatedRoute,
    private _productService : ProductService,
    private _router : Router
  ){
    this.config = {
      height: 500
    }
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
  }
  
  ngOnInit(): void{
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        console.log(this.id);
        this._productService.get_product_admin(this.id, this.token).subscribe(
          response => {
            if(response.data == undefined){
              this.product = undefined
            } else {
              this.product = response.data;
              this.imgSelect = this.url + 'get_portada/'+ this.product.portada;
            }
          },
          error => {
            console.log(error)
          }
        )
      }
    )
  }

  update(updateForm: any){
    if(updateForm.valid){
      var data: any = {};

      if(this.file != undefined){
        data.portada = this.file;
      }

      data.title = this.product.title;
      data.stock = this.product.stock;
      data.price = this.product.price;
      data.category = this.product.category;
      data.description = this.product.description;
      data.content = this.product.content;
      
      this.loadBtn = true;
      this._productService.update_product_admin(data, this.id, this.token).subscribe(
        response =>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            color: '#FFF',
            position: 'topRight',
            message: 'Product successfully updated'
          });
          this.loadBtn = false;
          this._router.navigate(['/panel/product']);
        },
        error => {
          console.log(error)
          this.loadBtn = false;
        }
      )
      

    } else {
      this.loadBtn = false;
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        color: '#FFF',
        position: 'topRight',
        message: 'The Form Data are not valid'
      });
    }

  }

  fileChangeEvent(event:any):void{
    var file : File;
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        color: '#FFF',
        position: 'topRight',
        message: 'No image found'
      });
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }

    if(file!.size <= 4000000){
      if(file!.type == 'image/png' || file!.type == 'image/webp' || file!.type == 'image/jpg' || file!.type == 'image/gif' || file!.type == 'image/jpeg'){
        const reader = new FileReader();
        reader.onload = e => this. imgSelect = reader.result;
        reader.readAsDataURL(file!);

        $('#input-portada').text(file!.name);
        this.file = file!;

      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          color: '#FFF',
          position: 'topRight',
          message: 'File must be an Image'
        });
        $('#input-portada').text('Seleccionar una imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;
      }

    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        color: '#FFF',
        position: 'topRight',
        message: 'Image cannot be larger than 4mb'
      });
      $('#input-portada').text('Seleccionar una imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
  }

}
