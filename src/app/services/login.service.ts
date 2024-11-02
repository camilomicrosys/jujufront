import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) { }
 
  urlApi:string=environment.baseUrl;
  ulr:string='';
  

  procesarLogin(usuario: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      usuario: usuario,
      password: password
    };

    return this.http.post(`${this.urlApi}/api/jwt/login`, body, { headers });
  }
 
  //en el login ts llamo el metodo login alli valido si es exitoso llamo este para setearlocalstroage
  localStorageLoginExitoso(userData: { token: string, usuario: string,autenticado: boolean }): void {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
//este nos ayudaria para en los componentes que queramos peticionar a laravel ya 
//tengamos el token que esta en localstorage y el usuario autenticado
getToken(): string | null {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData).token : null;
}

getNombreUserAuth(): string | null {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData).usuario : null;
}

//este es para proteger las rutas que lo usamos en auth guards si es mayor cero es true de lo contrario false
isAut(): boolean {
  if (typeof localStorage !== 'undefined') {
    const userData = localStorage.getItem('userData');
    return userData ? true : false;
  } else {
    // En caso de que localStorage no esté definido (por ejemplo, durante la renderización del servidor), consideramos que el usuario no está autenticado.
    return false;
  }
}


 //ahora creamos 2 metodos el de deslogueo de laravel y el de eliminacion
 //del objeto local storage, pero primero se valida que el deslogin de laravel sea correcto antes de ejecutar dicho eliminacion del localstorage
 //recibimos el token que vamosa  desloguear
 //este no lo usamos con node solo el de abajo para eliminar el token de localstorage pero con laravel si se hacen ambos
 cerrarSesion(token:string): Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  });

  // No es necesario enviar un cuerpo en la solicitud POST para cerrar sesión
  return this.http.post<any>(this.urlApi + '/api/cerrar-sesion-vue', {}, { headers });
 }


 logoutLocalstorage(): void {
  localStorage.removeItem('userData');
}

}
