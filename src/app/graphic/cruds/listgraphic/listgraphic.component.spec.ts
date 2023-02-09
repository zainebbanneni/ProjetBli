import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListgraphicComponent } from './listgraphic.component';

describe('ListgraphicComponent', () => {
  let component: ListgraphicComponent;
  let fixture: ComponentFixture<ListgraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListgraphicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListgraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
