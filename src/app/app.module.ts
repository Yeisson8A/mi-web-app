import { SeguridadInterceptor } from './seguridad/seguridad-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './seguridad/registro/registro.component';
import { LoginComponent } from './seguridad/login/login.component';
import { BarraComponent } from './navegacion/barra/barra.component';
import { MenuListaComponent } from './navegacion/menu-lista/menu-lista.component';
import { BooksComponent } from './books/books.component';
import { BookNuevoComponent } from './books/book-nuevo/book-nuevo.component';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AutoresComponent } from './autores/autores.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegistroComponent,
    LoginComponent,
    BarraComponent,
    MenuListaComponent,
    BooksComponent,
    BookNuevoComponent,
    AutoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: HTTP_INTERCEPTORS, useClass: SeguridadInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
