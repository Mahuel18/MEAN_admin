import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';

declare var iziToast:any;

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {
  public client : any = {
    genre: '',
  };
  public token: any;
  public loadBtn = false;

  constructor(
    private _clientService: ClientService,
    private _adminService: AdminService,
    private _router: Router
  ){
    this.token = this._adminService.getToken();
  }

  registro(registroForm:any){
    if(registroForm.valid){
      this.loadBtn = true;
      this._clientService.register_client_admin(this.client, this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            color: '#FFF',
            position: 'topRight',
            message: 'Client successfully registered'
          });

          this.client = {
            genre : '',
            name: '',
            lastname: '',
            email: '',
            phone:'',
            dbo: '',
            dni:''                     
          }
          this.loadBtn = false;
          this._router.navigate(['/panel/client'])
        }
      )
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        color: '#FFF',
        position: 'topRight',
        message: 'The Form Data are not valid'
      });
    }
  };

}
