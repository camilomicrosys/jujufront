import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LibrosService} from '../../../services/libros.service'
//toast priengi
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
  providers:[MessageService],
})
export class CrearComponent {
  libroForm: FormGroup;

  constructor(private fb: FormBuilder, private _LibrosService:LibrosService,private messageService: MessageService) {
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      anio: [
        '',
        [Validators.required, Validators.min(1900), Validators.max(2100)]
      ],
      estado: ['', Validators.required]
    });
  }

  guardar() {
    if (this.libroForm.valid) {
      console.log('Formulario válido:', this.libroForm.value);
      const datosLibro = {
        titulo: this.libroForm.get('titulo')?.value,
        autor: this.libroForm.get('autor')?.value,
        anio_publicacion: this.libroForm.get('anio')?.value,
        estado: this.libroForm.get('estado')?.value
      };
      
      console.log('dattos a guardar')
      console.log(datosLibro)

      this._LibrosService.crearLibro(datosLibro).subscribe(data=>{
             console.log('creado exitosamente')
             this._LibrosService.setobservableRecargarLibro(true);
             this._LibrosService.setobservableRecargarLibro(false);
             this.libroForm.reset();
             this.showSuccess()
      },error=>{
        console.log('error')
        this.showError()
      })
    } else {
      this.libroForm.markAllAsTouched();
    }
  }

  //alertas de priengi
showSuccess() {
  this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Libro creado con exitoTipo de contacto editado' });
}

showError() {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'error al crear el libro' });
}
}
