import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESIMBComponent } from './esimb.component';

describe('ESIMBComponent', () => {
  let component: ESIMBComponent;
  let fixture: ComponentFixture<ESIMBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ESIMBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ESIMBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
