import { Autor } from './../../autores/models/autor.model';
import { AutoresService } from './../../autores/services/autores.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { BooksService } from '../services/books.service';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-nuevo',
  templateUrl: './book-nuevo.component.html',
  styleUrls: ['./book-nuevo.component.css'],
})
export class BookNuevoComponent implements OnInit, OnDestroy {
  selectAutor: string;
  selectAutorTexto: string;
  fechaPublicacion: string;
  autores: Autor[] = [];
  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;
  private autorSuscription: Subscription;

  constructor(
    private booksService: BooksService,
    private autoresService: AutoresService,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.autoresService.obtenerAutores();
    this.autorSuscription = this.autoresService.obtenerActualListener().subscribe((autores) => {
      this.autores = autores;
    });
  }

  ngOnDestroy(): void {
    this.autorSuscription.unsubscribe();
  }

  selectedAutor(event: MatSelectChange) {
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
  }

  guardarLibro(form: NgForm) {
    const request = {
      id: null,
      titulo: form.value.titulo,
      descripcion: form.value.descripcion,
      autor: {
        id: this.selectAutor,
        nombreCompleto: this.selectAutorTexto
      },
      precio: parseInt(form.value.precio),
      fechaPublicacion: new Date(this.fechaPublicacion),
    };

    this.booksService.guardarLibro(request);
    this.autorSuscription = this.booksService.guardarLibroListener().subscribe(() => {
      this.dialogRef.closeAll();
    });
  }
}
