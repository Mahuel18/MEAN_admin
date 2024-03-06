import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service';

declare var iziToast:any;
declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  public product: any = {
    categoria: ''
  };
  public file: File | undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
  public config : any = {};
  public token: any;
  public loadBtn = false;


  constructor(private _productService : ProductService, private _adminService: AdminService, private _router: Router){
    this.config = {
      height : 500
    }
    this.token = this._adminService.getToken();
    
  }

  register(registerForm:any){
    if(registerForm.valid){
      if(this.file == undefined){
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          color: '#FFF',
          position: 'topRight',
          message: 'Must upload a Picture'
        });
        this.loadBtn = false;
        $('#input-portada').text('Seleccionar una imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;
      } else {
        console.log(this.product);
      console.log(this.file);
      this.loadBtn = true;

      this._productService.add_product_admin(this.product, this.file, this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            color: '#FFF',
            position: 'topRight',
            message: 'Product successfully registered'
          });
          this.loadBtn = false;
          this._router.navigate(['/panel/product']);
        }
      )
      }
      
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        color: '#FFF',
        position: 'topRight',
        message: 'The Form Data are not valid'
      });
      this.loadBtn = false;
      $('#input-portada').text('Seleccionar una imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
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
