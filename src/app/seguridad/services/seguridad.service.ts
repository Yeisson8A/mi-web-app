import { Subject } from 'rxjs';
import { LoginData } from '../models/login-data.model';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  baseUrl = environment.baseUrl;
  seguridadCambio = new Subject<boolean>();
  private usuario?: Usuario;
  private token: string;

  constructor(private router: Router, private http: HttpClient) {
  }

  cargarUsuario() {
    const tokenBrowser = localStorage.getItem('token');
    if (!tokenBrowser) return;
    this.token = tokenBrowser;
    this.seguridadCambio.next(true);

    this.http.get<Usuario>(this.baseUrl + 'usuario').subscribe((response) => {
      this.usuario = {
        email: response.email,
        nombre: response.nombre,
        apellido: response.apellido,
        token: response.token,
        password: '',
        username: response.username,
        usuarioId: response.usuarioId
      };
      this.seguridadCambio.next(true);
    });
  }

  obtenerToken() {
    return this.token;
  }

  registrarUsuario(usr: Usuario) {
    this.http.post<Usuario>(this.baseUrl + 'usuario/registrar', usr).subscribe((response) => {
      this.token = response.token;
      this.usuario = {
        email: response.email,
        nombre: response.nombre,
        apellido: response.apellido,
        token: response.token,
        password: '',
        username: response.username,
        usuarioId: response.usuarioId
      };
      this.seguridadCambio.next(true);
      localStorage.setItem('token', response.token);
      this.router.navigate(['/']);
    });
  }

  login(loginData: LoginData) {
    this.http.post<Usuario>(this.baseUrl + 'usuario/login', loginData).subscribe((response) => {
      this.token = response.token;
      this.usuario = {
        email: response.email,
        nombre: response.nombre,
        apellido: response.apellido,
        token: response.token,
        password: '',
        username: response.username,
        usuarioId: response.usuarioId
      };
      this.seguridadCambio.next(true);
      localStorage.setItem('token', response.token);
      this.router.navigate(['/']);
    });
  }

  cerrarSesion() {
    this.usuario = null;
    this.seguridadCambio.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  obtenerUsuario() {
    return { ...this.usuario };
  }

  validarUsuarioSesion() {
    return this.token != null;
  }
}
