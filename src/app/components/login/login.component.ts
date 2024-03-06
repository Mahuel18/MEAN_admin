import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare var JQuery:any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user :any = {
    email:'',
    password:''
  };

  public usuario: any = {};
  public token: any = '';

  constructor(
    private _adminService:AdminService,
    private _router:Router,
  ){
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    if(this.token){
      this._router.navigate(['/'])
    } else {
      //DO Nothing
    }
  }

  login(loginForm:any){
    if(loginForm.valid){
      let data= {
        email: this.user.email,
        password: this.user.password,
      };
      this._adminService.login_admin(data).subscribe(
        response=>{
          if(response.data == undefined){
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              class: 'text-danger',
              color: '#FFF',
              position: 'topRight',
              message: response.message
            });
          } else {
            this.usuario = response.data;
            localStorage.setItem('token',response.token);
            localStorage.setItem('_id', response.data._id);

            this._router.navigate(['/']);
          }
        },
        error=>{
          console.log(error)
        }
      );
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
