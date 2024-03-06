import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from "./guards/admin.guard";
//Clients Imports
import { IndexClientComponent } from './components/clients/index-client/index-client.component';
import { CreateClientComponent } from './components/clients/create-client/create-client.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
//Products Imports
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';


const appRoute : Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, canActivate: [AdminGuard]},
    {path: 'panel', children:[
        //Clients Related Components
        {path: 'client', component: IndexClientComponent, canActivate: [AdminGuard]},
        {path: 'client/register', component: CreateClientComponent, canActivate: [AdminGuard]},
        {path: 'client/:id', component: EditClientComponent, canActivate: [AdminGuard]},

        //Products Related Components
        {path: 'product/register', component: CreateProductComponent, canActivate: [AdminGuard]},
        {path: 'product', component: IndexProductComponent, canActivate: [AdminGuard]},
        {path: 'product/:id', component: UpdateProductComponent, canActivate: [AdminGuard]},

    ]},
    {path: 'login', component: LoginComponent}
]

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoute);