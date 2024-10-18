import { SeguridadRouter } from './seguridad/routers/seguridad.router';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './seguridad/registro/registro.component';
import { LoginComponent } from './seguridad/login/login.component';
import { BooksComponent } from './books/books.component';
import { AutoresComponent } from './autores/autores.component';

const routes: Routes = [
  { path: '', component: InicioComponent, canActivate: [SeguridadRouter] },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'books', component: BooksComponent },
  { path: 'autores', component: AutoresComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SeguridadRouter]
})
export class AppRoutingModule { }
