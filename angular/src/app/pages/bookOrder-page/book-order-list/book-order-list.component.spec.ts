import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOrderListComponent } from './book-order-list.component';

describe('BookOrderListComponent', () => {
  let component: BookOrderListComponent;
  let fixture: ComponentFixture<BookOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
