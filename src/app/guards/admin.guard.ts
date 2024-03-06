import { Injectable } from "@angular/core";
import { AdminService } from "../services/admin.service";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AdminGuard{
  constructor(
    private _adminService:AdminService,
    private _router:Router,
  ){}

  canActivate():any{
    if(!this._adminService.isAuthenticated(['admin'])){
      this._router.navigate(['/login']);
      return false; 
    }
    return true;
  }
}