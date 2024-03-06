import { Component } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductService } from 'src/app/services/product.service';

declare var iziToast:any;

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styleUrls: ['./index-product.component.css']
})
export class IndexProductComponent {

  public page = 1;
  public pageSize = 20;
  public loadData = true;
  public filter = '';
  public token;
  public products : Array<any> = [];
  public url;

  constructor(
    private _productService : ProductService
  ){
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
  }

  ngOnInit(): void{
    this.init_data();
  }

  init_data(){
    this._productService.list_product_filter_admin(this.filter, this.token).subscribe(
      response =>{
        console.log(response);
        this.products = response.data;
        this.loadData = false;
      }, 
      error =>{
        console.log(error);
      }
    )
  }

  Mfilter(){
    if(this.filter){
      this.init_data();

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        color: '#FFF',
        position: 'topRight',
        message: 'Add a filter'
      });
    }
  }

  reset(){
    this.filter = '';
    this.init_data();

  }

}
