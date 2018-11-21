import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOtherComponent } from './book-other.component';

describe('BookOtherComponent', () => {
  let component: BookOtherComponent;
  let fixture: ComponentFixture<BookOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
