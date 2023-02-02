import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NROPMComponent } from './nro-pm.component';

describe('NROPMComponent', () => {
  let component: NROPMComponent;
  let fixture: ComponentFixture<NROPMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NROPMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NROPMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
