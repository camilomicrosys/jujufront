import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Subscription,Subject } from 'rxjs';
//para redirigir
import { Router } from '@angular/router';
import {LibrosService} from '../../services/libros.service';
import {InformacionLibros} from '../../models/informacion-libros';

//abajito en el providers y ene l contructor

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';


//toast priengi
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
  providers:[MessageService],
})
export class LibrosComponent {
  libroForm: FormGroup;

   //obtener la variable de suscripcion observable
   subscription:Subscription=new Subscription();
   private searchSubject:Subject<string>=new Subject();

  libros:InformacionLibros[]=[];
  //paginador
  first:number = 0;
  rows:number = 10;

  constructor(private fb: FormBuilder,private _LibrosService:LibrosService,private messageService: MessageService ){
    this.libroForm = this.fb.group({
      id: [null],
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      anio: [
        '',
        [Validators.required, Validators.min(1900), Validators.max(2100)]
      ],
      estado: ['', Validators.required]
    });

    this.obtenerAllibros()

    this.subscription=this._LibrosService.getobservableRecargarLibro().subscribe(data=>{
        if(data){
          this.obtenerAllibros()
        }
    })
    


  }

  obtenerAllibros(){
      this._LibrosService.obtenerAllLibros().subscribe(data=>{
        this.libros=data.data;
            
      },error=>{
        console.log('error al obtener los libros')
      });
  }

  //paginador de la tabla
  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
}

isLastPage(): boolean {
    return this.libros ? this.first === this.libros.length - this.rows : true;
}

isFirstPage(): boolean {
    return this.libros ? this.first === 0 : true;
}


editar(libro: any) {
  this.libroForm.patchValue({
      id: libro.id, // Asignar el ID al formulario
      titulo: libro.titulo,
      autor: libro.autor,
      anio: libro.anio_publicacion,
      estado: libro.estado
  });

  console.log(libro)
}

actualizar() {
  const { id, titulo, autor, anio, estado } = this.libroForm.value;

  // Creamos el objeto con la estructura requerida
  const libroActualizado = {
      "id":id,
      "titulo":titulo,
      "autor":autor,
      "anio_publicacion": anio, // Asegúrate de renombrar esta propiedad
      "estado":estado
  };

  this._LibrosService.actualizarLibro(libroActualizado).subscribe(data=>{
       this.showSuccessActualizado()
       this._LibrosService.setobservableRecargarLibro(true)
       this._LibrosService.setobservableRecargarLibro(false)
  },error=>{
    console.log('error actualziando '+error)
  })
}

eliminarLibro(libro:any){
  
 console.log(libro)
 this._LibrosService.eliminarLibro(libro.id).subscribe(data=>{
       if(data.message=='Libro eliminado exitosamente'){
           this.showSuccessEliminado();
       }

       this._LibrosService.setobservableRecargarLibro(true)
       this._LibrosService.setobservableRecargarLibro(false)
 },error=>{
  console.log('error al eliminar el libro'+error)
 })
}

//alertas de priengi
showSuccess() {
  this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tipo de contacto editado' });
}

showSuccessEliminado(){
  this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Eliminado exitosamente' });
}

showSuccessActualizado(){
  this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Actualizado exitosamente' });
}


showError() {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al editar tipo de contacto' });
}
}
