import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgraphicComponent } from './addgraphic.component';

describe('AddgraphicComponent', () => {
  let component: AddgraphicComponent;
  let fixture: ComponentFixture<AddgraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddgraphicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
