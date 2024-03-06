import { Observable } from "rxjs";
import { GLOBAL } from './GLOBAL';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public url;


  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  list_client_admin_filter(tipo: any, filtro: any, token: any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this._http.get(this.url+'list_client_admin_filter/'+tipo+'/'+filtro, {headers:headers});
  }

  register_client_admin(data: any, token: any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this._http.post(this.url+'register_client_admin/', data, {headers:headers});
  }

  get_client_admin(id: any, token: any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this._http.get(this.url+'get_client_admin/'+id, {headers:headers})
  }

  update_client_admin(id: any, data: any, token: any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this._http.put(this.url+'update_client_admin/'+id, data, {headers:headers})
  }

  delete_client_admin(id: any, token: any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this._http.delete(this.url+'delete_client_admin/'+id, {headers:headers})
  }
}