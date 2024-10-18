import { Subject } from 'rxjs';
import { Books } from '../models/books.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationBooks } from '../models/pagination-books.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  baseUrl = environment.baseUrl;
  bookSubject = new Subject();
  private bookPagination: PaginationBooks;
  private paginationBooksSubject = new Subject<PaginationBooks>();

  constructor(private http: HttpClient) {}

  obtenerLibros(librosPorPagina: number, paginaActual: number, sort: string, sortDirection: string, filterValue: any) {
    const request = {
      pageSize: librosPorPagina,
      page: paginaActual,
      sort: sort,
      sortDirection: sortDirection,
      filterValue: filterValue
    };

    this.http.post<PaginationBooks>(this.baseUrl + 'libro/pagination', request).subscribe((response) => {
      this.bookPagination = response;
      this.paginationBooksSubject.next(this.bookPagination);
    });
  }

  obtenerActualListener() {
    return this.paginationBooksSubject.asObservable();
  }

  guardarLibro(book: Books) {
    this.http.post(this.baseUrl + 'libro', book).subscribe((response) => {
      this.bookSubject.next();
    });
  }

  guardarLibroListener() {
    return this.bookSubject.asObservable();
  }
}
