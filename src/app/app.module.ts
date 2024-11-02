import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  // Ya lo tienes importado
import { FormsModule } from '@angular/forms';//esta se agrega para que angular pueda obtener datos de inputs
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';//formularios reactivos

//componentes de prieng 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //este es de prime ng
import { PRIME_NG_MODULES } from '../app/componentesprimeng/componentesprieng';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibrosComponent } from './components/libros/libros.component';
import { CrearComponent } from './components/libros/crear/crear.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LibrosComponent,
    CrearComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PRIME_NG_MODULES
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
