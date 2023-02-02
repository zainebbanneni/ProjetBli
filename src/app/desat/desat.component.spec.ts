import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DESATComponent } from './desat.component';

describe('DESATComponent', () => {
  let component: DESATComponent;
  let fixture: ComponentFixture<DESATComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DESATComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DESATComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
