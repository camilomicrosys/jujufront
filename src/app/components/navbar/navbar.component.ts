import { Component, OnInit} from '@angular/core';
//para redirigir a login luego de cerrar sesion
import { Router } from '@angular/router';
//importamos el servicio login para cerrar sesion y para obtener el usaurio autenticado el nombre que ya lo tiene alla el servicio de login en un metodo que cree de getnombreuser auth
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
   
  //este es para almacenar el usaurio autenticado al ngOnInit  que ese dato lo sacamos abajo en una funcion que lo tiene del local storage
  //por que si el suario esta viendo este componente es por que ya se autentico
  //estas 2 van juntas una para asignar el dato de local storage de la funcion abajo que se retorna un json y lo asignamos aca y luego de ese localstorage le sacamos el usuario y lo asignamos a string nombre y ya
  nombreUserAuth:string='';
  nombreLocalstorage:any={};
  

  constructor(private _LoginService:LoginService, private router: Router ){}
  visible: boolean = false;
  sidebarVisible: boolean = false;
 //al montar el componente que salga el nombre del usaurio autenticado
  ngOnInit(){
    this.usuarioAutenticado();
  }

  showDialog() {
      this.visible = true;
  }

  //esta es para cerrar la cesion de angular es solo eliminar el token cuando es con node del localstorage, pero cuando es con laravel se consume api de eliminar token y luego esta de eliminar del local storage
  cerrarSesion(){
    //como este metodo en servicio no es funcion observable sino que es void queda asi sinsubscribe data=>
    this._LoginService.logoutLocalstorage();
    // Redirigir a la página de inicio de sesión u otra página según tu aplicación
    this.router.navigate(['/login']);

     
  }

  //obtenemos el nombre del usuario autenticado que ya lo teniamos en local storage alla creamos la funcion para sacar el nombre en service login
  usuarioAutenticado(){
    //como get token no es un api sino que es retornar algo del local storage no lleva subscribe sino que accede directo al json del local storage
    //este no lleva suscribe por que no es api es solo retornar los datos del local storage
   this.nombreLocalstorage=this._LoginService.getNombreUserAuth();
   //como ya tenemos el objeto del storage asignamos el nombre a la variable string
   //es extraño estos son los pasos se guarda en esa variable typo json y aca se le asigna al string y funciona no se pero esta se retorna interna como string pero inicialmnete se debe guardar en una tipo objeto
   this.nombreUserAuth=this.nombreLocalstorage;
   
  
    

   
    
  }

}
