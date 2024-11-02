import { CanActivateFn,Router } from '@angular/router';
//importamos el servicio con el metodo que valida si hay token o no
import {LoginService} from '../services/login.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  // Utilizamos inject para obtener instancias de servicios
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isAut()) {
    // Si ya está autenticado, redirige al dashboard si intenta acceder a '' o '/login'
    if (state.url === '' || state.url === '/login') {
      router.navigateByUrl('/inicio');
      return false; // Retorna falso para bloquear la navegación actual
    } else {
      // Si está autenticado pero no intenta acceder a '' o '/login', permite la navegación
      return true;
    }
  } else {
    // Si no está autenticado, permite la navegación y redirige a /login si intenta acceder a otras rutas
    if (state.url !== '' && state.url !== '/login') {
      router.navigateByUrl('/login');
    }
    return true;
  }

 
};