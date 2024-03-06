import { GLOBAL } from './GLOBAL';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url;


  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  add_product_admin(data: any, file: any, token: any):Observable<any>{
    let headers = new HttpHeaders({'Authorization': token});
    const fd = new FormData();
  
    fd.append('name', data.name);
    fd.append('stock', data.stock);
    fd.append('price', data.price);
    fd.append('description', data.description);
    fd.append('content', data.content);
    fd.append('category', data.category);
    fd.append('portada', file);
    return this._http.post(this.url+'add_product_admin/', fd, {headers:headers});
  }
  
  list_product_filter_admin(filter: any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url+'list_product_admin/'+filter, {headers:headers});
  }

  get_product_admin(id: any, token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url+'get_product_admin/'+id, {headers:headers});
  }

  update_product_admin(data: any, id: any, token: any):Observable<any>{
    if(data.portada){
      let headers = new HttpHeaders({'Authorization': token});
      const fd = new FormData();
  
      fd.append('name', data.name);
      fd.append('stock', data.stock);
      fd.append('price', data.price);
      fd.append('description', data.description);
      fd.append('content', data.content);
      fd.append('category', data.category);
      fd.append('portada', data.portada);
      return this._http.put(this.url+'update_product_admin/'+id, fd, {headers:headers});
    } else {
      let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
      return this._http.put(this.url+'update_product_admin/'+id, data, {headers:headers});
    }
  }
}
