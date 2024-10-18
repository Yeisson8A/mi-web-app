import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookNuevoComponent } from './book-nuevo.component';

describe('BookNuevoComponent', () => {
  let component: BookNuevoComponent;
  let fixture: ComponentFixture<BookNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
