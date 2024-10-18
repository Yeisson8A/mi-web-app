import { Injectable } from '@angular/core';
import { SeguridadService } from './../services/seguridad.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class SeguridadRouter implements CanActivate {
    constructor(private seguridadService: SeguridadService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true | undefined {
        if (this.seguridadService.validarUsuarioSesion()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
        }
    }
}