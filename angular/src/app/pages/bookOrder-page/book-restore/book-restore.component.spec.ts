import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRestoreComponent } from './book-restore.component';

describe('BookRestoreComponent', () => {
  let component: BookRestoreComponent;
  let fixture: ComponentFixture<BookRestoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookRestoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
