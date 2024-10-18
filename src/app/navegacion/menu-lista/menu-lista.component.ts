import { Subscription } from 'rxjs';
import { SeguridadService } from './../../seguridad/services/seguridad.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.css']
})
export class MenuListaComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter();
  estadoUsuario: boolean;
  usuarioSubscription: Subscription;

  constructor(private seguridadService: SeguridadService) { }

  ngOnInit(): void {
    this.usuarioSubscription = this.seguridadService.seguridadCambio.subscribe(status => {
      this.estadoUsuario = status;
    });
  }

  ngOnDestroy(): void {
    this.usuarioSubscription.unsubscribe();
  }

  onMenuCloseDispatch() {
    this.menuToggle.emit();
  }

  cerrarSesionMenu() {
    this.onMenuCloseDispatch();
    this.seguridadService.cerrarSesion();
  }
}
