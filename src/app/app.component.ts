import { Component, OnInit } from '@angular/core';
import { SeguridadService } from './seguridad/services/seguridad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private seguridadService: SeguridadService) {
  }

  ngOnInit() {
    this.seguridadService.cargarUsuario();
  }
}
