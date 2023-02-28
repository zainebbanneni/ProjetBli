import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBPUComponent } from './add-bpu.component';

describe('AddBPUComponent', () => {
  let component: AddBPUComponent;
  let fixture: ComponentFixture<AddBPUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBPUComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBPUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
