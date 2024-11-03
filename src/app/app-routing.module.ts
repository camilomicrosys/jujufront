import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from '../app/components/dashboard/dashboard.component'
import {LoginComponent} from '../app/components/login/login.component'



//protector de rutas
import { authGuard } from './shared/auth.guard';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},

  {path:'inicio',component:DashboardComponent,canActivate:[authGuard]},
 
  
  // Ruta comodín para manejar rutas no coincidentes
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
