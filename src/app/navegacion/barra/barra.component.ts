import { Subscription } from 'rxjs';
import { SeguridadService } from './../../seguridad/services/seguridad.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css'],
})
export class BarraComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter();
  estadoUsuario: boolean;
  usuarioSubscription: Subscription;

  constructor(private seguridadService: SeguridadService) {}

  ngOnInit(): void {
    this.usuarioSubscription = this.seguridadService.seguridadCambio.subscribe((status) => {
      this.estadoUsuario = status;
    });
  }

  ngOnDestroy(): void {
    this.usuarioSubscription.unsubscribe();
  }

  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }

  cerrarSesion() {
    this.seguridadService.cerrarSesion();
  }
}
