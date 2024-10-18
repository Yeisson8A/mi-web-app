import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Autor } from './models/autor.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AutoresService } from './services/autores.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'],
})
export class AutoresComponent implements OnInit, OnDestroy, AfterViewInit {
  desplegarColumnas = ['nombre', 'apellido', 'gradoAcademico'];
  dataSource = new MatTableDataSource<Autor>();
  private autorSubscription: Subscription;
  @ViewChild(MatSort) ordenamiento: MatSort;
  @ViewChild(MatPaginator) paginacion: MatPaginator;
  timeout: any = null;

  totalAutores = 0;
  autoresPorPagina = 2;
  paginaCombo = [1, 2, 5, 10];
  paginaActual = 1;
  sort = 'nombre';
  sortDirection = 'asc';
  filterValue = null;

  constructor(private autoresService: AutoresService) {}

  ngOnInit(): void {
    this.autoresService.obtenerAutoresPaginados(
      this.autoresPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
    this.autorSubscription = this.autoresService
      .obtenerActualPaginadosListener()
      .subscribe((pagination) => {
        this.dataSource = new MatTableDataSource<Autor>(pagination.data);
        this.totalAutores = pagination.totalRows;
      });
  }

  ngOnDestroy(): void {
    this.autorSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

  filtrar(event: any) {
    clearTimeout(this.timeout);
    var $this = this;

    this.timeout = setTimeout(() => {
      if (event.keyCode !== 13) {
        const filterValueLocal = {
          propiedad: 'nombre',
          valor: event.target.value,
        };
        $this.filterValue = filterValueLocal;
        $this.autoresService.obtenerAutoresPaginados(
          $this.autoresPorPagina,
          $this.paginaActual,
          $this.sort,
          $this.sortDirection,
          $this.filterValue
        );
      }
    }, 1000);
  }

  eventoPaginador(event: PageEvent) {
    this.autoresPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;
    this.autoresService.obtenerAutoresPaginados(
      this.autoresPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }

  ordenarColumna(event: Sort) {
    this.sort = event.active;
    this.sortDirection = event.direction;
    this.autoresService.obtenerAutoresPaginados(
      this.autoresPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }
}
