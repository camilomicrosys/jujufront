import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LibrosComponent} from '../app/components/libros/libros.component'
import {LoginComponent} from '../app/components/login/login.component'



//protector de rutas
import { authGuard } from './shared/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},

  {path:'inicio',component:LibrosComponent,canActivate:[authGuard]},
 
  
  // Ruta comodín para manejar rutas no coincidentes
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
