import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDeliveryComponent } from './book-delivery.component';

describe('BookDeliveryComponent', () => {
  let component: BookDeliveryComponent;
  let fixture: ComponentFixture<BookDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
