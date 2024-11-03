import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import {environment} from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  urlApi:string=environment.baseUrl;
  token: string | null = '';

  //creamos esta observable para saber cuando un componente deba consumir la api
  //de obtener usuarios para que actualize la vista
  private observableRecargarLibro$=new Subject<any>();
  observableRecargarLibro:boolean=false;


  constructor(private http:HttpClient) {
      this.token = this.getTokenLaravel();
   }

   //funcion de setear y obtener el observable de la variable y saber cuando recragamos la pagina en algun componente
   setobservableRecargarLibro(observableRecargarLibro:any){
      this.observableRecargarLibro$.next(observableRecargarLibro);
   }
   getobservableRecargarLibro():Observable<any>{
     return this.observableRecargarLibro$.asObservable();
   }

    // obtenemos el token de laravel o node que esta en el localstorage
    private getTokenLaravel(): string | null {
      // Verificar si localStorage está disponible
      if (typeof localStorage !== 'undefined') {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData).token : null;
      }
      return null;
    }

  obtenerAllLibros(): Observable<any> {
    const headers = new HttpHeaders({
       'Authorization': 'Bearer ' + this.token
    });

    

    return this.http.get(`${this.urlApi}/api/libros`, { headers });
  }

  buscarLibro(libro:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + this.token
    });

    const body =libro;
    

    return this.http.post(`${this.urlApi}/api/libros/buscar`,body, { headers });
  }

 
  crearLibro(libro: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    //usuario es un objeto con la estructura como se armaria en posman en raw json para enviarlo al backend
    const body =libro;

    return this.http.post(`${this.urlApi}/api/libros/crear`, body, { headers });
  }

  //Eliminar Un usuario
  eliminarLibro(idEliminar: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.token
    });

    return this.http.delete(`${this.urlApi}/api/libros/libro/${idEliminar}`, { headers });
  }

  //esta para actualizar un usuario
  actualizarLibro(libro: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    //usuario es un objeto con la estructura como se armaria en posman en raw json para enviarlo al backend
    const body =libro;

    return this.http.put(`${this.urlApi}/api/libros/update`, body, { headers });
  }
}
