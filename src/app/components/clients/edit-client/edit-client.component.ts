import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';

declare var iziToast:any;

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {

  public token: any;
  public client:any = {};
  public id: any;
  public loadBtn = false;
  public loadData = true;

  constructor(
    private _route: ActivatedRoute,
    private _clientService: ClientService,
    private _adminService: AdminService,
    private _router: Router
  ){
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void{
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];    
        this._clientService.get_client_admin(this.id, this.token).subscribe(
          response=>{
            console.log(response);
            if(response.data == undefined){
              this.client = undefined;
              this.loadData = false;
            } else {
              this.client = response.data;
              this.loadData = false;
            }
          }
        )
      }
    )
  }


  update(updateForm:any){
    if(updateForm.valid){
      this.loadBtn = true;
      this._clientService.update_client_admin(this.id, this.client, this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            color: '#FFF',
            position: 'topRight',
            message: 'Client successfully updated'
          });
          this.loadBtn = false;
          this._router.navigate(['/panel/client'])
        }
      )
    }else{
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

}
