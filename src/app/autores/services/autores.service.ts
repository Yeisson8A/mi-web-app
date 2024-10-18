import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Autor } from './../models/autor.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaginationAutores } from '../models/pagination-autores.model';

@Injectable({
    providedIn: 'root'
})
export class AutoresService {
  baseUrl = environment.baseUrl;
  private autoresLista: Autor[] = [];
  private autoresSubject = new Subject<Autor[]>();
  private autorPagination: PaginationAutores;
  private paginationAutoresSubject = new Subject<PaginationAutores>();

  constructor(private http: HttpClient) {}

  obtenerAutores() {
    this.http
      .get<Autor[]>(this.baseUrl + 'autor')
      .subscribe((data) => {
        this.autoresLista = data;
        this.autoresSubject.next([...this.autoresLista]);
      });
  }

  obtenerActualListener() {
    return this.autoresSubject.asObservable();
  }

  obtenerAutoresPaginados(autoresPorPagina: number, paginaActual: number, sort: string, sortDirection: string, filterValue: any) {
    const request = {
      pageSize: autoresPorPagina,
      page: paginaActual,
      sort: sort,
      sortDirection: sortDirection,
      filterValue: filterValue
    };

    this.http.post<PaginationAutores>(this.baseUrl + 'autor/pagination', request).subscribe((response) => {
      this.autorPagination = response;
      this.paginationAutoresSubject.next(this.autorPagination);
    });
  }

  obtenerActualPaginadosListener() {
    return this.paginationAutoresSubject.asObservable();
  }
}
