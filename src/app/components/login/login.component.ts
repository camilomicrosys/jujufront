import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
//para redirigir
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
//este es de prieng pero ahi unos que termian en api no da para importarlos como componentes sino que se
//llaman donde se vayan a usar para las alertas de toast prieng y estos que son api de priengi direactamente se meten aca 
//abajito en el providers y ene l contructor
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MessageService],
})
export class LoginComponent {

  usuario:string='';
  password:string='';
  procesando:boolean=false;
  errorFormulario = false;

 
  //propio de angular para los reactivos
  form:FormGroup;
  //para validar los campos
  constructor(private fb:FormBuilder,private _LoginService:LoginService, private router: Router,private messageService: MessageService){
    this.form=fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required]
   });
  }



  login(){
   
    console.log('llegaron datos');
    console.log(this.form);
    console.log('datos armados');
    const datas:any={
      'user':this.form.value.usuario,
      'pass':this.form.value.password
    }
    console.log(datas);
    this.usuario=this.form.value.usuario;
    this.password=this.form.value.password;

    this.procesando=true;
     //damos 3 segundos para que se vea la animacion de login
    //ponemos unos 3 segundos el spiner a correr para que almenos se vea bonita la animacion por que angular responde super rapido al login
    //metemos el procesamiento dentro de un time out para que siempre salga 3 segundos el spiner y se vea bonito
    //por que esas apis responden super rapido entonces eso atazca
    setTimeout(() => {
      
          //consumimos la api
        this._LoginService.procesarLogin(this.usuario,this.password).subscribe(data=>{
          console.log(data);
          console.log('consumio api');

          
            //si autentica es 201 y tiene data de token y es mayor a 10  los caracteres
            if(data.status==201 && data.data.length>10)
            {
              
              //llamamos el otro metodo del servicio que setea los datos en el localstorage
              const DATOSLOCALSTORAGELOGIN={token:data.data,usuario:this.usuario,autenticado:true}
              this._LoginService.localStorageLoginExitoso(DATOSLOCALSTORAGELOGIN);
              this.procesando = false;

              // Redirigir a la página de inicio
              this.router.navigate(['/inicio']);  // Ajusta la ruta según tu estructura de rutas
              
              return;
            }else{
              //mostramos el componente de error y  alos 3 segundos lo ocultamos
              this.errorFormulario=true;
              setTimeout(() => {
                this.errorFormulario = false;
              }, 1000);
              this.procesando=false;
            }


          
        },error=>{
        
          console.log('hubo un error '+error);
          console.log(error);
          this.procesando = false;
          //mostramos el error de toats proiop de prieng
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usario o contraseña incorrectos',life: 3000  });
        })
    }, 3000);
  }

  //mostar errores del formulario al usuario
  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
  
    if (control?.hasError('required')) {
      return 'Campo obligatorio';
    } else if (control?.hasError('usuario')) {
      return 'usuario incorrecto';
    }
  
    // Puedes agregar más condiciones según tus necesidades
  
    return '';
  }

 

 
}

