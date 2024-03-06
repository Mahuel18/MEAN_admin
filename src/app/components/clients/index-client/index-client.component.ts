import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';

declare var iziToast: any;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-client',
  templateUrl: './index-client.component.html',
  styleUrls: ['./index-client.component.css']
})
export class IndexClientComponent {

  public client : Array<any>=[];
  public filter_lastname = '';
  public email_filter='';
  public page = 1;
  public pageSize = 20;
  public token;
  public loadData = true;

  constructor(
    private _clienteService : ClientService,
    private _adminService : AdminService
  ){
    this.token = _adminService.getToken();
  }

  ngOnInit(): void{
    this.init_Data();
  }
  init_Data(){
    this._clienteService.list_client_admin_filter(null, null, this.token).subscribe(
      response=>{
        this.client = response.data;
        this.loadData = false;
      });
  };
  

  filtro(tipo:any){
    if(tipo == 'lastname'){
      if(this.filter_lastname){
        this.loadData = true;
        this._clienteService.list_client_admin_filter(tipo, this.filter_lastname, this.token).subscribe(
        response=>{
          this.client = response.data;
          this.loadData = false;
        });
      } else{
        this.init_Data();
      }
      
    } else if(tipo == 'email'){
      if(this.email_filter){
        this.loadData = true;
        this._clienteService.list_client_admin_filter(tipo, this.email_filter, this.token).subscribe(
        response=>{
          this.client = response.data;
          this.loadData = false;
        });
      } else {
        this.init_Data();
      }
    }
  }

  delete(id:any){
    this._clienteService.delete_client_admin(id, this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          class: 'text-success',
          color: '#FFF',
          position: 'topRight',
          message: 'Client successfully deleted'
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.init_Data();
      }
    )
  }
}
